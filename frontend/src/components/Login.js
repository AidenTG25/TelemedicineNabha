import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Container,
  Grid,
  Fade,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  LocalHospital,
  Person,
  LocalPharmacy,
  MedicalServices,
  Language,
  CreditCard,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          setError(t('passwordMismatch'));
          setLoading(false);
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: email,
          role: role,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          role: 'patient',
          createdAt: new Date(),
        });
      }
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'doctor':
        return <LocalHospital sx={{ color: '#4ade80' }} />;
      case 'pharmacist':
        return <LocalPharmacy sx={{ color: '#4ade80' }} />;
      default:
        return <Person sx={{ color: '#4ade80' }} />;
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Branding */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
                  <MedicalServices 
                    sx={{ 
                      fontSize: 48, 
                      color: '#4ade80',
                      mr: 2,
                    }} 
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 800,
                      fontSize: { xs: '2rem', md: '3rem' },
                    }}
                  >
                    TeleMed
                  </Typography>
                </Box>
                
                <Typography
                  variant="h4"
                  sx={{
                    color: '#f1f5f9',
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  {t('telemedicine')}
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    color: '#94a3b8',
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  {t('healthcareAtYourFingertips')}
                </Typography>

                {/* Language Selector */}
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Button
                    startIcon={<Language />}
                    onClick={() => changeLanguage('en')}
                    sx={{
                      color: '#94a3b8',
                      borderColor: '#334155',
                      '&:hover': {
                        color: '#4ade80',
                        borderColor: '#4ade80',
                      },
                    }}
                    variant="outlined"
                  >
                    English
                  </Button>
                  <Button
                    onClick={() => changeLanguage('hi')}
                    sx={{
                      color: '#94a3b8',
                      borderColor: '#334155',
                      '&:hover': {
                        color: '#4ade80',
                        borderColor: '#4ade80',
                      },
                    }}
                    variant="outlined"
                  >
                    हिंदी
                  </Button>
                  <Button
                    onClick={() => changeLanguage('pa')}
                    sx={{
                      color: '#94a3b8',
                      borderColor: '#334155',
                      '&:hover': {
                        color: '#4ade80',
                        borderColor: '#4ade80',
                      },
                    }}
                    variant="outlined"
                  >
                    ਪੰਜਾਬੀ
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1200}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(77, 222, 128, 0.2)',
                  borderRadius: 3,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      mb: 3,
                      color: '#f1f5f9',
                      fontWeight: 700,
                    }}
                  >
                    {isLogin ? t('signIn') : t('signUp')}
                  </Typography>

                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label={t('email')}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(30, 41, 59, 0.5)',
                          borderRadius: 2,
                          color: '#f1f5f9',
                          '& fieldset': {
                            borderColor: 'rgba(77, 222, 128, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(77, 222, 128, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4ade80',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                          '&.Mui-focused': {
                            color: '#4ade80',
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={t('password')}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(30, 41, 59, 0.5)',
                          borderRadius: 2,
                          color: '#f1f5f9',
                          '& fieldset': {
                            borderColor: 'rgba(77, 222, 128, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(77, 222, 128, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4ade80',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                          '&.Mui-focused': {
                            color: '#4ade80',
                          },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              onClick={() => setShowPassword(!showPassword)} 
                              edge="end"
                              sx={{ color: '#94a3b8' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {!isLogin && (
                      <>
                        <TextField
                          fullWidth
                          label={t('confirmPassword')}
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          variant="outlined"
                          sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'rgba(30, 41, 59, 0.5)',
                              borderRadius: 2,
                              color: '#f1f5f9',
                              '& fieldset': {
                                borderColor: 'rgba(77, 222, 128, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(77, 222, 128, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#4ade80',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#94a3b8',
                              '&.Mui-focused': {
                                color: '#4ade80',
                              },
                            },
                          }}
                        />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <InputLabel 
                            sx={{ 
                              color: '#94a3b8',
                              '&.Mui-focused': {
                                color: '#4ade80',
                              },
                            }}
                          >
                            {t('role')}
                          </InputLabel>
                          <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label={t('role')}
                            sx={{
                              backgroundColor: 'rgba(30, 41, 59, 0.5)',
                              borderRadius: 2,
                              color: '#f1f5f9',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(77, 222, 128, 0.3)',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(77, 222, 128, 0.5)',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4ade80',
                              },
                            }}
                          >
                            <MenuItem value="patient" sx={{ color: '#f1f5f9' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {getRoleIcon('patient')}
                                <Typography sx={{ ml: 1 }}>{t('patient')}</Typography>
                              </Box>
                            </MenuItem>
                            <MenuItem value="doctor" sx={{ color: '#f1f5f9' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {getRoleIcon('doctor')}
                                <Typography sx={{ ml: 1 }}>{t('doctor')}</Typography>
                              </Box>
                            </MenuItem>
                            <MenuItem value="pharmacist" sx={{ color: '#f1f5f9' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {getRoleIcon('pharmacist')}
                                <Typography sx={{ ml: 1 }}>{t('pharmacist')}</Typography>
                              </Box>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
                        color: '#0f172a',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
                          transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                          background: 'rgba(77, 222, 128, 0.3)',
                          color: 'rgba(15, 23, 42, 0.5)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {loading ? t('loading') : (isLogin ? t('signIn') : t('signUp'))}
                    </Button>

                    <Divider sx={{ mb: 3, borderColor: 'rgba(77, 222, 128, 0.2)' }}>
                      <Typography sx={{ color: '#94a3b8' }}>{t('or')}</Typography>
                    </Divider>

                    <Button
                      fullWidth
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        border: '1px solid rgba(77, 222, 128, 0.3)',
                        color: '#f1f5f9',
                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                        '&:hover': {
                          borderColor: '#4ade80',
                          backgroundColor: 'rgba(77, 222, 128, 0.1)',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {t('signInWithGoogle')}
                    </Button>

                    {/* Patient Login Button */}
                    <Button
                      fullWidth
                      onClick={() => navigate('/aadhaar-login')}
                      startIcon={<CreditCard />}
                      sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        border: '2px solid rgba(245, 158, 11, 0.5)',
                        color: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#f59e0b',
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Patient Login (Aadhaar)
                    </Button>

                    <Button
                      fullWidth
                      onClick={() => setIsLogin(!isLogin)}
                      sx={{
                        color: '#4ade80',
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: 'rgba(77, 222, 128, 0.1)',
                        },
                      }}
                    >
                      {isLogin ? t('needAccount') : t('haveAccount')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;










// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   InputAdornment,
//   Container,
//   Grid,
//   Fade,
//   Stack,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   Google,
//   LocalHospital,
//   Person,
//   LocalPharmacy,
//   MedicalServices,
//   Language,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase/config';

// const Login = () => {
//   const { t, i18n } = useTranslation();
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('patient');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         if (password !== confirmPassword) {
//           setError(t('passwordMismatch'));
//           setLoading(false);
//           return;
//         }
        
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         await setDoc(doc(db, 'users', userCredential.user.uid), {
//           email: email,
//           role: role,
//           createdAt: new Date(),
//         });
//       }
//     } catch (error) {
//       setError(error.message);
//     }
    
//     setLoading(false);
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
      
//       const userDoc = await getDoc(doc(db, 'users', result.user.uid));
//       if (!userDoc.exists()) {
//         await setDoc(doc(db, 'users', result.user.uid), {
//           email: result.user.email,
//           role: 'patient',
//           createdAt: new Date(),
//         });
//       }
//     } catch (error) {
//       setError(error.message);
//     }
    
//     setLoading(false);
//   };

//   const getRoleIcon = (roleType) => {
//     switch (roleType) {
//       case 'doctor':
//         return <LocalHospital sx={{ color: '#4ade80' }} />;
//       case 'pharmacist':
//         return <LocalPharmacy sx={{ color: '#4ade80' }} />;
//       default:
//         return <Person sx={{ color: '#4ade80' }} />;
//     }
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         p: 2,
//       }}
//     >
//       <Container maxWidth="md">
//         <Grid container spacing={4} alignItems="center">
//           {/* Left Side - Branding */}
//           <Grid item xs={12} md={6}>
//             <Fade in={true} timeout={1000}>
//               <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
//                   <MedicalServices 
//                     sx={{ 
//                       fontSize: 48, 
//                       color: '#4ade80',
//                       mr: 2,
//                     }} 
//                   />
//                   <Typography
//                     variant="h2"
//                     sx={{
//                       background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                       backgroundClip: 'text',
//                       WebkitBackgroundClip: 'text',
//                       color: 'transparent',
//                       fontWeight: 800,
//                       fontSize: { xs: '2rem', md: '3rem' },
//                     }}
//                   >
//                     TeleMed
//                   </Typography>
//                 </Box>
                
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     color: '#f1f5f9',
//                     mb: 2,
//                     fontWeight: 600,
//                     fontSize: { xs: '1.5rem', md: '2rem' },
//                   }}
//                 >
//                   {t('telemedicine')}
//                 </Typography>
                
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     color: '#94a3b8',
//                     mb: 4,
//                     fontSize: { xs: '1rem', md: '1.25rem' },
//                   }}
//                 >
//                   {t('healthcareAtYourFingertips')}
//                 </Typography>

//                 {/* Language Selector */}
//                 <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
//                   <Button
//                     startIcon={<Language />}
//                     onClick={() => changeLanguage('en')}
//                     sx={{
//                       color: '#94a3b8',
//                       borderColor: '#334155',
//                       '&:hover': {
//                         color: '#4ade80',
//                         borderColor: '#4ade80',
//                       },
//                     }}
//                     variant="outlined"
//                   >
//                     English
//                   </Button>
//                   <Button
//                     onClick={() => changeLanguage('hi')}
//                     sx={{
//                       color: '#94a3b8',
//                       borderColor: '#334155',
//                       '&:hover': {
//                         color: '#4ade80',
//                         borderColor: '#4ade80',
//                       },
//                     }}
//                     variant="outlined"
//                   >
//                     हिंदी
//                   </Button>
//                   <Button
//                     onClick={() => changeLanguage('pa')}
//                     sx={{
//                       color: '#94a3b8',
//                       borderColor: '#334155',
//                       '&:hover': {
//                         color: '#4ade80',
//                         borderColor: '#4ade80',
//                       },
//                     }}
//                     variant="outlined"
//                   >
//                     ਪੰਜਾਬੀ
//                   </Button>
//                 </Stack>
//               </Box>
//             </Fade>
//           </Grid>

//           {/* Right Side - Login Form */}
//           <Grid item xs={12} md={6}>
//             <Fade in={true} timeout={1200}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   background: 'rgba(15, 23, 42, 0.8)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   borderRadius: 3,
//                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
//                 }}
//               >
//                 <CardContent sx={{ p: 4 }}>
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       textAlign: 'center',
//                       mb: 3,
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                     }}
//                   >
//                     {isLogin ? t('signIn') : t('signUp')}
//                   </Typography>

//                   {error && (
//                     <Alert 
//                       severity="error" 
//                       sx={{ 
//                         mb: 3,
//                         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//                         color: '#ef4444',
//                         border: '1px solid rgba(239, 68, 68, 0.2)',
//                       }}
//                     >
//                       {error}
//                     </Alert>
//                   )}

//                   <Box component="form" onSubmit={handleSubmit}>
//                     <TextField
//                       fullWidth
//                       label={t('email')}
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       variant="outlined"
//                       sx={{
//                         mb: 3,
//                         '& .MuiOutlinedInput-root': {
//                           backgroundColor: 'rgba(30, 41, 59, 0.5)',
//                           borderRadius: 2,
//                           color: '#f1f5f9',
//                           '& fieldset': {
//                             borderColor: 'rgba(77, 222, 128, 0.3)',
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'rgba(77, 222, 128, 0.5)',
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: '#4ade80',
//                           },
//                         },
//                         '& .MuiInputLabel-root': {
//                           color: '#94a3b8',
//                           '&.Mui-focused': {
//                             color: '#4ade80',
//                           },
//                         },
//                       }}
//                     />

//                     <TextField
//                       fullWidth
//                       label={t('password')}
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       variant="outlined"
//                       sx={{
//                         mb: 3,
//                         '& .MuiOutlinedInput-root': {
//                           backgroundColor: 'rgba(30, 41, 59, 0.5)',
//                           borderRadius: 2,
//                           color: '#f1f5f9',
//                           '& fieldset': {
//                             borderColor: 'rgba(77, 222, 128, 0.3)',
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'rgba(77, 222, 128, 0.5)',
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: '#4ade80',
//                           },
//                         },
//                         '& .MuiInputLabel-root': {
//                           color: '#94a3b8',
//                           '&.Mui-focused': {
//                             color: '#4ade80',
//                           },
//                         },
//                       }}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton 
//                               onClick={() => setShowPassword(!showPassword)} 
//                               edge="end"
//                               sx={{ color: '#94a3b8' }}
//                             >
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />

//                     {!isLogin && (
//                       <>
//                         <TextField
//                           fullWidth
//                           label={t('confirmPassword')}
//                           type="password"
//                           value={confirmPassword}
//                           onChange={(e) => setConfirmPassword(e.target.value)}
//                           required
//                           variant="outlined"
//                           sx={{
//                             mb: 3,
//                             '& .MuiOutlinedInput-root': {
//                               backgroundColor: 'rgba(30, 41, 59, 0.5)',
//                               borderRadius: 2,
//                               color: '#f1f5f9',
//                               '& fieldset': {
//                                 borderColor: 'rgba(77, 222, 128, 0.3)',
//                               },
//                               '&:hover fieldset': {
//                                 borderColor: 'rgba(77, 222, 128, 0.5)',
//                               },
//                               '&.Mui-focused fieldset': {
//                                 borderColor: '#4ade80',
//                               },
//                             },
//                             '& .MuiInputLabel-root': {
//                               color: '#94a3b8',
//                               '&.Mui-focused': {
//                                 color: '#4ade80',
//                               },
//                             },
//                           }}
//                         />

//                         <FormControl fullWidth sx={{ mb: 3 }}>
//                           <InputLabel 
//                             sx={{ 
//                               color: '#94a3b8',
//                               '&.Mui-focused': {
//                                 color: '#4ade80',
//                               },
//                             }}
//                           >
//                             {t('role')}
//                           </InputLabel>
//                           <Select
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             label={t('role')}
//                             sx={{
//                               backgroundColor: 'rgb(0, 0, 0)',
//                               borderRadius: 2,
//                               color: '#f1f5f9',
//                               '& .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(77, 222, 128, 0.3)',
//                               },
//                               '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(77, 222, 128, 0.5)',
//                               },
//                               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: '#4ade80',
//                               },
//                             }}
//                           >
//                             <MenuItem value="patient" sx={{ color: '#f1f5f9' }}>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 {getRoleIcon('patient')}
//                                 <Typography sx={{ ml: 1 }}>{t('patient')}</Typography>
//                               </Box>
//                             </MenuItem>
//                             <MenuItem value="doctor" sx={{ color: '#f1f5f9' }}>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 {getRoleIcon('doctor')}
//                                 <Typography sx={{ ml: 1 }}>{t('doctor')}</Typography>
//                               </Box>
//                             </MenuItem>
//                             <MenuItem value="pharmacist" sx={{ color: '#f1f5f9' }}>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 {getRoleIcon('pharmacist')}
//                                 <Typography sx={{ ml: 1 }}>{t('pharmacist')}</Typography>
//                               </Box>
//                             </MenuItem>
//                           </Select>
//                         </FormControl>
//                       </>
//                     )}

//                     <Button
//                       type="submit"
//                       fullWidth
//                       disabled={loading}
//                       sx={{
//                         py: 1.5,
//                         mb: 3,
//                         borderRadius: 2,
//                         background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                         color: '#0f172a',
//                         fontWeight: 600,
//                         fontSize: '1.1rem',
//                         '&:hover': {
//                           background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
//                           transform: 'translateY(-1px)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(77, 222, 128, 0.3)',
//                           color: 'rgba(15, 23, 42, 0.5)',
//                         },
//                         transition: 'all 0.2s ease-in-out',
//                       }}
//                     >
//                       {loading ? t('loading') : (isLogin ? t('signIn') : t('signUp'))}
//                     </Button>

//                     <Divider sx={{ mb: 3, borderColor: 'rgba(77, 222, 128, 0.2)' }}>
//                       <Typography sx={{ color: '#94a3b8' }}>{t('or')}</Typography>
//                     </Divider>

//                     <Button
//                       fullWidth
//                       onClick={handleGoogleSignIn}
//                       disabled={loading}
//                       startIcon={<Google />}
//                       sx={{
//                         py: 1.5,
//                         mb: 3,
//                         borderRadius: 2,
//                         border: '1px solid rgba(77, 222, 128, 0.3)',
//                         color: '#f1f5f9',
//                         backgroundColor: 'rgba(30, 41, 59, 0.5)',
//                         '&:hover': {
//                           borderColor: '#4ade80',
//                           backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                           transform: 'translateY(-1px)',
//                         },
//                         transition: 'all 0.2s ease-in-out',
//                       }}
//                     >
//                       {t('signInWithGoogle')}
//                     </Button>

//                     <Button
//                       fullWidth
//                       onClick={() => setIsLogin(!isLogin)}
//                       sx={{
//                         color: '#4ade80',
//                         textTransform: 'none',
//                         fontSize: '1rem',
//                         '&:hover': {
//                           backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                         },
//                       }}
//                     >
//                       {isLogin ? t('Register-Account') : t('haveAccount')}
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Fade>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Login;

















// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   TextField,
// //   Button,
// //   Typography,
// //   Alert,
// //   Divider,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   IconButton,
// //   InputAdornment,
// //   Container,
// //   Grid,
// //   Paper,
// // } from '@mui/material';
// // import {
// //   Visibility,
// //   VisibilityOff,
// //   Google,
// //   LocalHospital,
// //   Person,
// //   LocalPharmacy,
// // } from '@mui/icons-material';
// // import { useTranslation } from 'react-i18next';
// // import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// // import { doc, setDoc, getDoc } from 'firebase/firestore';
// // import { auth, db } from '../firebase/config';

// // const Login = () => {
// //   const { t, i18n } = useTranslation();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [role, setRole] = useState('patient');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       if (isLogin) {
// //         await signInWithEmailAndPassword(auth, email, password);
// //       } else {
// //         if (password !== confirmPassword) {
// //           setError(t('passwordMismatch'));
// //           setLoading(false);
// //           return;
// //         }
// //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //         // Set user role in Firestore
// //         await setDoc(doc(db, 'users', userCredential.user.uid), {
// //           email: email,
// //           role: role,
// //           createdAt: new Date(),
// //         });
// //       }
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //     setLoading(false);
// //   };

// //   const handleGoogleSignIn = async () => {
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const provider = new GoogleAuthProvider();
// //       const result = await signInWithPopup(auth, provider);

// //       // Check if user already exists
// //       const userDoc = await getDoc(doc(db, 'users', result.user.uid));
// //       if (!userDoc.exists()) {
// //         // Set default role for new Google users
// //         await setDoc(doc(db, 'users', result.user.uid), {
// //           email: result.user.email,
// //           role: 'patient',
// //           createdAt: new Date(),
// //         });
// //       }
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //     setLoading(false);
// //   };

// //   const getRoleIcon = (roleType) => {
// //     switch (roleType) {
// //       case 'doctor':
// //         return <LocalHospital sx={{ color: '#2196f3' }} />;
// //       case 'pharmacist':
// //         return <LocalPharmacy sx={{ color: '#ff9800' }} />;
// //       default:
// //         return <Person sx={{ color: '#4caf50' }} />;
// //     }
// //   };

// //   const changeLanguage = (lng) => {
// //     i18n.changeLanguage(lng);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100vh',
// //         background: 'linear-gradient(135deg, #0e2412ff 0%, #172e1dff 100%)',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         py: 3,
// //       }}
// //     >
// //       <Container maxWidth="sm">
// //         <Paper
// //           elevation={24}
// //           sx={{
// //             borderRadius: 4,
// //             overflow: 'hidden',
// //             background: 'rgba(255, 255, 255, 0.95)',
// //             backdropFilter: 'blur(10px)',
// //           }}
// //         >
// //           {/* Header */}
// //           <Box
// //             sx={{
// //               background: 'linear-gradient(45deg, #121f2aff 30%, #122529ff 90%)',
// //               color: 'white',
// //               p: 4,
// //               textAlign: 'center',
// //             }}
// //           >
// //             <LocalHospital sx={{ fontSize: 48, mb: 2 }} />
// //             <Typography variant="h4" component="h1" gutterBottom>
// //               {t('telemedicine')}
// //             </Typography>
// //             <Typography variant="body1" sx={{ opacity: 0.9 }}>
// //               {t('healthcareAtYourFingertips')}
// //             </Typography>
// //           </Box>

// //           <CardContent sx={{ p: 4 }}>
// //             {/* Language Selector */}
// //             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
// //               <Button size="small" onClick={() => changeLanguage('en')} sx={{ mx: 1 }}>
// //                 English
// //               </Button>
// //               <Button size="small" onClick={() => changeLanguage('hi')} sx={{ mx: 1 }}>
// //                 हिंदी
// //               </Button>
// //               <Button size="small" onClick={() => changeLanguage('pa')} sx={{ mx: 1 }}>
// //                 ਪੰਜਾਬੀ
// //               </Button>
// //             </Box>

// //             {error && (
// //               <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
// //                 {error}
// //               </Alert>
// //             )}

// //             <form onSubmit={handleSubmit}>
// //               <Grid container spacing={3}>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label={t('email')}
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                     variant="outlined"
// //                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label={t('password')}
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                     variant="outlined"
// //                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
// //                     InputProps={{
// //                       endAdornment: (
// //                         <InputAdornment position="end">
// //                           <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
// //                             {showPassword ? <VisibilityOff /> : <Visibility />}
// //                           </IconButton>
// //                         </InputAdornment>
// //                       ),
// //                     }}
// //                   />
// //                 </Grid>

// //                 {!isLogin && (
// //                   <>
// //                     <Grid item xs={12}>
// //                       <TextField
// //                         fullWidth
// //                         label={t('confirmPassword')}
// //                         type="password"
// //                         value={confirmPassword}
// //                         onChange={(e) => setConfirmPassword(e.target.value)}
// //                         required
// //                         variant="outlined"
// //                         sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
// //                       />
// //                     </Grid>

// //                     <Grid item xs={12}>
// //                       <FormControl fullWidth variant="outlined">
// //                         <InputLabel>{t('role')}</InputLabel>
// //                         <Select
// //                           value={role}
// //                           onChange={(e) => setRole(e.target.value)}
// //                           label={t('role')}
// //                           sx={{ borderRadius: 2 }}
// //                         >
// //                           <MenuItem value="patient">
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                               {getRoleIcon('patient')}
// //                               {t('patient')}
// //                             </Box>
// //                           </MenuItem>
// //                           <MenuItem value="doctor">
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                               {getRoleIcon('doctor')}
// //                               {t('doctor')}
// //                             </Box>
// //                           </MenuItem>
// //                           <MenuItem value="pharmacist">
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                               {getRoleIcon('pharmacist')}
// //                               {t('pharmacist')}
// //                             </Box>
// //                           </MenuItem>
// //                         </Select>
// //                       </FormControl>
// //                     </Grid>
// //                   </>
// //                 )}

// //                 <Grid item xs={12}>
// //                   <Button
// //                     type="submit"
// //                     fullWidth
// //                     variant="contained"
// //                     size="large"
// //                     disabled={loading}
// //                     sx={{
// //                       py: 1.5,
// //                       borderRadius: 2,
// //                       background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
// //                       '&:hover': {
// //                         background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)',
// //                       },
// //                     }}
// //                   >
// //                     {loading ? t('loading') : (isLogin ? t('signIn') : t('signUp'))}
// //                   </Button>
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <Divider sx={{ my: 2 }}>
// //                     <Typography variant="body2" color="text.secondary">
// //                       {t('or')}
// //                     </Typography>
// //                   </Divider>
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <Button
// //                     fullWidth
// //                     variant="outlined"
// //                     size="large"
// //                     onClick={handleGoogleSignIn}
// //                     disabled={loading}
// //                     startIcon={<Google />}
// //                     sx={{
// //                       py: 1.5,
// //                       borderRadius: 2,
// //                       borderColor: '#db4437',
// //                       color: '#db4437',
// //                       '&:hover': {
// //                         borderColor: '#c23321',
// //                         backgroundColor: 'rgba(219, 68, 55, 0.04)',
// //                       },
// //                     }}
// //                   >
// //                     {t('signInWithGoogle')}
// //                   </Button>
// //                 </Grid>

// //                 <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
// //                   <Button
// //                     onClick={() => setIsLogin(!isLogin)}
// //                     sx={{ textTransform: 'none' }}
// //                   >
// //                     {isLogin ? t('needAccount') : t('haveAccount')}
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             </form>
// //           </CardContent>
// //         </Paper>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Login;