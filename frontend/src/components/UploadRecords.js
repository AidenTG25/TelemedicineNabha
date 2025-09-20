import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Image,
  Delete,
  Visibility,
  CheckCircle,
  Error,
  PictureAsPdf,
  InsertDriveFile,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { auth } from '../firebase/config';


const UploadRecords = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append('files', file);
    });

    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post('http://localhost:5000/api/upload-records', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // Update progress if needed
        }
      });

      setUploadedFiles(response.data.files);
      setAnalysisResults(response.data.analysis);
      setFiles([]);

    } catch (error) {
      console.error('Upload error:', error);
      alert(t('uploadError'));
    }
    setUploading(false);
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <PictureAsPdf sx={{ color: '#f44336' }} />;
    if (type.includes('image')) return <Image sx={{ color: '#2196f3' }} />;
    return <InsertDriveFile sx={{ color: '#4caf50' }} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CloudUpload sx={{ fontSize: 32, color: '#2196f3', mr: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2196f3' }}>
          {t('uploadHealthRecords')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Upload Area */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? '#2196f3' : '#e0e0e0',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: isDragActive ? '#f3f8ff' : '#fafafa',
                  '&:hover': {
                    borderColor: '#2196f3',
                    backgroundColor: '#f3f8ff',
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 64, color: '#2196f3', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  {isDragActive ? t('dropFilesHere') : t('dragAndDropFiles')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('supportedFormats')}: PDF, PNG, JPG, JPEG (Max 10MB)
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#2196f3',
                    color: '#2196f3',
                    '&:hover': {
                      borderColor: '#1976d2',
                      backgroundColor: '#f3f8ff',
                    },
                  }}
                >
                  {t('selectFiles')}
                </Button>
              </Box>

              {/* File List */}
              {files.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    {t('selectedFiles')} ({files.length})
                  </Typography>
                  <List>
                    {files.map((fileObj) => (
                      <ListItem
                        key={fileObj.id}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 2,
                          mb: 1,
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        <ListItemIcon>
                          {getFileIcon(fileObj.file.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={fileObj.file.name}
                          secondary={formatFileSize(fileObj.file.size)}
                        />
                        <ListItemSecondaryAction>
                          <Chip
                            size="small"
                            label={fileObj.status}
                            color={fileObj.status === 'uploaded' ? 'success' : 'default'}
                          />
                          <IconButton
                            edge="end"
                            onClick={() => removeFile(fileObj.id)}
                            sx={{ ml: 1 }}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={uploadFiles}
                    disabled={uploading}
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976d2 30%, #0288d1 90%)',
                      },
                    }}
                  >
                    {uploading ? t('uploading') : t('uploadFiles')}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResults && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  {t('aiAnalysisResults')}
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body1" paragraph>
                    <strong>{t('summary')}:</strong> {analysisResults.summary}
                  </Typography>

                  {analysisResults.keyFindings && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 500 }}>
                        {t('keyFindings')}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {analysisResults.keyFindings.map((finding, index) => (
                          <Chip
                            key={index}
                            label={finding}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {analysisResults.recommendations && (
                    <Alert 
                      severity="info" 
                      sx={{ borderRadius: 2, backgroundColor: '#e3f2fd' }}
                    >
                      <Typography variant="body2">
                        <strong>{t('recommendations')}:</strong> {analysisResults.recommendations}
                      </Typography>
                    </Alert>
                  )}
                </Paper>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Uploaded Files History */}
          <Card sx={{ borderRadius: 3, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {t('recentUploads')}
              </Typography>

              {uploadedFiles.length > 0 ? (
                <List>
                  {uploadedFiles.map((file, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                        backgroundColor: '#f0f7ff',
                      }}
                    >
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#4caf50' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={new Date(file.uploadedAt).toLocaleDateString()}
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Description sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t('noFilesUploaded')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadRecords;