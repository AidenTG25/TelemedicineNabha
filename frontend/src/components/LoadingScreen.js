import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Container
} from '@mui/material';
import { LocalHospital } from '@mui/icons-material';

const LoadingScreen = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}
      >
        <LocalHospital 
          sx={{ 
            fontSize: 64, 
            color: '#2196f3', 
            mb: 2,
            animation: 'pulse 2s infinite'
          }} 
        />
        <CircularProgress 
          size={48} 
          sx={{ 
            color: '#2196f3', 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            fontWeight: 500
          }}
        >
          Loading Telemedicine Platform...
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#999',
            mt: 1
          }}
        >
          Please wait while we prepare your healthcare dashboard
        </Typography>
      </Box>
    </Container>
  );
};

export default LoadingScreen;