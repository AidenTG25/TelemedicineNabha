// VideoCall.js - Using Jitsi Meet
import React, { useState, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Alert,
  Stack,
} from '@mui/material';
import {
  CallEnd,
  ArrowBack,
} from '@mui/icons-material';

const VideoCallComponent = ({ 
  role, 
  currentUser, 
  callingPatient, 
  onCallEnd,
  roomName 
}) => {
  const [isInCall, setIsInCall] = useState(false);
  const [callError, setCallError] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // Generate unique room name
    const generateRoomName = () => {
      if (roomName) {
        return roomName;
      }
      
      if (callingPatient && currentUser) {
        return `telemedicine-${callingPatient.id}-${currentUser.uid}`;
      }
      
      return `telemedicine-room-${Date.now()}`;
    };

    setRoomId(generateRoomName());
  }, [roomName, callingPatient, currentUser]);

  const handleCallReady = () => {
    console.log('📹 Video call is ready');
    setIsInCall(true);
  };

  const handleCallLeft = () => {
    console.log('📴 Left the video call');
    setIsInCall(false);
    if (onCallEnd) {
      onCallEnd();
    }
  };

  const handleCallError = (error) => {
    console.error('❌ Video call error:', error);
    setCallError('Failed to connect to video call. Please try again.');
  };

  const getUserDisplayName = () => {
    if (role === 'doctor') {
      return `Dr. ${currentUser?.displayName || currentUser?.email || 'Doctor'}`;
    } else {
      return currentUser?.displayName || currentUser?.email || 'Patient';
    }
  };

  const getWelcomeMessage = () => {
    if (role === 'doctor' && callingPatient) {
      return `Video consultation with ${callingPatient.name}`;
    } else if (role === 'patient') {
      return 'Video consultation with your doctor';
    }
    return 'Video Consultation';
  };

  if (!roomId) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Setting up video call...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      background: '#0f172a',
      position: 'relative'
    }}>
      {/* Header */}
      <Card
        elevation={0}
        sx={{
          background: 'rgba(30, 41, 59, 0.9)',
          border: '1px solid rgba(77, 222, 128, 0.2)',
          borderRadius: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 600 }}>
                🏥 TeleMedicine Video Call
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                {getWelcomeMessage()}
              </Typography>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleCallLeft}
              sx={{
                color: '#ef4444',
                borderColor: '#ef4444',
                '&:hover': {
                  borderColor: '#dc2626',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              End Call & Return
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {callError && (
        <Alert 
          severity="error" 
          sx={{ 
            m: 2, 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
          onClose={() => setCallError('')}
        >
          {callError}
        </Alert>
      )}

      {/* Jitsi Meeting Container */}
      <Box sx={{ 
        height: 'calc(100vh - 120px)', 
        width: '100%',
        '& iframe': {
          border: 'none',
        }
      }}>
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={roomId}
          configOverwrite={{
            startWithAudioMuted: role === 'patient', // Patient starts muted
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            requireDisplayName: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            DISABLE_PRESENCE_STATUS: true,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
            HIDE_INVITE_MORE_HEADER: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: '#0f172a',
            TOOLBAR_BUTTONS: [
              'microphone', 
              'camera', 
              'desktop', 
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'profile',
              'settings',
              'videoquality',
            ],
          }}
          userInfo={{
            displayName: getUserDisplayName(),
            email: currentUser?.email,
          }}
          onApiReady={handleCallReady}
          onReadyToClose={handleCallLeft}
          onApiError={handleCallError}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100%';
            iframeRef.style.width = '100%';
          }}
        />
      </Box>

      {/* Connection Status */}
      {isInCall && (
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            right: 20,
            background: 'rgba(77, 222, 128, 0.9)',
            color: '#0f172a',
            px: 2,
            py: 1,
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: 600,
            zIndex: 20,
          }}
        >
          🟢 Connected
        </Box>
      )}
    </Box>
  );
};

export default VideoCallComponent;

