import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AadhaarLogin = () => {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const aadhaarToEmailMap = {
    "123412341234": "demo1@gmail.com",
    "567856785678": "demo2@gmail.com",
    "901290129012": "demo3@gmail.com",
  };

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    if (!aadhaarToEmailMap[aadhaar]) {
      setError("Invalid Aadhaar number.");
      return;
    }

    const linkedEmail = aadhaarToEmailMap[aadhaar];
    setEmail(linkedEmail);

    try {
      await signInWithEmailAndPassword(auth, linkedEmail, "Demo@123");
      setMessage(`Signed in as ${linkedEmail}`);
      navigate('/patient-dashboard');
    } catch {
      try {
        await createUserWithEmailAndPassword(auth, linkedEmail, "Demo@123");
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          aadhaar: aadhaar,
          email: linkedEmail,
          createdAt: new Date(),
        });
        setMessage(`Account created and linked for ${linkedEmail}`);
        navigate('/patient-dashboard');
      } catch (e) {
        setError("Firebase error: " + e.message);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, mt: 10, textAlign: 'center', bgcolor: "#0f172a", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ color: '#4ade80', mb: 3 }}>Patient Aadhaar Login</Typography>
      <TextField
        fullWidth
        label="Enter Aadhaar Number"
        value={aadhaar}
        onChange={e => setAadhaar(e.target.value)}
        variant="filled"
        sx={{ mb: 2, bgcolor: 'rgba(30, 41, 59, 0.8)', input: { color: '#f1f5f9' } }}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ background: 'linear-gradient(45deg, #4ade80, #22d3ee)', mb: 2 }}>
        Login with Aadhaar
      </Button>
      {email && <Typography sx={{ color: '#94a3b8', mb: 1 }}>Linked Gmail: <strong>{email}</strong></Typography>}
      {message && <Alert severity="success" sx={{ mb: 1 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
    </Box>
  );
};

export default AadhaarLogin;
