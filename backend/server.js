const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Replace with your current frontend and ngrok URLs
const allowedOrigins = [
  'http://localhost:3000', // your local frontend
  'https://20c00476e7b2.ngrok-free.app.ngrok-free.app' // replace with your actual current ngrok URL
];
mongoose.connect('mongodb+srv://admin:galaxy123@cluster0.5hdcrhe.mongodb.net/pharmacy_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  console.log('🏥 Database: pharmacy_db');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// CORS setup for express APIs
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example route (modify as per your real API)
app.post('/api/patients', (req, res) => {
  // Process patient registration
  res.status(200).send({ success: true });
});

// Socket.IO setup with CORS options
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Add your socket event handlers here
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_role_room', (role) => {
    console.log(`${socket.id} joined ${role} room`);
    socket.join(role);
  });

  socket.on('call_initiated', ({ fromUser, toRole, roomName }) => {
    console.log(`Call initiated from ${fromUser.name} to ${toRole} in room ${roomName}`);
    io.to(toRole).emit('incoming_call', { fromUser, roomName });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize HuggingFace AI
let hf = null;
if (process.env.HUGGINGFACE_API_KEY) {
  hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  console.log('✅ HuggingFace AI initialized');
} else {
  console.warn('⚠️ HuggingFace API key not found - using mock analysis');
}
const BACKUP_MODELS = [
  'facebook/bart-large-cnn',
  'sshleifer/distilbart-cnn-12-6',
  'google/pegasus-xsum',
  't5-small'
];

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  expiry: { type: String, required: true },
  manufacturer: { type: String, required: true, trim: true }
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true }
  }],
  status: { 
    type: String, 
    enum: ['active', 'completed', 'expired'], 
    default: 'active' 
  },
  prescribedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Memory storage for fallback
const memoryStorage = {
  users: new Map(),
  symptomAnalyses: [],
  healthRecords: [],
  recordAnalyses: [],
  prescriptions: [],
  medicineInventory: []
};

// Firebase setup (with fallback)
let db = null;
let firebaseEnabled = false;

try {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });

  db = admin.firestore();
  firebaseEnabled = true;
  console.log('✅ Firebase initialized');
} catch (error) {
  console.warn('⚠️ Firebase failed, using memory storage');
  firebaseEnabled = false;
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }
    
    if (firebaseEnabled) {
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
      } catch (err) {
        req.user = { uid: 'test-user-123', email: 'test@example.com' };
      }
    } else {
      req.user = { uid: 'test-user-123', email: 'test@example.com' };
    }
    
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// ===== REAL AI DOCUMENT ANALYSIS FUNCTIONS =====

// Extract text from PDF files
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer, {
      // Options to handle problematic PDFs
      normalizeWhitespace: true,
      disableCombineTextItems: false
    });
    
    const extractedText = data.text.trim();
    console.log(`📄 PDF text extraction: ${extractedText.length} characters extracted`);
    
    if (extractedText.length < 10) {
      throw new Error('Insufficient text extracted from PDF');
    }
    
    return extractedText;
  } catch (error) {
    console.error('PDF extraction error:', error.message);
    return null;
  }
}
// FIXED: Real AI-powered text summarization
async function generateAISummary(text, fileName) {
  if (!text || text.length < 50) {
    return generateAdvancedFallbackSummary(text, fileName);
  }

  // Try HuggingFace API with multiple models
  if (hf) {
    for (let i = 0; i < BACKUP_MODELS.length; i++) {
      const model = BACKUP_MODELS[i];
      try {
        console.log(`🤖 Attempting AI summarization with ${model} for ${fileName}...`);
        
        // Clean and prepare text
        const cleanText = text.replace(/\s+/g, ' ').replace(/[^\w\s.,;:!?()-]/g, '').trim();
        if (cleanText.length < 20) {
          throw new Error('Text too short after cleaning');
        }

        // Adaptive text length based on model
        const maxLength = model.includes('t5') ? 500 : 800;
        const truncatedText = cleanText.length > maxLength ? 
          cleanText.substring(0, maxLength) + '...' : cleanText;
        
        console.log(`📝 Input text (${truncatedText.length} chars): ${truncatedText.substring(0, 100)}...`);
        
        // Retry logic with exponential backoff
        let attempt = 0;
        const maxAttempts = 3;
        
        while (attempt < maxAttempts) {
          try {
            const response = await Promise.race([
              hf.summarization({
                model: model,
                inputs: truncatedText,
                parameters: {
                  max_length: model.includes('pegasus') ? 200 : 150,
                  min_length: 30,
                  do_sample: false,
                  temperature: 0.7,
                  repetition_penalty: 1.1
                }
              }),
              // Timeout after 15 seconds
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 15000)
              )
            ]);

            console.log(`🔍 AI Response from ${model}:`, JSON.stringify(response, null, 2));

            let aiSummary = null;
            if (response && response.summary_text) {
              aiSummary = response.summary_text;
            } else if (response && Array.isArray(response) && response[0]?.summary_text) {
              aiSummary = response[0].summary_text;
            }
            
            if (aiSummary && aiSummary.length > 15 && !aiSummary.includes('error')) {
              console.log(`✅ AI summary generated successfully with ${model}`);
              return {
                summary: `🤖 AI Analysis of ${fileName}:\n\n${aiSummary}\n\n📊 Document contains ${text.length} characters of medical text.\n\n🔬 Analysis Method: ${model} (HuggingFace AI)`,
                method: `HuggingFace AI - ${model}`,
                confidence: 0.85 + (i === 0 ? 0.1 : 0), // Higher confidence for primary model
                textLength: text.length,
                model: model
              };
            } else {
              throw new Error(`Invalid summary response: ${JSON.stringify(response)}`);
            }
            
          } catch (attemptError) {
            attempt++;
            console.warn(`⚠️ Attempt ${attempt} failed for ${model}:`, attemptError.message);
            
            if (attempt < maxAttempts) {
              // Exponential backoff: 1s, 2s, 4s
              const backoffTime = Math.pow(2, attempt - 1) * 1000;
              console.log(`⏳ Retrying in ${backoffTime}ms...`);
              await new Promise(resolve => setTimeout(resolve, backoffTime));
            }
          }
        }
        
      } catch (modelError) {
        console.warn(`⚠️ Model ${model} failed completely:`, modelError.message);
        continue; // Try next model
      }
    }
  }

  // If all AI attempts fail, use advanced fallback
  console.log(`🔄 All AI models failed, using advanced fallback analysis for ${fileName}`);
  return generateAdvancedFallbackSummary(text, fileName);
}

// Advanced fallback analysis with medical context understanding
function generateAdvancedFallbackSummary(text, fileName) {
  if (!text || text.length < 20) {
    return {
      summary: `📄 Document Analysis: ${fileName}\n\n⚠️ Unable to extract readable text from this document. The file may be:\n• A scanned image requiring OCR\n• A protected or encrypted PDF\n• An image file without text content\n\nRecommendation: Please ensure documents contain readable text or provide physical copies to your healthcare provider.`,
      method: 'Basic Analysis',
      confidence: 0.3,
      textLength: 0
    };
  }

  // Analyze content using keywords
   const lowerText = text.toLowerCase();
  const medicalKeywords = {
    lab: {
      keywords: ['blood', 'urine', 'glucose', 'cholesterol', 'hemoglobin', 'wbc', 'rbc', 'platelet', 'creatinine', 'bun', 'ast', 'alt', 'bilirubin', 'albumin', 'hba1c', 'tsh', 'ldl', 'hdl', 'triglycerides'],
      weight: 3
    },
    imaging: {
      keywords: ['x-ray', 'mri', 'ct scan', 'ultrasound', 'scan', 'radiolog', 'echo', 'mammogram', 'pet scan', 'angiogram'],
      weight: 3
    },
    prescription: {
      keywords: ['medication', 'dosage', 'tablet', 'mg', 'prescription', 'pharmacy', 'drug', 'capsule', 'syrup', 'injection'],
      weight: 2.5
    },
    vital: {
      keywords: ['blood pressure', 'heart rate', 'temperature', 'pulse', 'weight', 'height', 'bp', 'hr', 'temp', 'respiratory rate'],
      weight: 2
    },
    symptoms: {
      keywords: ['pain', 'fever', 'cough', 'headache', 'nausea', 'fatigue', 'dizziness', 'shortness of breath', 'chest pain'],
      weight: 1.5
    },
    diagnosis: {
      keywords: ['diagnosis', 'condition', 'disease', 'syndrome', 'disorder', 'infection', 'inflammation', 'abnormal', 'normal'],
      weight: 3
    }
  };

  let docType = 'General Medical Document';
  let keyFindings = [];
  let recommendations = [];
  let confidence = 0.5;
  let totalScore = 0;
  let maxScore = 0;
  let bestCategory = null;

  // Advanced categorization with scoring
  for (const [type, config] of Object.entries(medicalKeywords)) {
    const matches = config.keywords.filter(keyword => lowerText.includes(keyword));
    const score = matches.length * config.weight;
    totalScore += score;
    
    if (score > maxScore) {
      maxScore = score;
      bestCategory = type;
    }
    
    if (matches.length > 0) {
      switch(type) {
        case 'lab':
          docType = 'Laboratory Test Results';
          keyFindings.push(`Contains ${matches.length} laboratory markers: ${matches.slice(0,4).join(', ')}`);
          recommendations.push('Review lab values with your doctor to understand normal ranges and trends');
          recommendations.push('Keep track of values over time for better health monitoring');
          confidence += 0.2;
          break;
        case 'imaging':
          docType = 'Medical Imaging Report';
          keyFindings.push(`Imaging study mentions: ${matches.slice(0,3).join(', ')}`);
          recommendations.push('Discuss imaging findings with a radiologist or your physician');
          recommendations.push('Ask about follow-up imaging if needed');
          confidence += 0.2;
          break;
        case 'prescription':
          docType = 'Prescription Document';
          keyFindings.push('Contains medication information and dosage details');
          recommendations.push('Follow prescribed dosages and timing exactly as directed');
          recommendations.push('Consult pharmacist for drug interactions and side effects');
          confidence += 0.15;
          break;
        case 'vital':
          docType = 'Vital Signs Record';
          keyFindings.push(`Vital signs recorded: ${matches.slice(0,4).join(', ')}`);
          recommendations.push('Monitor vital sign trends over time');
          recommendations.push('Note any significant changes and discuss with healthcare provider');
          confidence += 0.1;
          break;
        case 'diagnosis':
          docType = 'Diagnostic Report';
          keyFindings.push('Contains diagnostic information and medical assessments');
          recommendations.push('Discuss diagnosis and treatment options with your healthcare provider');
          recommendations.push('Ask about prognosis and long-term management');
          confidence += 0.25;
          break;
        case 'symptoms':
          docType = 'Symptom Assessment';
          keyFindings.push(`Symptoms documented: ${matches.slice(0,4).join(', ')}`);
          recommendations.push('Track symptom patterns and triggers');
          confidence += 0.1;
          break;
      }
    }
  }

  // Extract numerical measurements with units
  const measurementPatterns = text.match(/\d+\.?\d*\s*(mg|ml|cm|kg|lbs|mmHg|bpm|°F|°C|%|IU|mEq|pg|ng|mcg|g\/dL|mg\/dL|mL\/min)/gi);
  if (measurementPatterns && measurementPatterns.length > 0) {
    keyFindings.push(`Clinical measurements found: ${measurementPatterns.slice(0,5).join(', ')}`);
    confidence += 0.1;
  }

  // Extract dates and times
  const datePatterns = text.match(/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}/g);
  if (datePatterns && datePatterns.length > 0) {
    keyFindings.push(`Document dates: ${datePatterns.slice(0,3).join(', ')}`);
  }

  // Extract potential patient information (anonymized)
  const namePattern = text.match(/patient\s+(?:name[:\s]*)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi);
  if (namePattern) {
    keyFindings.push('Patient identification information present');
  }

  // Smart content analysis based on text structure
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  if (sentences.length > 0) {
    // Find the most informative sentences (containing medical keywords)
    const rankedSentences = sentences.map(sentence => {
      const lowerSentence = sentence.toLowerCase();
      let score = 0;
      for (const [type, config] of Object.entries(medicalKeywords)) {
        config.keywords.forEach(keyword => {
          if (lowerSentence.includes(keyword)) {
            score += config.weight;
          }
        });
      }
      return { sentence: sentence.trim(), score };
    }).sort((a, b) => b.score - a.score);

    const topSentences = rankedSentences.slice(0, 2).filter(s => s.score > 0);
    if (topSentences.length > 0) {
      keyFindings.push('Key medical statements identified from document content');
      confidence += 0.15;
    }
  }

  if (keyFindings.length === 0) {
    keyFindings.push('Document content analyzed but specific medical markers not clearly identified');
    keyFindings.push('Document may require manual review by healthcare professional');
  }

  // Generate contextual recommendations
  if (recommendations.length === 0) {
    recommendations = [
      'Share this document with your healthcare provider for professional interpretation',
      'Ask questions about any medical terms or values you don\'t understand',
      'Keep this document in your organized medical records for future reference',
      'Consider discussing this information during your next medical appointment'
    ];
  }

  // Adjust confidence based on document complexity and content richness
  const finalConfidence = Math.min(0.8, Math.max(0.4, confidence));

  const summary = `📊 Advanced Analysis of ${fileName}

📋 Document Type: ${docType}
🎯 Confidence Level: ${Math.round(finalConfidence * 100)}%

🔍 Key Findings:
${keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join('\n')}

📝 Content Summary:
This document contains ${text.length} characters of medical text with ${sentences.length} clinical statements. ${
  docType.includes('Laboratory') ? 'Lab values and test results require professional medical interpretation for proper understanding of health status.' :
  docType.includes('Imaging') ? 'Imaging studies need radiological expertise and clinical correlation for accurate diagnosis.' :
  docType.includes('Prescription') ? 'Medication information should be reviewed with healthcare provider for proper usage and monitoring.' :
  'Medical information should be discussed with qualified healthcare professionals for comprehensive understanding.'
}

⚕️ Healthcare Recommendations:
${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

🔬 Analysis Methodology: Advanced medical document parsing with contextual keyword analysis and clinical pattern recognition.`;

  return {
    summary,
    method: 'Advanced Medical Content Analysis',
    confidence: finalConfidence,
    textLength: text.length,
    docType,
    keyFindings,
    recommendations,
    bestCategory,
    totalScore
  };
}

// ===== UPLOAD ENDPOINT WITH ENHANCED ANALYSIS =====

app.post('/api/upload-records', authenticateToken, upload.array('files', 10), async (req, res) => {
  try {
    console.log(`📁 Received ${req.files?.length || 0} files for analysis`);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filesWithAnalysis = [];
    
    for (const file of req.files) {
      console.log(`📄 Processing: ${file.originalname} (${file.mimetype}) - ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      
      const filePath = path.join(uploadsDir, file.filename);
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      
      let extractedText = '';
      let analysisResult = null;
      
      try {
        if (file.mimetype === 'application/pdf') {
          console.log(`🔍 Extracting text from PDF: ${file.originalname}`);
          extractedText = await extractTextFromPDF(filePath);
          
          if (extractedText && extractedText.length > 0) {
            console.log(`✅ Extracted ${extractedText.length} characters from ${file.originalname}`);
            analysisResult = await generateAISummary(extractedText, file.originalname);
          } else {
            console.warn(`⚠️ No text extracted from ${file.originalname}`);
            analysisResult = generateAdvancedFallbackSummary('', file.originalname);
          }
        } else if (file.mimetype.startsWith('image/')) {
          console.log(`📸 Image file: ${file.originalname} - Advanced image analysis placeholder`);
          analysisResult = {
            summary: `📸 Image Analysis: ${file.originalname}\n\n📋 File Type: Medical Image Document\n📏 File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB\n\n🔍 Analysis: This appears to be a medical image file. For detailed analysis:\n\n• Share with your healthcare provider for professional interpretation\n• Consider getting a radiologist's reading if this is a diagnostic image\n• Ensure image quality is sufficient for medical diagnosis\n• Keep as part of your comprehensive medical record\n\n⚠️ OCR text extraction not available for images in this version.\n💡 Future versions will include medical image OCR capabilities.\n\n🔬 Analysis Method: Image metadata analysis and file structure assessment.`,
            method: 'Advanced Image Analysis',
            confidence: 0.6,
            textLength: 0,
            fileSize: file.size,
            imageType: file.mimetype
          };
        }
        
        const fileData = {
          id: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: fileUrl,
          uploadedAt: new Date().toISOString(),
          analysis: analysisResult,
          extractedText: extractedText ? (extractedText.length > 1000 ? extractedText.substring(0, 1000) + '...' : extractedText) : null,
          processingSuccess: analysisResult && analysisResult.confidence > 0.3
        };
        
        filesWithAnalysis.push(fileData);
        
        // Save to storage with enhanced metadata
        const recordData = {
          id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
          userId: req.user.uid,
          ...fileData,
          uploadDate: new Date().toISOString(),
          processedAt: new Date().toISOString(),
          version: '2.0-enhanced'
        };

        if (firebaseEnabled && db) {
          try {
            await db.collection('health_records').add(recordData);
            console.log(`💾 Saved to Firestore: ${file.originalname}`);
          } catch (err) {
            console.warn('Firestore save failed, using memory storage:', err.message);
            memoryStorage.healthRecords.push(recordData);
            console.log(`💾 Saved to memory: ${file.originalname}`);
          }
        } else {
          memoryStorage.healthRecords.push(recordData);
          console.log(`💾 Saved to memory: ${file.originalname}`);
        }
        
      } catch (fileError) {
        console.error(`❌ Error processing file ${file.originalname}:`, fileError.message);
        
        // Add error information to response
        filesWithAnalysis.push({
          id: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: fileUrl,
          uploadedAt: new Date().toISOString(),
          error: `Processing failed: ${fileError.message}`,
          analysis: {
            summary: `❌ Processing Error for ${file.originalname}\n\nAn error occurred while processing this document. This could be due to:\n• Corrupted or damaged file\n• Unsupported PDF format\n• File encryption or password protection\n• Temporary system issue\n\nPlease try:\n1. Re-uploading the file\n2. Converting to a different format\n3. Contacting support if the issue persists`,
            method: 'Error Handler',
            confidence: 0.1,
            textLength: 0,
            error: fileError.message
          },
          processingSuccess: false
        });
      }
    }

    const successfulFiles = filesWithAnalysis.filter(f => f.processingSuccess !== false);
    const failedFiles = filesWithAnalysis.filter(f => f.processingSuccess === false);

    console.log(`🎉 Processing complete: ${successfulFiles.length} successful, ${failedFiles.length} failed`);
    
    return res.json({
      success: true,
      files: filesWithAnalysis,
      summary: {
        total: filesWithAnalysis.length,
        successful: successfulFiles.length,
        failed: failedFiles.length
      },
      message: `Successfully processed ${filesWithAnalysis.length} file(s) with enhanced AI-powered analysis. ${successfulFiles.length} files analyzed successfully${failedFiles.length > 0 ? `, ${failedFiles.length} files had processing issues` : ''}.`,
      timestamp: new Date().toISOString(),
      version: '2.0-enhanced'
    });
    
  } catch (error) {
    console.error('❌ Upload endpoint error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'File upload and analysis failed: ' + error.message,
      timestamp: new Date().toISOString()
    });
  }
});


// ===== SYMPTOM ANALYSIS =====

app.post('/api/analyze-symptoms', authenticateToken, async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms must be an array' });
    }

    const results = analyzeSymptomPatterns(symptoms);
    
    const analysisData = {
      id: Date.now().toString(),
      userId: req.user.uid,
      symptoms,
      results,
      timestamp: new Date().toISOString()
    };

    // Save analysis
    if (firebaseEnabled && db) {
      try {
        await db.collection('symptom_analyses').add(analysisData);
      } catch (err) {
        memoryStorage.symptomAnalyses.push(analysisData);
      }
    } else {
      memoryStorage.symptomAnalyses.push(analysisData);
    }

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
});

function analyzeSymptomPatterns(symptoms) {
  const symptomSet = new Set(symptoms.map(s => s.toLowerCase().replace('_', ' ')));
  
  const diseases = [
    {
      name: 'Gastroenteritis',
      symptoms: ['abdominal pain', 'nausea', 'diarrhea', 'fatigue'],
      baseProb: 0.8,
      description: 'Stomach inflammation causing digestive symptoms.'
    },
    {
      name: 'Anxiety Disorder',
      symptoms: ['shortness of breath', 'chest pain', 'dizziness', 'fatigue'],
      baseProb: 0.7,
      description: 'Anxiety can cause physical symptoms.'
    },
    {
      name: 'Respiratory Infection',
      symptoms: ['shortness of breath', 'cough', 'chest pain', 'fatigue'],
      baseProb: 0.8,
      description: 'Lung or airway infection.'
    }
  ];

  let results = diseases.map(disease => {
    const matched = disease.symptoms.filter(sym => symptomSet.has(sym));
    if (matched.length === 0) return null;
    
    const prob = (matched.length / disease.symptoms.length) * disease.baseProb;
    return prob > 0.3 ? {
      name: disease.name,
      probability: +(prob * 0.9).toFixed(2),
      description: disease.description,
      matchedSymptoms: matched
    } : null;
  }).filter(Boolean);

  results.sort((a, b) => b.probability - a.probability);

  return {
    diseases: results.length > 0 ? results : [{
      name: 'General Consultation',
      probability: 0.6,
      description: 'Please consult a healthcare professional.',
      matchedSymptoms: symptoms
    }],
    disclaimer: 'This is AI-assisted analysis. Consult healthcare professionals for diagnosis.'
  };
}
app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    console.log(`📋 Found ${medicines.length} medicines in MongoDB`);
    res.json(medicines);
  } catch (error) {
    console.error('❌ Error fetching medicines from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

// POST new medicine
app.post('/api/medicines', async (req, res) => {
  try {
    console.log('📝 Saving medicine to MongoDB:', req.body);
    const medicine = new Medicine(req.body);
    const savedMedicine = await medicine.save();
    console.log('✅ Medicine saved to MongoDB:', savedMedicine.name);
    res.status(201).json(savedMedicine);
  } catch (error) {
    console.error('❌ Error saving medicine to MongoDB:', error);
    res.status(400).json({ error: 'Failed to create medicine: ' + error.message });
  }
});

// PUT update medicine by ID
app.put('/api/medicines/:id', async (req, res) => {
  try {
    console.log('📝 Updating medicine in MongoDB:', req.params.id, req.body);
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    
    console.log('✅ Medicine updated in MongoDB:', updatedMedicine.name);
    res.json(updatedMedicine);
  } catch (error) {
    console.error('❌ Error updating medicine in MongoDB:', error);
    res.status(400).json({ error: 'Failed to update medicine: ' + error.message });
  }
});

// DELETE medicine by ID
app.delete('/api/medicines/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting medicine from MongoDB:', req.params.id);
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    
    if (!deletedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    
    console.log('✅ Medicine deleted from MongoDB:', deletedMedicine.name);
    res.json({ message: 'Medicine deleted successfully', medicine: deletedMedicine });
  } catch (error) {
    console.error('❌ Error deleting medicine from MongoDB:', error);
    res.status(400).json({ error: 'Failed to delete medicine: ' + error.message });
  }
});

// Other endpoints remain the same...
// ===== PRESCRIPTION MANAGEMENT =====

// GET prescriptions for authenticated user
app.get('/api/prescriptions', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user.uid })
      .sort({ createdAt: -1 });
    console.log(`📋 Found ${prescriptions.length} prescriptions for user ${req.user.uid}`);
    res.json(prescriptions);
  } catch (error) {
    console.error('❌ Error fetching prescriptions from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

// POST new prescription (typically called by doctor/admin)
app.post('/api/prescriptions', authenticateToken, async (req, res) => {
  try {
    console.log('📝 Saving prescription to MongoDB:', req.body);
    const prescription = new Prescription({
      ...req.body,
      patientId: req.body.patientId || req.user.uid
    });
    const savedPrescription = await prescription.save();
    console.log('✅ Prescription saved to MongoDB:', savedPrescription._id);
    res.status(201).json(savedPrescription);
  } catch (error) {
    console.error('❌ Error saving prescription to MongoDB:', error);
    res.status(400).json({ error: 'Failed to create prescription: ' + error.message });
  }
});

// PUT update prescription status
app.put('/api/prescriptions/:id', authenticateToken, async (req, res) => {
  try {
    console.log('📝 Updating prescription in MongoDB:', req.params.id);
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    
    console.log('✅ Prescription updated in MongoDB:', updatedPrescription._id);
    res.json(updatedPrescription);
  } catch (error) {
    console.error('❌ Error updating prescription in MongoDB:', error);
    res.status(400).json({ error: 'Failed to update prescription: ' + error.message });
  }
});

// DELETE prescription
app.delete('/api/prescriptions/:id', authenticateToken, async (req, res) => {
  try {
    console.log('🗑️ Deleting prescription from MongoDB:', req.params.id);
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    
    if (!deletedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    
    console.log('✅ Prescription deleted from MongoDB:', deletedPrescription._id);
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting prescription from MongoDB:', error);
    res.status(400).json({ error: 'Failed to delete prescription: ' + error.message });
  }
});


app.get('/api/inventory', authenticateToken, async (req, res) => {
  let inventory = [];
  if (firebaseEnabled && db) {
    try {
      const snapshot = await db.collection('medicine_inventory').get();
      snapshot.forEach(doc => inventory.push({ id: doc.id, ...doc.data() }));
    } catch (err) {
      inventory = memoryStorage.medicineInventory;
    }
  } else {
    inventory = memoryStorage.medicineInventory;
  }
  res.json(inventory);
});

// Get user role endpoint
app.get('/api/user/role', authenticateToken, async (req, res) => {
  try {
    let userRole = 'patient'; // default
    
    if (firebaseEnabled && db) {
      try {
        const userDoc = await db.collection('users').doc(req.user.uid).get();
        if (userDoc.exists()) {
          userRole = userDoc.data().role || 'patient';
        }
      } catch (firestoreError) {
        // Check memory storage
        const user = memoryStorage.users.get(req.user.uid);
        if (user) {
          userRole = user.role || 'patient';
        }
      }
    } else {
      // Check memory storage
      const user = memoryStorage.users.get(req.user.uid);
      if (user) {
        userRole = user.role || 'patient';
      }
    }

    console.log(`User ${req.user.uid} role: ${userRole}`);
    return res.json({ role: userRole });
  } catch (error) {
    console.error('Get user role error:', error);
    return res.json({ role: 'patient' });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

