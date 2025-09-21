// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Badge,
//   Fab,
// } from '@mui/material';
// import {
//   AccountCircle,
//   Logout,
//   Psychology,
//   CloudUpload,
//   Medication,
//   VideoCall,
//   Notifications,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import SymptomChecker from './SymptomChecker';
// import UploadRecords from './UploadRecords';
// import PrescriptionList from './PrescriptionList';
// import VideoCallComponent from './VideoCall';
// import LoadingScreen from './LoadingScreen';

// const PatientDashboard = () => {
//   const { t } = useTranslation();
//   const [currentTab, setCurrentTab] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState(3);
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const tabContent = [
//     {
//       label: t('symptomChecker'),
//       icon: <Psychology />,
//       component: <SymptomChecker />,
//       color: '#e91e63',
//     },
//     {
//       label: t('healthRecords'),
//       icon: <CloudUpload />,
//       component: <UploadRecords />,
//       color: '#2196f3',
//     },
//     {
//       label: t('prescriptions'),
//       icon: <Medication />,
//       component: <PrescriptionList />,
//       color: '#4caf50',
//     },
//     {
//       label: t('videoCall'),
//       icon: <VideoCall />,
//       component: <VideoCallComponent role="patient" />,
//       color: '#ff9800',
//     },
//   ];

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
//       {/* Beautiful App Bar */}
//       <AppBar 
//         position="static" 
//         sx={{ 
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
//             {t('patientDashboard')}
//           </Typography>

//           <IconButton color="inherit" sx={{ mr: 2 }}>
//             <Badge badgeContent={notifications} color="error">
//               <Notifications />
//             </Badge>
//           </IconButton>

//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-haspopup="true"
//             onClick={handleMenuOpen}
//             color="inherit"
//           >
//             <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
//               <AccountCircle />
//             </Avatar>
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             sx={{ mt: 1 }}
//           >
//             <MenuItem onClick={handleLogout}>
//               <Logout sx={{ mr: 1 }} />
//               {t('logout')}
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Welcome Card */}
//       <Box sx={{ p: 3 }}>
//         <Card 
//           sx={{ 
//             mb: 3,
//             background: 'linear-gradient(135deg, #2b3047ff 0%, #764ba2 100%)',
//             color: 'white',
//             borderRadius: 1,
//           }}
//         >
//           <CardContent sx={{ p: 4 }}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
//               {t('welcomeBack')}
//             </Typography>
//             <Typography variant="body1" sx={{ opacity: 0.9 }}>
//               {t('patientWelcomeMessage')}
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* Feature Cards Grid */}
//         <Grid container spacing={3} sx={{ mb: 3 }}>
//           {tabContent.map((tab, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 sx={{
//                   height: 140,
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   background: `linear-gradient(135deg, ${tab.color}15 0%, ${tab.color}25 100%)`,
//                   border: currentTab === index ? `2px solid ${tab.color}` : '2px solid transparent',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: `0 8px 25px ${tab.color}30`,
//                   },
//                 }}
//                 onClick={() => setCurrentTab(index)}
//               >
//                 <CardContent sx={{ textAlign: 'center', p: 3 }}>
//                   <Box sx={{ color: tab.color, mb: 1 }}>
//                     {React.cloneElement(tab.icon, { sx: { fontSize: 40 } })}
//                   </Box>
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {tab.label}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Main Content Area */}
//         <Card sx={{ borderRadius: 3, minHeight: 500 }}>
//           <CardContent sx={{ p: 0 }}>
//             <Tabs
//               value={currentTab}
//               onChange={(e, newValue) => setCurrentTab(newValue)}
//               sx={{
//                 borderBottom: 1,
//                 borderColor: 'divider',
//                 px: 2,
//                 '& .MuiTab-root': {
//                   minHeight: 64,
//                   fontWeight: 500,
//                 },
//               }}
//             >
//               {tabContent.map((tab, index) => (
//                 <Tab
//                   key={index}
//                   icon={tab.icon}
//                   iconPosition="start"
//                   label={tab.label}
//                   sx={{
//                     '&.Mui-selected': {
//                       color: tab.color,
//                     },
//                   }}
//                 />
//               ))}
//             </Tabs>

//             <Box sx={{ p: 3 }}>
//               {tabContent[currentTab].component}
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Emergency Call FAB */}
//       <Fab
//         color="error"
//         aria-label="emergency"
//         sx={{
//           position: 'fixed',
//           bottom: 24,
//           right: 24,
//           background: 'linear-gradient(45deg, #f44336 30%, #e91e63 90%)',
//           '&:hover': {
//             background: 'linear-gradient(45deg, #d32f2f 30%, #c2185b 90%)',
//           },
//         }}
//         onClick={() => {
//           // Emergency call functionality
//           alert(t('emergencyCallInitiated'));
//         }}
//       >
//         <VideoCall />
//       </Fab>
//     </Box>
//   );
// };

// export default PatientDashboard;








// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Fade,
//   Paper,
//   Stack,
//   Fab,
// } from '@mui/material';
// import {
//   AccountCircle,
//   Logout,
//   Psychology,
//   CloudUpload,
//   Medication,
//   VideoCall,
//   Notifications,
//   Emergency,
//   Dashboard,
//   Favorite,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import SymptomChecker from './SymptomChecker';
// import UploadRecords from './UploadRecords';
// import PrescriptionList from './PrescriptionList';
// import VideoCallComponent from './VideoCall';
// import LoadingScreen from './LoadingScreen';

// const PatientDashboard = () => {
//   const { t } = useTranslation();
//   const [currentTab, setCurrentTab] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState(3);
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const tabContent = [
//     {
//       label: t('symptomChecker'),
//       icon: <Psychology />,
//       component: <SymptomChecker />,
//       color: '#4ade80',
//       description: 'AI-powered symptom analysis',
//     },
//     {
//       label: t('healthRecords'),
//       icon: <CloudUpload />,
//       component: <UploadRecords />,
//       color: '#06b6d4',
//       description: 'Upload and manage records',
//     },
//     {
//       label: t('prescriptions'),
//       icon: <Medication />,
//       component: <PrescriptionList />,
//       color: '#8b5cf6',
//       description: 'View your prescriptions',
//     },
//     {
//       label: t('videoCall'),
//       icon: <VideoCall />,
//       component: <VideoCallComponent role="patient" />,
//       color: '#f59e0b',
//       description: 'Connect with doctors',
//     },
//   ];

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
//       }}
//     >
//       <AppBar 
//         position="sticky" 
//         elevation={0}
//         sx={{
//           background: 'rgba(15, 23, 42, 0.8)',
//           backdropFilter: 'blur(20px)',
//           border: '1px solid rgba(77, 222, 128, 0.2)',
//           borderLeft: 'none',
//           borderRight: 'none',
//           borderTop: 'none',
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Dashboard sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
//             <Typography
//               variant="h5"
//               sx={{
//                 background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                 backgroundClip: 'text',
//                 WebkitBackgroundClip: 'text',
//                 color: 'transparent',
//                 fontWeight: 700,
//               }}
//             >
//               {t('patientDashboard')}
//             </Typography>
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <IconButton sx={{ color: '#f1f5f9' }}>
//               <Badge badgeContent={notifications} sx={{ '& .MuiBadge-badge': { backgroundColor: '#4ade80' } }}>
//                 <Notifications />
//               </Badge>
//             </IconButton>
            
//             <IconButton
//               onClick={handleMenuOpen}
//               sx={{ 
//                 color: '#f1f5f9',
//                 border: '1px solid rgba(77, 222, 128, 0.3)',
//                 '&:hover': {
//                   borderColor: '#4ade80',
//                   backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                 },
//               }}
//             >
//               <AccountCircle />
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               sx={{
//                 '& .MuiPaper-root': {
//                   backgroundColor: 'rgba(30, 41, 59, 0.9)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   color: '#f1f5f9',
//                 },
//               }}
//             >
//               <MenuItem onClick={handleLogout} sx={{ color: '#f1f5f9' }}>
//                 <Logout sx={{ mr: 1, color: '#4ade80' }} />
//                 {t('logout')}
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Fade in={true} timeout={800}>
//           <Card
//             elevation={0}
//             sx={{
//               mb: 4,
//               background: 'linear-gradient(135deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//               border: '1px solid rgba(77, 222, 128, 0.2)',
//               borderRadius: 3,
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Grid container alignItems="center" spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       mb: 1,
//                       fontSize: { xs: '1.8rem', md: '2.5rem' },
//                     }}
//                   >
//                     {t('welcomeBack')}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: '#94a3b8',
//                       fontSize: { xs: '1rem', md: '1.25rem' },
//                     }}
//                   >
//                     {t('patientWelcomeMessage')}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                   <Box
//                     sx={{
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       width: 120,
//                       height: 120,
//                       borderRadius: '50%',
//                       background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                       animation: 'pulse 2s infinite',
//                       '@keyframes pulse': {
//                         '0%': { transform: 'scale(1)' },
//                         '50%': { transform: 'scale(1.05)' },
//                         '100%': { transform: 'scale(1)' },
//                       },
//                     }}
//                   >
//                     <Favorite sx={{ fontSize: 48, color: '#0f172a' }} />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Fade>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {tabContent.map((tab, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Fade in={true} timeout={1000 + index * 200}>
//                 <Card
//                   elevation={0}
//                   onClick={() => setCurrentTab(index)}
//                   sx={{
//                     cursor: 'pointer',
//                     background: currentTab === index 
//                       ? `linear-gradient(135deg, ${tab.color}20 0%, ${tab.color}10 100%)`
//                       : 'rgba(30, 41, 59, 0.5)',
//                     border: currentTab === index 
//                       ? `2px solid ${tab.color}`
//                       : '1px solid rgba(77, 222, 128, 0.2)',
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: `0 20px 40px -10px ${tab.color}30`,
//                       borderColor: tab.color,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3, textAlign: 'center' }}>
//                     <Box
//                       sx={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: 60,
//                         height: 60,
//                         borderRadius: 2,
//                         background: `linear-gradient(45deg, ${tab.color}20, ${tab.color}40)`,
//                         mb: 2,
//                       }}
//                     >
//                       {React.cloneElement(tab.icon, { 
//                         sx: { fontSize: 32, color: tab.color } 
//                       })}
//                     </Box>
                    
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         color: '#f1f5f9',
//                         fontWeight: 600,
//                         mb: 1,
//                       }}
//                     >
//                       {tab.label}
//                     </Typography>
                    
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: '#94a3b8',
//                         fontSize: '0.9rem',
//                       }}
//                     >
//                       {tab.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         <Fade in={true} timeout={1200}>
//           <Paper
//             elevation={0}
//             sx={{
//               background: 'rgba(30, 41, 59, 0.5)',
//               backdropFilter: 'blur(20px)',
//               border: '1px solid rgba(77, 222, 128, 0.2)',
//               borderRadius: 3,
//               overflow: 'hidden',
//             }}
//           >
//             <Box
//               sx={{
//                 background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                 p: 2,
//               }}
//             >
//               <Tabs
//                 value={currentTab}
//                 onChange={(event, newValue) => setCurrentTab(newValue)}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{
//                   '& .MuiTab-root': {
//                     color: '#94a3b8',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     textTransform: 'none',
//                     '&.Mui-selected': {
//                       color: '#4ade80',
//                     },
//                   },
//                   '& .MuiTabs-indicator': {
//                     background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                     height: 3,
//                     borderRadius: '1px',
//                   },
//                 }}
//               >
//                 {tabContent.map((tab, index) => (
//                   <Tab
//                     key={index}
//                     icon={React.cloneElement(tab.icon, { sx: { mb: 0.5 } })}
//                     label={tab.label}
//                     iconPosition="start"
//                     sx={{ minHeight: 60 }}
//                   />
//                 ))}
//               </Tabs>
//             </Box>

//             <Box sx={{ p: 3 }}>
//               {tabContent[currentTab].component}
//             </Box>
//           </Paper>
//         </Fade>
//       </Box>

//       <Fab
//         color="error"
//         sx={{
//           position: 'fixed',
//           bottom: 24,
//           right: 24,
//           background: 'linear-gradient(45deg, #ef4444, #dc2626)',
//           boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
//           '&:hover': {
//             background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
//             transform: 'scale(1.05)',
//           },
//           transition: 'all 0.2s ease-in-out',
//         }}
//         onClick={() => {
//           alert(t('emergencyCallInitiated'));
//         }}
//       >
//         <Emergency />
//       </Fab>
//     </Box>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Fade,
//   Paper,
//   Stack,
//   Fab,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import {
//   AccountCircle,
//   Logout,
//   Psychology,
//   CloudUpload,
//   Medication,
//   VideoCall,
//   Notifications,
//   ReportProblem,
//   Dashboard,
//   Favorite,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import SymptomChecker from './SymptomChecker';
// import UploadRecords from './UploadRecords';
// import PrescriptionList from './PrescriptionList';
// import VideoCallComponent from './VideoCall';
// import LoadingScreen from './LoadingScreen';

// const PatientDashboard = () => {
//   const { t } = useTranslation();
//   const [currentTab, setCurrentTab] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState(3);
//   const [loading, setLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Firebase auth listener for current user
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
      
//       // Register user in backend if new patient
//       if (user) {
//         registerPatientInBackend(user);
//       }
//     });

//     // Setup Socket.IO connection and listeners
//     const socketClient = io('http://localhost:5000'); // Backend socket server URL
//     setSocket(socketClient);

//     socketClient.emit('join_role_room', 'patients');

//     // Listen for any doctor responses or call events if needed
//     socketClient.on('call_accepted', (data) => {
//       console.log('Call accepted by doctor:', data);
//     });

//     socketClient.on('call_rejected', (data) => {
//       console.log('Call rejected by doctor:', data);
//     });

//     return () => {
//       unsubscribe();
//       socketClient.disconnect();
//     };
//   }, []);

//   const registerPatientInBackend = async (user) => {
//     try {
//       // Send new patient data to backend so doctors get notified
//       const patientData = {
//         id: user.uid,
//         name: user.displayName || user.email || 'Patient',
//         email: user.email,
//         age: 30, // You can add age collection in signup form
//         condition: 'General Consultation',
//         lastVisit: new Date().toISOString().split('T')[0],
//         status: 'New Patient',
//         priority: 'medium'
//       };

//       // This will trigger the backend to emit 'new_patient' to doctors
//       const response = await fetch('http://localhost:5000/api/patients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${await user.getIdToken()}`
//         },
//         body: JSON.stringify(patientData)
//       });

//       if (response.ok) {
//         console.log('Patient registered in backend successfully');
//       }
//     } catch (error) {
//       console.error('Error registering patient:', error);
//     }
//   };

//   const initiateVideoCall = () => {
//     if (socket && currentUser) {
//       socket.emit('call_initiated', {
//         fromUser: {
//           id: currentUser.uid,
//           name: currentUser.displayName || currentUser.email || 'Patient',
//           email: currentUser.email
//         },
//         toRole: 'doctor'
//       });
      
//       console.log('Video call request sent to doctors');
      
//       // Switch to video call tab
//       setCurrentTab(3); // Video call is the 4th tab (index 3)
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const tabContent = [
//     {
//       label: t('symptomChecker') || 'Symptom Checker',
//       icon: <Psychology />,
//       component: <SymptomChecker />,
//       color: '#4ade80',
//       description: 'AI-powered symptom analysis',
//     },
//     {
//       label: t('healthRecords') || 'Health Records',
//       icon: <CloudUpload />,
//       component: <UploadRecords />,
//       color: '#06b6d4',
//       description: 'Upload and manage records',
//     },
//     {
//       label: t('prescriptions') || 'Prescriptions',
//       icon: <Medication />,
//       component: <PrescriptionList />,
//       color: '#8b5cf6',
//       description: 'View your prescriptions',
//     },
//     {
//       label: t('videoCall') || 'Video Call',
//       icon: <VideoCall />,
//       component: <VideoCallComponent role="patient" currentUser={currentUser} />,
//       color: '#f59e0b',
//       description: 'Connect with doctors',
//     },
//   ];

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
//       }}
//     >
//       <AppBar 
//         position="sticky" 
//         elevation={0}
//         sx={{
//           background: 'rgba(15, 23, 42, 0.8)',
//           backdropFilter: 'blur(20px)',
//           border: '1px solid rgba(77, 222, 128, 0.2)',
//           borderLeft: 'none',
//           borderRight: 'none',
//           borderTop: 'none',
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Dashboard sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
//             <Typography
//               variant="h5"
//               sx={{
//                 background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                 backgroundClip: 'text',
//                 WebkitBackgroundClip: 'text',
//                 color: 'transparent',
//                 fontWeight: 700,
//               }}
//             >
//               {t('patientDashboard') || 'Patient Dashboard'}
//             </Typography>
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <IconButton sx={{ color: '#f1f5f9' }}>
//               <Badge badgeContent={notifications} sx={{ '& .MuiBadge-badge': { backgroundColor: '#4ade80' } }}>
//                 <Notifications />
//               </Badge>
//             </IconButton>
            
//             <IconButton
//               onClick={handleMenuOpen}
//               sx={{ 
//                 color: '#f1f5f9',
//                 border: '1px solid rgba(77, 222, 128, 0.3)',
//                 '&:hover': {
//                   borderColor: '#4ade80',
//                   backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                 },
//               }}
//             >
//               <AccountCircle />
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               sx={{
//                 '& .MuiPaper-root': {
//                   backgroundColor: 'rgba(30, 41, 59, 0.9)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   color: '#f1f5f9',
//                 },
//               }}
//             >
//               <MenuItem onClick={handleLogout} sx={{ color: '#f1f5f9' }}>
//                 <Logout sx={{ mr: 1, color: '#4ade80' }} />
//                 {t('logout') || 'Logout'}
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Fade in={true} timeout={800}>
//           <Card
//             elevation={0}
//             sx={{
//               mb: 4,
//               background: 'linear-gradient(135deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//               border: '1px solid rgba(77, 222, 128, 0.2)',
//               borderRadius: 3,
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Grid container alignItems="center" spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       mb: 1,
//                       fontSize: { xs: '1.8rem', md: '2.5rem' },
//                     }}
//                   >
//                     {t('welcomeBack') || 'Welcome Back!'}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: '#94a3b8',
//                       fontSize: { xs: '1rem', md: '1.25rem' },
//                     }}
//                   >
//                     {t('patientWelcomeMessage') || 'Your health is our priority. How can we help you today?'}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                   <Box
//                     sx={{
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       width: 120,
//                       height: 120,
//                       borderRadius: '50%',
//                       background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                       animation: 'pulse 2s infinite',
//                       '@keyframes pulse': {
//                         '0%': { transform: 'scale(1)' },
//                         '50%': { transform: 'scale(1.05)' },
//                         '100%': { transform: 'scale(1)' },
//                       },
//                     }}
//                   >
//                     <Favorite sx={{ fontSize: 48, color: '#0f172a' }} />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Fade>

//         {/* Quick Video Call Button */}
//         <Fade in={true} timeout={900}>
//           <Card
//             elevation={0}
//             sx={{
//               mb: 4,
//               background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
//               border: '1px solid rgba(245, 158, 11, 0.3)',
//               borderRadius: 3,
//             }}
//           >
//             <CardContent sx={{ p: 3, textAlign: 'center' }}>
//               <Typography variant="h6" sx={{ color: '#f1f5f9', mb: 2 }}>
//                 Need immediate consultation?
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="large"
//                 startIcon={<VideoCall />}
//                 onClick={initiateVideoCall}
//                 sx={{
//                   py: 1.5,
//                   px: 4,
//                   background: 'linear-gradient(45deg, #f59e0b, #d97706)',
//                   fontSize: '1.1rem',
//                   fontWeight: 600,
//                   '&:hover': {
//                     background: 'linear-gradient(45deg, #d97706, #b45309)',
//                     transform: 'translateY(-2px)',
//                   },
//                   transition: 'all 0.2s ease-in-out',
//                 }}
//               >
//                 Call Doctor Now
//               </Button>
//             </CardContent>
//           </Card>
//         </Fade>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {tabContent.map((tab, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Fade in={true} timeout={1000 + index * 200}>
//                 <Card
//                   elevation={0}
//                   onClick={() => setCurrentTab(index)}
//                   sx={{
//                     cursor: 'pointer',
//                     background: currentTab === index 
//                       ? `linear-gradient(135deg, ${tab.color}20 0%, ${tab.color}10 100%)`
//                       : 'rgba(30, 41, 59, 0.5)',
//                     border: currentTab === index 
//                       ? `2px solid ${tab.color}`
//                       : '1px solid rgba(77, 222, 128, 0.2)',
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: `0 20px 40px -10px ${tab.color}30`,
//                       borderColor: tab.color,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3, textAlign: 'center' }}>
//                     <Box
//                       sx={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: 60,
//                         height: 60,
//                         borderRadius: 2,
//                         background: `linear-gradient(45deg, ${tab.color}20, ${tab.color}40)`,
//                         mb: 2,
//                       }}
//                     >
//                       {React.cloneElement(tab.icon, { 
//                         sx: { fontSize: 32, color: tab.color } 
//                       })}
//                     </Box>
                    
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         color: '#f1f5f9',
//                         fontWeight: 600,
//                         mb: 1,
//                       }}
//                     >
//                       {tab.label}
//                     </Typography>
                    
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: '#94a3b8',
//                         fontSize: '0.9rem',
//                       }}
//                     >
//                       {tab.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         <Fade in={true} timeout={1200}>
//           <Paper
//             elevation={0}
//             sx={{
//               background: 'rgba(30, 41, 59, 0.5)',
//               backdropFilter: 'blur(20px)',
//               border: '1px solid rgba(77, 222, 128, 0.2)',
//               borderRadius: 3,
//               overflow: 'hidden',
//             }}
//           >
//             <Box
//               sx={{
//                 background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                 p: 2,
//               }}
//             >
//               <Tabs
//                 value={currentTab}
//                 onChange={(event, newValue) => setCurrentTab(newValue)}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{
//                   '& .MuiTab-root': {
//                     color: '#94a3b8',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     textTransform: 'none',
//                     '&.Mui-selected': {
//                       color: '#4ade80',
//                     },
//                   },
//                   '& .MuiTabs-indicator': {
//                     background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                     height: 3,
//                     borderRadius: '1px',
//                   },
//                 }}
//               >
//                 {tabContent.map((tab, index) => (
//                   <Tab
//                     key={index}
//                     icon={React.cloneElement(tab.icon, { sx: { mb: 0.5 } })}
//                     label={tab.label}
//                     iconPosition="start"
//                     sx={{ minHeight: 60 }}
//                   />
//                 ))}
//               </Tabs>
//             </Box>

//             <Box sx={{ p: 3 }}>
//               {tabContent[currentTab].component}
//             </Box>
//           </Paper>
//         </Fade>
//       </Box>

//       <Fab
//   color="error"
//   sx={{
//     position: 'fixed',
//     bottom: 24,
//     right: 24,
//     background: 'linear-gradient(45deg, #ef4444, #dc2626)',
//     boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
//     '&:hover': {
//       background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
//       transform: 'scale(1.05)',
//     },
//     transition: 'all 0.2s ease-in-out',
//   }}
//   onClick={() => {
//     alert(t('emergencyCallInitiated') || 'Emergency call initiated!');
//   }}
// >
//   <ReportProblem />
// </Fab>

//     </Box>
//   );
// };

// export default PatientDashboard;

// PatientDashboard.js







// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import {
//   Box,
//   Card,
//   Fab,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Fade,
//   Paper,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import {
//   AccountCircle,
//   Logout,
//   Psychology,
//   CloudUpload,
//   Medication,
//   VideoCall,
//   Notifications,
//   ReportProblem,
//   Dashboard,
//   Favorite,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import SymptomChecker from './SymptomChecker';
// import UploadRecords from './UploadRecords';
// import PrescriptionList from './PrescriptionList';
// import VideoCallComponent from './VideoCall';
// import LoadingScreen from './LoadingScreen';

// const PatientDashboard = () => {
//   const { t } = useTranslation();
//   const [currentTab, setCurrentTab] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [videoCallData, setVideoCallData] = useState({ show: false, roomName: null });

//  useEffect(() => {
//   console.log('🚀 PatientDashboard useEffect started');
  
//   const unsubscribe = auth.onAuthStateChanged(async user => {
//     console.log('🔐 Auth state changed:', user ? 'User logged in' : 'No user');
//     setCurrentUser(user);
    
//     if (user) {
//       console.log('👤 Registering patient with backend...');
//       try {
//         const patientData = {
//           id: user.uid,
//           name: user.displayName || user.email,
//           email: user.email,
//         };
        
//         const response = await fetch('http://localhost:5000/api/patients', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(patientData),
//         });
        
//         if (response.ok) {
//           console.log('✅ Patient registered successfully');
//         } else {
//           console.error('❌ Failed to register patient:', response.status);
//         }
//       } catch (error) {
//         console.error('❌ Error registering patient:', error);
//       }
//     }
//   });

//   // Socket.IO Connection with detailed logging
//   console.log('🔌 Connecting to Socket.IO...');
//   const socketClient = io('http://localhost:5000', {
//     transports: ['websocket', 'polling'],
//   });
  
//   socketClient.on('connect', () => {
//     console.log('✅ Socket connected to backend');
//     console.log('🆔 Socket ID:', socketClient.id);
//   });

//   socketClient.on('connect_error', (error) => {
//     console.error('❌ Socket connection error:', error);
//   });

//   socketClient.on('disconnect', (reason) => {
//     console.log('🔌 Socket disconnected:', reason);
//   });

//   setSocket(socketClient);
//   socketClient.emit('join_role_room', 'patients');
//   console.log('🏥 Joined patients room');

//   socketClient.on('incoming_call', ({ fromUser, roomName }) => {
//     console.log('📞 Incoming call from doctor:', fromUser, roomName);
//     setNotifications(n => n + 1);
//     setVideoCallData({ show: true, roomName });
//     setCurrentTab(3);
//   });

//   return () => {
//     console.log('🧹 Cleaning up PatientDashboard useEffect');
//     unsubscribe();
//     socketClient.disconnect();
//   };
// }, []);


//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   const initiateVideoCall = () => {
//   console.log('🎥 initiateVideoCall called');
  
//   if (!socket) {
//     console.error('❌ Socket not available');
//     return;
//   }
  
//   if (!currentUser) {
//     console.error('❌ Current user not available');
//     return;
//   }
  
//   const roomName = `consultation-${currentUser.uid}-${Date.now()}`;
//   console.log('🏠 Generated room name:', roomName);
  
//   const callData = {
//     fromUser: { 
//       id: currentUser.uid, 
//       name: currentUser.displayName || currentUser.email,
//       email: currentUser.email
//     },
//     toRole: 'doctor',
//     roomName,
//   };
  
//   console.log('📡 Emitting call_initiated:', callData);
//   socket.emit('call_initiated', callData);
  
//   console.log('📞 Video call request sent to doctors');
  
//   setVideoCallData({ show: true, roomName });
//   setCurrentTab(3);
  
//   console.log('✅ Video call data set and tab changed');
// };


//   const handleEndVideoCall = () => {
//     setVideoCallData({ show: false, roomName: null });
//     setCurrentTab(0);
//   };

//   if (loading) return <LoadingScreen />;

//   if (videoCallData.show) {
//     return (
//       <VideoCallComponent
//         role="patient"
//         currentUser={currentUser}
//         roomName={videoCallData.roomName}
//         onCallEnd={handleEndVideoCall}
//       />
//     );
//   }

//   const tabContent = [
//     {
//       label: t('symptomChecker') || 'Symptom Checker',
//       icon: <Psychology />,
//       component: <SymptomChecker />,
//       color: '#4ade80',
//       description: 'AI-powered symptom analysis',
//     },
//     {
//       label: t('healthRecords') || 'Health Records',
//       icon: <CloudUpload />,
//       component: <UploadRecords />,
//       color: '#06b6d4',
//       description: 'Upload and manage records',
//     },
//     {
//       label: t('prescriptions') || 'Prescriptions',
//       icon: <Medication />,
//       component: <PrescriptionList />,
//       color: '#8b5cf6',
//       description: 'View your prescriptions',
//     },
//     {
//       label: t('videoCall') || 'Video Call',
//       icon: <VideoCall />,
//       component: (
//         <Box sx={{ textAlign: 'center', py: 4 }}>
//           <Typography variant="h6" sx={{ color: '#f1f5f9', mb: 2 }}>
//             Ready for video consultation
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<VideoCall />}
//             onClick={initiateVideoCall}
//             sx={{
//               background: 'linear-gradient(45deg, #f59e0b, #d97706)',
//               '&:hover': { background: 'linear-gradient(45deg, #d97706, #b45309)' },
//             }}
//           >
//             Start Video Consultation
//           </Button>
//         </Box>
//       ),
//       color: '#f59e0b',
//       description: 'Connect with doctors',
//     },
//   ];

//   return (
//     <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)' }}>
//       <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Dashboard sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
//             <Typography
//               variant="h5"
//               sx={{
//                 background: 'linear-gradient(45deg,#4ade80,#22d3ee)',
//                 backgroundClip: 'text',
//                 WebkitBackgroundClip: 'text',
//                 color: 'transparent',
//                 fontWeight: 700,
//               }}
//             >
//               {t('patientDashboard') || 'Patient Dashboard'}
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <IconButton sx={{ color: '#f1f5f9' }}>
//               <Badge badgeContent={notifications} sx={{ '& .MuiBadge-badge': { backgroundColor: '#4ade80' } }}>
//                 <Notifications />
//               </Badge>
//             </IconButton>
//             <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ color: '#f1f5f9', border: '1px solid rgba(77,222,128,0.3)', '&:hover': { borderColor: '#4ade80', backgroundColor: 'rgba(77,222,128,0.1)' } }}>
//               <AccountCircle />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
//               sx={{ '& .MuiPaper-root': { backgroundColor: 'rgba(30,41,59,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(77,222,128,0.2)', color: '#f1f5f9' } }}>
//               <MenuItem onClick={handleLogout} sx={{ color: '#f1f5f9' }}>
//                 <Logout sx={{ mr: 1, color: '#4ade80' }} />{t('logout') || 'Logout'}
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Fade in timeout={800}>
//           <Card elevation={0} sx={{ mb: 4, background: 'linear-gradient(135deg,rgba(77,222,128,0.1)0%,rgba(34,211,238,0.1)100%)', border: '1px solid rgba(77,222,128,0.2)', borderRadius: 3 }}>
//             <CardContent sx={{ p: 4 }}>
//               <Grid container alignItems="center" spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Typography variant="h3" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
//                     {t('welcomeBack') || 'Welcome Back!'}
//                   </Typography>
//                   <Typography variant="h6" sx={{ color: '#94a3b8', fontSize: { xs: '1rem', md: '1.25rem' } }}>
//                     {t('patientWelcomeMessage') || 'Your health is our priority. How can we help you today?'}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(45deg,#4ade80,#22d3ee)', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } } }}>
//                     <Favorite sx={{ fontSize: 48, color: '#0f172a' }} />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Fade>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {tabContent.map((tab, idx) => (
//             <Grid item xs={12} sm={6} md={3} key={idx}>
//               <Fade in timeout={1000 + idx * 200}>
//                 <Card elevation={0} onClick={() => setCurrentTab(idx)} sx={{
//                   cursor: 'pointer',
//                   background: currentTab === idx ? `linear-gradient(135deg, ${tab.color}20 0%, ${tab.color}10 100%)` : 'rgba(30,41,59,0.5)',
//                   border: currentTab === idx ? `2px solid ${tab.color}` : '1px solid rgba(77,222,128,0.2)',
//                   borderRadius: 3,
//                   transition: 'all 0.3s ease-in-out',
//                   '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 20px 40px -10px ${tab.color}30`, borderColor: tab.color },
//                 }}>
//                   <CardContent sx={{ p: 3, textAlign: 'center' }}>
//                     <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 2, background: `linear-gradient(45deg, ${tab.color}20, ${tab.color}40)`, mb: 2 }}>
//                       {React.cloneElement(tab.icon, { sx: { fontSize: 32, color: tab.color } })}
//                     </Box>
//                     <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 600, mb: 1 }}>{tab.label}</Typography>
//                     <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>{tab.description}</Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         <Fade in timeout={1200}>
//           <Paper elevation={0} sx={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(77,222,128,0.2)', borderRadius: 3, overflow: 'hidden' }}>
//             <Box sx={{ background: 'linear-gradient(90deg,rgba(77,222,128,0.1)0%,rgba(34,211,238,0.1)100%)', p: 2 }}>
//               <Tabs value={currentTab} onChange={(e,v)=>setCurrentTab(v)} variant="scrollable" scrollButtons="auto" sx={{
//                 '& .MuiTab-root': { color: '#94a3b8', fontWeight: 600, fontSize: '1rem', textTransform: 'none', '&.Mui-selected': { color: '#4ade80' } },
//                 '& .MuiTabs-indicator': { background: 'linear-gradient(45deg,#4ade80,#22d3ee)', height: 3, borderRadius: '1px' },
//               }}>
//                 {tabContent.map((tab, idx) => (
//                   <Tab key={idx} icon={React.cloneElement(tab.icon, { sx: { mb: 0.5 } })} label={tab.label} iconPosition="start" sx={{ minHeight: 60 }} />
//                 ))}
//               </Tabs>
//             </Box>
//             <Box sx={{ p: 3 }}>
//               {tabContent[currentTab].component}
//             </Box>
//           </Paper>
//         </Fade>
//       </Box>

//       <Fab color="error" sx={{
//         position: 'fixed', bottom: 24, right: 24,
//         background: 'linear-gradient(45deg,#ef4444,#dc2626)',
//         boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
//         '&:hover': { background: 'linear-gradient(45deg,#dc2626,#b91c1c)', transform: 'scale(1.05)' },
//         transition: 'all 0.2s ease-in-out'
//       }} onClick={() => alert(t('emergencyCallInitiated') || 'Emergency call initiated!')}>
//         <ReportProblem />
//       </Fab>
//     </Box>
//   );
// };

// export default PatientDashboard;












import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Fade,
  Paper,
  Menu,
  MenuItem,
  Fab,
} from '@mui/material';
import {
  LocalPharmacy,
  AccountCircle,
  Logout,
  Psychology,
  CloudUpload,
  Medication,
  VideoCall,
  Notifications,
  ReportProblem,
  Dashboard,
  Favorite,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import SymptomChecker from './SymptomChecker';
import UploadRecords from './UploadRecords';
import PrescriptionList from './PrescriptionList';
import VideoCallComponent from './VideoCall';
import LoadingScreen from './LoadingScreen';
import Medicine from './Medicine.js'

const PatientDashboard = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [videoCallData, setVideoCallData] = useState({ show: false, roomName: null });

  // 🔥 REPLACE WITH YOUR NGROK URL
  const BACKEND_URL = process.env.REACT_APP_SOCKET_URL;

  useEffect(() => {
    console.log('👤 PatientDashboard: Setting up Socket.IO connection');
    
    const unsubscribe = auth.onAuthStateChanged(async user => {
      console.log('👤 Patient auth state:', user ? 'User logged in' : 'No user');
      setCurrentUser(user);
      
      if (user) {
        console.log('👤 Registering patient with backend...');
        try {
          const patientData = {
            id: user.uid,
            name: user.displayName || user.email,
            email: user.email,
          };
          
          // Use ngrok URL for fetch request
          const response = await fetch(`${BACKEND_URL}/api/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
          });
          
          if (response.ok) {
            console.log('✅ Patient registered successfully');
          } else {
            console.error('❌ Failed to register patient:', response.status);
          }
        } catch (error) {
          console.error('❌ Error registering patient:', error);
        }
      }
    });

    // Socket.IO Connection with ngrok URL
    const socketClient = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
      withCredentials: true
    });
    
    socketClient.on('connect', () => {
      console.log('✅ Patient: Socket connected to backend');
      console.log('🆔 Patient Socket ID:', socketClient.id);
    });

    socketClient.on('connect_error', (error) => {
      console.error('❌ Patient: Socket connection error:', error);
    });

    socketClient.on('disconnect', (reason) => {
      console.log('🔌 Patient: Socket disconnected:', reason);
    });

    setSocket(socketClient);
    socketClient.emit('join_role_room', 'patients');
    console.log('🏥 Patient joined patients room');

    socketClient.on('incoming_call', ({ fromUser, roomName }) => {
      console.log('📞 Patient: Incoming call from doctor:', fromUser, roomName);
      setNotifications(n => n + 1);
      setVideoCallData({ show: true, roomName });
      setCurrentTab(3);
    });

    return () => {
      console.log('🧹 Patient: Cleaning up');
      unsubscribe();
      socketClient.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const initiateVideoCall = () => {
    console.log('🎥 Patient: initiateVideoCall called');
    
    if (!socket) {
      console.error('❌ Socket not available');
      return;
    }
    
    if (!currentUser) {
      console.error('❌ Current user not available');
      return;
    }
    
    const roomName = `consultation-${currentUser.uid}-${Date.now()}`;
    console.log('🏠 Patient: Generated room name:', roomName);
    
    const callData = {
      fromUser: { 
        id: currentUser.uid, 
        name: currentUser.displayName || currentUser.email,
        email: currentUser.email
      },
      toRole: 'doctor',
      roomName,
    };
    
    console.log('📡 Patient: Emitting call_initiated:', callData);
    socket.emit('call_initiated', callData);
    
    console.log('📞 Patient: Video call request sent to doctors');
    
    setVideoCallData({ show: true, roomName });
    setCurrentTab(3);
    
    console.log('✅ Patient: Video call data set and tab changed');
  };

  const handleEndVideoCall = () => {
    console.log('📴 Patient: Ending video call');
    setVideoCallData({ show: false, roomName: null });
    setCurrentTab(0);
  };

  if (loading) return <LoadingScreen />;

  if (videoCallData.show) {
    return (
      <VideoCallComponent
        role="patient"
        currentUser={currentUser}
        roomName={videoCallData.roomName}
        onCallEnd={handleEndVideoCall}
      />
    );
  }

  const tabContent = [
    {
      label: t('symptomChecker') || 'Symptom Checker',
      icon: <Psychology />,
      component: <SymptomChecker />,
      color: '#4ade80',
      description: 'AI-powered symptom analysis',
    },
    {
      label: t('healthRecords') || 'Health Records',
      icon: <CloudUpload />,
      component: <UploadRecords />,
      color: '#06b6d4',
      description: 'Upload and manage records',
    },
    {
      label: t('prescriptions') || 'Prescriptions',
      icon: <Medication />,
      component: <PrescriptionList />,
      color: '#8b5cf6',
      description: 'View your prescriptions',
    },
    {
      label: 'Medicines',
      icon: <LocalPharmacy />,
      component: <Medicine />,
      color: '#22d3ee',
      description: 'Check available medicines',
    },
    {
      label: t('videoCall') || 'Video Call',
      icon: <VideoCall />,
      component: (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: '#f1f5f9', mb: 2 }}>
            Ready for video consultation
          </Typography>
          <Button
            variant="contained"
            startIcon={<VideoCall />}
            onClick={initiateVideoCall}
            sx={{
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              '&:hover': { background: 'linear-gradient(45deg, #d97706, #b45309)' },
            }}
          >
            Start Video Consultation
          </Button>
        </Box>
      ),
      color: '#f59e0b',
      description: 'Connect with doctors',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)' }}>
      <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Dashboard sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
            <Typography
              variant="h5"
              sx={{
                background: 'linear-gradient(45deg,#4ade80,#22d3ee)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
              }}
            >
              {t('patientDashboard') || 'Patient Dashboard'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: '#f1f5f9' }}>
              <Badge badgeContent={notifications} sx={{ '& .MuiBadge-badge': { backgroundColor: '#4ade80' } }}>
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ color: '#f1f5f9', border: '1px solid rgba(77,222,128,0.3)', '&:hover': { borderColor: '#4ade80', backgroundColor: 'rgba(77,222,128,0.1)' } }}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
              sx={{ '& .MuiPaper-root': { backgroundColor: 'rgba(30,41,59,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(77,222,128,0.2)', color: '#f1f5f9' } }}>
              <MenuItem onClick={handleLogout} sx={{ color: '#f1f5f9' }}>
                <Logout sx={{ mr: 1, color: '#4ade80' }} />{t('logout') || 'Logout'}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Fade in timeout={800}>
          <Card elevation={0} sx={{ mb: 4, background: 'linear-gradient(135deg,rgba(77,222,128,0.1)0%,rgba(34,211,238,0.1)100%)', border: '1px solid rgba(77,222,128,0.2)', borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                    {t('welcomeBack') || 'Welcome Back!'}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#94a3b8', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    {t('patientWelcomeMessage') || 'Your health is our priority. How can we help you today?'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(45deg,#4ade80,#22d3ee)', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } } }}>
                    <Favorite sx={{ fontSize: 48, color: '#0f172a' }} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {tabContent.map((tab, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Fade in timeout={1000 + idx * 200}>
                <Card elevation={0} onClick={() => setCurrentTab(idx)} sx={{
                  cursor: 'pointer',
                  background: currentTab === idx ? `linear-gradient(135deg, ${tab.color}20 0%, ${tab.color}10 100%)` : 'rgba(30,41,59,0.5)',
                  border: currentTab === idx ? `2px solid ${tab.color}` : '1px solid rgba(77,222,128,0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 20px 40px -10px ${tab.color}30`, borderColor: tab.color },
                }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 2, background: `linear-gradient(45deg, ${tab.color}20, ${tab.color}40)`, mb: 2 }}>
                      {React.cloneElement(tab.icon, { sx: { fontSize: 32, color: tab.color } })}
                    </Box>
                    <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 600, mb: 1 }}>{tab.label}</Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>{tab.description}</Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Fade in timeout={1200}>
          <Paper elevation={0} sx={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(77,222,128,0.2)', borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ background: 'linear-gradient(90deg,rgba(77,222,128,0.1)0%,rgba(34,211,238,0.1)100%)', p: 2 }}>
              <Tabs value={currentTab} onChange={(e,v)=>setCurrentTab(v)} variant="scrollable" scrollButtons="auto" sx={{
                '& .MuiTab-root': { color: '#94a3b8', fontWeight: 600, fontSize: '1rem', textTransform: 'none', '&.Mui-selected': { color: '#4ade80' } },
                '& .MuiTabs-indicator': { background: 'linear-gradient(45deg,#4ade80,#22d3ee)', height: 3, borderRadius: '1px' },
              }}>
                {tabContent.map((tab, idx) => (
                  <Tab key={idx} icon={React.cloneElement(tab.icon, { sx: { mb: 0.5 } })} label={tab.label} iconPosition="start" sx={{ minHeight: 60 }} />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {tabContent[currentTab].component}
            </Box>
          </Paper>
        </Fade>
      </Box>

      <Fab color="error" sx={{
        position: 'fixed', bottom: 24, right: 24,
        background: 'linear-gradient(45deg,#ef4444,#dc2626)',
        boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
        '&:hover': { background: 'linear-gradient(45deg,#dc2626,#b91c1c)', transform: 'scale(1.05)' },
        transition: 'all 0.2s ease-in-out'
      }} onClick={() => alert(t('emergencyCallInitiated') || 'Emergency call initiated!')}>
        <ReportProblem />
      </Fab>
    </Box>
  );
};

export default PatientDashboard;




