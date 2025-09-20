import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      telemedicine: 'Telemedicine Platform',
      healthcareAtYourFingertips: 'Healthcare at your fingertips',
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      role: 'Role',
      patient: 'Patient',
      doctor: 'Doctor',
      pharmacist: 'Pharmacist',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInWithGoogle: 'Sign in with Google',
      or: 'or',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',

      // Dashboard
      patientDashboard: 'Patient Dashboard',
      doctorDashboard: 'Doctor Dashboard',
      pharmacistDashboard: 'Pharmacist Dashboard',
      welcomeBack: 'Welcome Back',
      patientWelcomeMessage: 'Manage your health records, get AI-powered symptom analysis, and connect with healthcare professionals.',

      // Symptom Checker
      symptomChecker: 'Symptom Checker',
      aiSymptomChecker: 'AI Symptom Checker',
      selectSymptoms: 'Select Symptoms',
      symptoms: 'Symptoms',
      selectedSymptoms: 'Selected Symptoms',
      analyzeSymptoms: 'Analyze Symptoms',
      analyzing: 'Analyzing...',
      analysisResults: 'Analysis Results',
      pleaseSelectSymptoms: 'Please select at least one symptom',
      analysisError: 'Error analyzing symptoms',
      medicalDisclaimer: 'This is not a substitute for professional medical advice. Please consult a healthcare provider.',

      // Health Records
      healthRecords: 'Health Records',
      uploadHealthRecords: 'Upload Health Records',
      dragAndDropFiles: 'Drag & drop files here, or click to select',
      dropFilesHere: 'Drop the files here...',
      supportedFormats: 'Supported formats',
      selectFiles: 'Select Files',
      selectedFiles: 'Selected Files',
      uploadFiles: 'Upload Files',
      uploading: 'Uploading...',
      uploadError: 'Error uploading files',
      aiAnalysisResults: 'AI Analysis Results',
      summary: 'Summary',
      keyFindings: 'Key Findings',
      recommendations: 'Recommendations',
      recentUploads: 'Recent Uploads',
      noFilesUploaded: 'No files uploaded yet',

      // Prescriptions
      prescriptions: 'Prescriptions',
      medicationName: 'Medication Name',
      dosage: 'Dosage',
      frequency: 'Frequency',
      duration: 'Duration',
      instructions: 'Instructions',

      // Video Call
      videoCall: 'Video Consultation',
      startVideoCall: 'Start Video Call',
      endCall: 'End Call',
      callInProgress: 'Call in Progress',
      noDoctorvailable: 'No doctor available at the moment',

      // Inventory
      inventory: 'Inventory',
      medicineName: 'Medicine Name',
      quantity: 'Quantity',
      price: 'Price',
      expiryDate: 'Expiry Date',
      manufacturer: 'Manufacturer',

      // Symptoms
      fever: 'Fever',
      cough: 'Cough',
      headache: 'Headache',
      fatigue: 'Fatigue',
      nausea: 'Nausea',
      dizziness: 'Dizziness',
      chest_pain: 'Chest Pain',
      shortness_of_breath: 'Shortness of Breath',
      abdominal_pain: 'Abdominal Pain',
      joint_pain: 'Joint Pain',
      sore_throat: 'Sore Throat',
      runny_nose: 'Runny Nose',
      muscle_aches: 'Muscle Aches',
      loss_of_appetite: 'Loss of Appetite',
      difficulty_sleeping: 'Difficulty Sleeping',
      skin_rash: 'Skin Rash',
      back_pain: 'Back Pain',
      diarrhea: 'Diarrhea',
    }
  },
  hi: {
    translation: {
      // Common
      telemedicine: 'टेलीमेडिसिन प्लेटफॉर्म',
      healthcareAtYourFingertips: 'आपकी उंगलियों पर स्वास्थ्य सेवा',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      role: 'भूमिका',
      patient: 'मरीज़',
      doctor: 'डॉक्टर',
      pharmacist: 'फार्मासिस्ट',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signInWithGoogle: 'गूगल के साथ साइन इन',
      or: 'या',
      loading: 'लोड हो रहा है...',

      // Dashboard
      patientDashboard: 'मरीज़ डैशबोर्ड',
      doctorDashboard: 'डॉक्टर डैशबोर्ड',
      pharmacistDashboard: 'फार्मासिस्ट डैशबोर्ड',
      welcomeBack: 'वापस स्वागत है',

      // Symptom Checker
      symptomChecker: 'लक्षण जाँचकर्ता',
      aiSymptomChecker: 'एआई लक्षण जाँचकर्ता',
      selectSymptoms: 'लक्षण चुनें',
      symptoms: 'लक्षण',
      selectedSymptoms: 'चुने गए लक्षण',
      analyzeSymptoms: 'लक्षणों का विश्लेषण करें',
      analyzing: 'विश्लेषण हो रहा है...',
      analysisResults: 'विश्लेषण परिणाम',

      // Symptoms in Hindi
      fever: 'बुखार',
      cough: 'खांसी',
      headache: 'सिरदर्द',
      fatigue: 'थकान',
      nausea: 'मतली',
      dizziness: 'चक्कर आना',
      chest_pain: 'छाती में दर्द',
      shortness_of_breath: 'सांस लेने में कठिनाई',
      abdominal_pain: 'पेट दर्द',
      joint_pain: 'जोड़ों में दर्द',
      sore_throat: 'गले में खराश',
      runny_nose: 'नाक बहना',
      muscle_aches: 'मांसपेशियों में दर्द',
      loss_of_appetite: 'भूख न लगना',
      difficulty_sleeping: 'नींद न आना',
      skin_rash: 'त्वचा पर दाने',
      back_pain: 'पीठ दर्द',
      diarrhea: 'दस्त'
    }
  },
  pa: {
    translation: {
      // Common
      telemedicine: 'ਟੈਲੀਮੈਡਿਸਨ ਪਲੇਟਫਾਰਮ',
      healthcareAtYourFingertips: 'ਤੁਹਾਡੀਆਂ ਉਂਗਲਾਂ ਤੇ ਸਿਹਤ ਸੇਵਾ',
      login: 'ਲਾਗਇਨ',
      logout: 'ਲਾਗਆਊਟ',
      email: 'ਈਮੇਲ',
      password: 'ਪਾਸਵਰਡ',
      confirmPassword: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
      role: 'ਭੂਮਿਕਾ',
      patient: 'ਮਰੀਜ਼',
      doctor: 'ਡਾਕਟਰ',
      pharmacist: 'ਫਾਰਮਾਸਿਸਟ',
      signIn: 'ਸਾਈਨ ਇਨ',
      signUp: 'ਸਾਈਨ ਅਪ',
      signInWithGoogle: 'ਗੂਗਲ ਨਾਲ ਸਾਈਨ ਇਨ',
      or: 'ਜਾਂ',
      loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',

      // Dashboard
      patientDashboard: 'ਮਰੀਜ਼ ਡੈਸ਼ਬੋਰਡ',
      doctorDashboard: 'ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ',
      pharmacistDashboard: 'ਫਾਰਮਾਸਿਸਟ ਡੈਸ਼ਬੋਰਡ',
      welcomeBack: 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',

      // Symptom Checker
      symptomChecker: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
      aiSymptomChecker: 'ਏਆਈ ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
      selectSymptoms: 'ਲੱਛਣ ਚੁਣੋ',
      symptoms: 'ਲੱਛਣ',
      selectedSymptoms: 'ਚੁਣੇ ਗਏ ਲੱਛਣ',
      analyzeSymptoms: 'ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      analyzing: 'ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
      analysisResults: 'ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ',

      // Symptoms in Punjabi
      fever: 'ਬੁਖ਼ਾਰ',
      cough: 'ਖੰਘ',
      headache: 'ਸਿਰਦਰਦ',
      fatigue: 'ਥਕਾਵਟ',
      nausea: 'ਜੀ ਮਿਚਲਾਣਾ',
      dizziness: 'ਚੱਕਰ ਆਉਣਾ',
      chest_pain: 'ਸੀਨੇ ਵਿੱਚ ਦਰਦ',
      shortness_of_breath: 'ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ',
      abdominal_pain: 'ਪੇਟ ਦਰਦ',
      joint_pain: 'ਜੋੜਾਂ ਵਿੱਚ ਦਰਦ',
      sore_throat: 'ਗਲੇ ਵਿੱਚ ਖ਼ਰਾਬੀ',
      runny_nose: 'ਨੱਕ ਵਗਣਾ',
      muscle_aches: 'ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਦਰਦ',
      loss_of_appetite: 'ਭੁੱਖ ਨਾ ਲਗਣਾ',
      difficulty_sleeping: 'ਨੀਂਦ ਨਾ ਆਉਣਾ',
      skin_rash: 'ਚਮੜੀ ਤੇ ਦਾਗ',
      back_pain: 'ਪਿੱਠ ਦਰਦ',
      diarrhea: 'ਦਸਤ'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;