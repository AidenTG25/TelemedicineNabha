// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Button,
// //   Grid,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemIcon,
// //   IconButton,
// //   Chip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   TextField,
// //   DialogActions,
// //   AppBar,
// //   Toolbar,
// // } from '@mui/material';
// // import {
// //   VideoCall,
// //   Person,
// //   Medication,
// //   Assignment,
// //   Add,
// //   Edit,
// //   ExitToApp,
// //   LocalHospital,
// // } from '@mui/icons-material';
// // import { useTranslation } from 'react-i18next';
// // import { signOut } from 'firebase/auth';
// // import { auth } from '../firebase/config';

// // const DoctorDashboard = () => {
// //   const { t } = useTranslation();
// //   const [patients, setPatients] = useState([]);
// //   const [prescriptionDialog, setPrescriptionDialog] = useState(false);
// //   const [selectedPatient, setSelectedPatient] = useState(null);
// //   const [prescription, setPrescription] = useState({
// //     medications: '',
// //     diagnosis: '',
// //     notes: ''
// //   });

// //   const mockPatients = [
// //     { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension', lastVisit: '2025-09-15', status: 'Active' },
// //     { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes', lastVisit: '2025-09-14', status: 'Follow-up' },
// //     { id: 3, name: 'Bob Johnson', age: 45, condition: 'Asthma', lastVisit: '2025-09-13', status: 'New Patient' },
// //     { id: 4, name: 'Alice Brown', age: 52, condition: 'Arthritis', lastVisit: '2025-09-12', status: 'Active' },
// //   ];

// //   useEffect(() => {
// //     setPatients(mockPatients);
// //   }, []);

// //   const handleCreatePrescription = (patient) => {
// //     setSelectedPatient(patient);
// //     setPrescription({ medications: '', diagnosis: '', notes: '' });
// //     setPrescriptionDialog(true);
// //   };

// //   const handleSavePrescription = () => {
// //     console.log('Saving prescription for', selectedPatient?.name, prescription);
// //     setPrescriptionDialog(false);
// //     setSelectedPatient(null);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth);
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Active': return 'success';
// //       case 'Follow-up': return 'warning';
// //       case 'New Patient': return 'info';
// //       default: return 'default';
// //     }
// //   };

// //   return (
// //     <Box sx={{ flexGrow: 1 }}>
// //       {/* Header */}
// //       <AppBar position="static" sx={{ mb: 3 }}>
// //         <Toolbar>
// //           <LocalHospital sx={{ mr: 2 }} />
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Doctor Dashboard
// //           </Typography>
// //           <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
// //             Logout
// //           </Button>
// //         </Toolbar>
// //       </AppBar>

// //       <Box sx={{ p: 3 }}>
// //         <Grid container spacing={3}>
// //           {/* Stats Cards */}
// //           <Grid item xs={12} md={3}>
// //             <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
// //               <CardContent>
// //                 <Typography variant="h4" color="white" align="center">
// //                   {patients.length}
// //                 </Typography>
// //                 <Typography variant="body1" color="white" align="center">
// //                   Total Patients
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           <Grid item xs={12} md={3}>
// //             <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)' }}>
// //               <CardContent>
// //                 <Typography variant="h4" color="white" align="center">
// //                   {patients.filter(p => p.status === 'Active').length}
// //                 </Typography>
// //                 <Typography variant="body1" color="white" align="center">
// //                   Active Patients
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           <Grid item xs={12} md={3}>
// //             <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
// //               <CardContent>
// //                 <Typography variant="h4" color="white" align="center">
// //                   {patients.filter(p => p.status === 'Follow-up').length}
// //                 </Typography>
// //                 <Typography variant="body1" color="white" align="center">
// //                   Follow-ups
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           <Grid item xs={12} md={3}>
// //             <Card sx={{ background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)' }}>
// //               <CardContent>
// //                 <Typography variant="h4" color="white" align="center">
// //                   {patients.filter(p => p.status === 'New Patient').length}
// //                 </Typography>
// //                 <Typography variant="body1" color="white" align="center">
// //                   New Patients
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Patient List */}
// //           <Grid item xs={12} md={8}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom>
// //                   Patient List
// //                 </Typography>
// //                 <List>
// //                   {patients.map((patient) => (
// //                     <ListItem key={patient.id}>
// //                       <ListItemIcon>
// //                         <Person />
// //                       </ListItemIcon>
// //                       <ListItemText
// //                         primary={`${patient.name} (${patient.age})`}
// //                         secondary={`${patient.condition} • Last visit: ${patient.lastVisit}`}
// //                       />
// //                       <Chip 
// //                         label={patient.status} 
// //                         color={getStatusColor(patient.status)}
// //                         size="small"
// //                         sx={{ mr: 1 }}
// //                       />
// //                       <IconButton
// //                         onClick={() => handleCreatePrescription(patient)}
// //                         color="primary"
// //                         size="small"
// //                       >
// //                         <Edit />
// //                       </IconButton>
// //                     </ListItem>
// //                   ))}
// //                 </List>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Quick Actions */}
// //           <Grid item xs={12} md={4}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom>
// //                   Quick Actions
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //                   <Button
// //                     variant="contained"
// //                     startIcon={<VideoCall />}
// //                     fullWidth
// //                     sx={{ py: 1.5 }}
// //                   >
// //                     Start Consultation
// //                   </Button>
// //                   <Button
// //                     variant="contained"
// //                     startIcon={<Assignment />}
// //                     fullWidth
// //                     sx={{ py: 1.5 }}
// //                   >
// //                     View Reports
// //                   </Button>
// //                   <Button
// //                     variant="contained"
// //                     startIcon={<Medication />}
// //                     fullWidth
// //                     sx={{ py: 1.5 }}
// //                   >
// //                     Manage Inventory
// //                   </Button>
// //                 </Box>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>

// //         {/* Prescription Dialog */}
// //         <Dialog
// //           open={prescriptionDialog}
// //           onClose={() => setPrescriptionDialog(false)}
// //           maxWidth="md"
// //           fullWidth
// //         >
// //           <DialogTitle>
// //             Create Prescription for {selectedPatient?.name}
// //           </DialogTitle>
// //           <DialogContent>
// //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
// //               <TextField
// //                 label="Diagnosis"
// //                 multiline
// //                 rows={2}
// //                 fullWidth
// //                 value={prescription.diagnosis}
// //                 onChange={(e) => setPrescription(prev => ({...prev, diagnosis: e.target.value}))}
// //               />
// //               <TextField
// //                 label="Medications"
// //                 multiline
// //                 rows={3}
// //                 fullWidth
// //                 value={prescription.medications}
// //                 onChange={(e) => setPrescription(prev => ({...prev, medications: e.target.value}))}
// //                 placeholder="Enter medications with dosage..."
// //               />
// //               <TextField
// //                 label="Notes"
// //                 multiline
// //                 rows={2}
// //                 fullWidth
// //                 value={prescription.notes}
// //                 onChange={(e) => setPrescription(prev => ({...prev, notes: e.target.value}))}
// //               />
// //             </Box>
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setPrescriptionDialog(false)}>Cancel</Button>
// //             <Button onClick={handleSavePrescription} variant="contained">
// //               Create Prescription
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default DoctorDashboard;



// import { auth } from '../firebase/config';
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Delete,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   AppBar,
//   Toolbar,
//   Fade,
//   Paper,
//   Divider,
//   Stack,
// } from '@mui/material';
// import {
//   VideoCall,
//   Person,
//   Medication,
//   Assignment,
//   Add,
//   Edit,
//   ExitToApp,
//   LocalHospital,
//   Groups,
//   Schedule,
//   TrendingUp,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';

// const DoctorDashboard = () => {
//   const { t } = useTranslation();
//   const [patients, setPatients] = useState([]);
//   const [prescriptionDialog, setPrescriptionDialog] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [prescription, setPrescription] = useState({
//     medications: '',
//     diagnosis: '',
//     notes: ''
//   });
//   const API_BASE = 'http://localhost:5000/api';


//   const mockPatients = [
//     { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension', lastVisit: '2025-09-15', status: 'Active', priority: 'high' },
//     { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes', lastVisit: '2025-09-14', status: 'Follow-up', priority: 'medium' },
//     { id: 3, name: 'Bob Johnson', age: 45, condition: 'Asthma', lastVisit: '2025-09-13', status: 'New Patient', priority: 'high' },
//     { id: 4, name: 'Alice Brown', age: 52, condition: 'Arthritis', lastVisit: '2025-09-12', status: 'Active', priority: 'low' },
//   ];

//   useEffect(() => {
//     setPatients(mockPatients);
//   }, []);

//   const handleCreatePrescription = (patient) => {
//     setSelectedPatient(patient);
//     setPrescription({ 
//       diagnosis: '', 
//       notes: '', 
//       medications: [{ name: '', dosage: '', frequency: '', duration: '' }] 
//     });
//     setPrescriptionDialog(true);
//   };


//   const handleSavePrescription = async () => {
//   if (!prescription.diagnosis || !prescription.medications) {
//     alert('Please fill in diagnosis and medications');
//     return;
//   }

//   setLoading(true);
//   try {
//     // Get auth token from Firebase
//     const token = localStorage.getItem('authToken') || 'mock-token';
    
//     // Parse medications from text format to array
//     // Validate medications
//   const validMedications = prescription.medications.filter(med => 
//     med.name.trim() && med.dosage.trim() && med.frequency.trim()
//   );

//   if (validMedications.length === 0) {
//     alert('Please add at least one medication with name, dosage, and frequency');
//     return;
//   }


//     const prescriptionData = {
//       patientId: selectedPatient.id.toString(),
//       patientName: selectedPatient.name,
//       doctorName: 'Dr. Current User',
//       diagnosis: prescription.diagnosis,
//       medications: validMedications, // Direct use of structured data
//       notes: prescription.notes,
//       status: 'active'
//     };

//     console.log('📝 Saving prescription to MongoDB:', prescriptionData);

//     const response = await fetch(`${API_BASE}/prescriptions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(prescriptionData)
//     });

//     if (!response.ok) {
//       throw new Error('Failed to save prescription');
//     }

//     const savedPrescription = await response.json();
//     console.log('✅ Prescription saved to MongoDB:', savedPrescription._id);
    
//     setPrescriptionDialog(false);
//     setSelectedPatient(null);
//     setPrescription({ 
//       diagnosis: '', 
//       notes: '', 
//       medications: [{ name: '', dosage: '', frequency: '', duration: '' }] 
//     });


//   } catch (error) {
//     console.error('❌ Error saving prescription:', error);
//     alert('Failed to save prescription to MongoDB');
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return '#4ade80';
//       case 'Follow-up': return '#f59e0b';
//       case 'New Patient': return '#06b6d4';
//       default: return '#94a3b8';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#4ade80';
//       default: return '#94a3b8';
//     }
//   };

//   const stats = [
//     { label: 'Total Patients', value: patients.length, color: '#4ade80', icon: <Groups /> },
//     { label: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: '#06b6d4', icon: <Person /> },
//     { label: 'Follow-ups', value: patients.filter(p => p.status === 'Follow-up').length, color: '#f59e0b', icon: <Schedule /> },
//     { label: 'New Patients', value: patients.filter(p => p.status === 'New Patient').length, color: '#8b5cf6', icon: <TrendingUp /> },
//   ];

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
//             <LocalHospital sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
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
//               Doctor Dashboard
//             </Typography>
//           </Box>

//           <IconButton
//             onClick={handleLogout}
//             sx={{ 
//               color: '#f1f5f9',
//               border: '1px solid rgba(77, 222, 128, 0.3)',
//               '&:hover': {
//                 borderColor: '#4ade80',
//                 backgroundColor: 'rgba(77, 222, 128, 0.1)',
//               },
//             }}
//           >
//             <ExitToApp />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Fade in={true} timeout={800 + index * 200}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
//                     border: `1px solid ${stat.color}40`,
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: `0 20px 40px -10px ${stat.color}30`,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography
//                           variant="h3"
//                           sx={{
//                             color: stat.color,
//                             fontWeight: 800,
//                             fontSize: '2.5rem',
//                           }}
//                         >
//                           {stat.value}
//                         </Typography>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{
//                             color: '#94a3b8',
//                             fontWeight: 500,
//                           }}
//                         >
//                           {stat.label}
//                         </Typography>
//                       </Box>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           width: 60,
//                           height: 60,
//                           borderRadius: 2,
//                           background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)`,
//                         }}
//                       >
//                         {React.cloneElement(stat.icon, { 
//                           sx: { fontSize: 32, color: stat.color } 
//                         })}
//                       </Box>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={8}>
//             <Fade in={true} timeout={1000}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   background: 'rgba(30, 41, 59, 0.5)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   borderRadius: 3,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                     p: 3,
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Groups sx={{ mr: 2, color: '#4ade80' }} />
//                     Patient List
//                   </Typography>
//                 </Box>

//                 <List sx={{ p: 0 }}>
//                   {patients.map((patient, index) => (
//                     <Box key={patient.id}>
//                       <ListItem
//                         sx={{
//                           py: 2,
//                           px: 3,
//                           '&:hover': {
//                             backgroundColor: 'rgba(77, 222, 128, 0.05)',
//                           },
//                         }}
//                       >
//                         <ListItemIcon>
//                           <Box
//                             sx={{
//                               width: 50,
//                               height: 50,
//                               borderRadius: '50%',
//                               background: `linear-gradient(45deg, ${getPriorityColor(patient.priority)}30, ${getPriorityColor(patient.priority)}60)`,
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <Person sx={{ color: getPriorityColor(patient.priority) }} />
//                           </Box>
//                         </ListItemIcon>
                        
//                         <ListItemText
//                           primary={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                               <Typography
//                                 variant="h6"
//                                 sx={{ color: '#f1f5f9', fontWeight: 600 }}
//                               >
//                                 {patient.name}
//                               </Typography>
//                               <Chip
//                                 label={patient.status}
//                                 size="small"
//                                 sx={{
//                                   backgroundColor: `${getStatusColor(patient.status)}20`,
//                                   color: getStatusColor(patient.status),
//                                   border: `1px solid ${getStatusColor(patient.status)}`,
//                                   fontWeight: 600,
//                                 }}
//                               />
//                               <Chip
//                                 label={patient.priority.toUpperCase()}
//                                 size="small"
//                                 sx={{
//                                   backgroundColor: `${getPriorityColor(patient.priority)}20`,
//                                   color: getPriorityColor(patient.priority),
//                                   border: `1px solid ${getPriorityColor(patient.priority)}`,
//                                   fontWeight: 600,
//                                 }}
//                               />
//                             </Box>
//                           }
//                           secondary={
//                             <Stack spacing={0.5}>
//                               <Typography variant="body2" sx={{ color: '#94a3b8' }}>
//                                 <strong>Age:</strong> {patient.age} • <strong>Condition:</strong> {patient.condition}
//                               </Typography>
//                               <Typography variant="body2" sx={{ color: '#94a3b8' }}>
//                                 <strong>Last Visit:</strong> {patient.lastVisit}
//                               </Typography>
//                             </Stack>
//                           }
//                         />

//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button
//                             onClick={() => handleCreatePrescription(patient)}
//                             variant="contained"
//                             size="small"
//                             sx={{
//                               background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                               color: '#0f172a',
//                               fontWeight: 600,
//                               '&:hover': {
//                                 background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
//                               },
//                             }}
//                           >
//                             <Medication sx={{ mr: 1, fontSize: 18 }} />
//                             Prescribe
//                           </Button>
                          
//                           <IconButton
//                             sx={{
//                               color: '#06b6d4',
//                               border: '1px solid rgba(6, 182, 212, 0.3)',
//                               '&:hover': {
//                                 backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                                 borderColor: '#06b6d4',
//                               },
//                             }}
//                           >
//                             <VideoCall />
//                           </IconButton>
//                         </Box>
//                       </ListItem>
//                       {index < patients.length - 1 && (
//                         <Divider sx={{ borderColor: 'rgba(77, 222, 128, 0.1)' }} />
//                       )}
//                     </Box>
//                   ))}
//                 </List>
//               </Paper>
//             </Fade>
//           </Grid>

//           <Grid item xs={12} lg={4}>
//             <Fade in={true} timeout={1200}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   background: 'rgba(30, 41, 59, 0.5)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   borderRadius: 3,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                     p: 3,
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Assignment sx={{ mr: 2, color: '#4ade80' }} />
//                     Quick Actions
//                   </Typography>
//                 </Box>

//                 <CardContent sx={{ p: 3 }}>
//                   <Stack spacing={2}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<VideoCall />}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(77, 222, 128, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#4ade80',
//                           backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                         },
//                       }}
//                     >
//                       Start Consultation
//                     </Button>
                    
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<Assignment />}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(6, 182, 212, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#06b6d4',
//                           backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                         },
//                       }}
//                     >
//                       View Reports
//                     </Button>
                    
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<Medication />}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(139, 92, 246, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#8b5cf6',
//                           backgroundColor: 'rgba(139, 92, 246, 0.1)',
//                         },
//                       }}
//                     >
//                       Manage Inventory
//                     </Button>
//                   </Stack>
//                 </CardContent>
//               </Paper>
//             </Fade>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog
//         open={prescriptionDialog}
//         onClose={() => setPrescriptionDialog(false)}
//         maxWidth="md"
//         fullWidth
//         sx={{
//           '& .MuiDialog-paper': {
//             backgroundColor: 'rgba(30, 41, 59, 0.95)',
//             backdropFilter: 'blur(20px)',
//             border: '1px solid rgba(77, 222, 128, 0.2)',
//             borderRadius: 3,
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: '#f1f5f9', fontWeight: 700 }}>
//           Create Prescription for {selectedPatient?.name}
//         </DialogTitle>
//         <DialogContent>
//           <Stack spacing={3} sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               label="Diagnosis"
//               multiline
//               rows={2}
//               value={prescription.diagnosis}
//               onChange={(e) => setPrescription(prev => ({...prev, diagnosis: e.target.value}))}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
            
//             <TextField
//               fullWidth
//               label="Medications"
//               multiline
//               rows={3}
//               value={prescription.medications}
//               onChange={(e) => setPrescription(prev => ({...prev, medications: e.target.value}))}
//               placeholder="Enter medications with dosage..."
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
            
//             <TextField
//               fullWidth
//               label="Notes"
//               multiline
//               rows={2}
//               value={prescription.notes}
//               onChange={(e) => setPrescription(prev => ({...prev, notes: e.target.value}))}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button 
//             onClick={() => setPrescriptionDialog(false)}
//             sx={{ color: '#94a3b8' }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSavePrescription}
//             variant="contained"
//             sx={{
//               background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//               color: '#0f172a',
//               fontWeight: 600,
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
//               },
//             }}
//           >
//             Create Prescription
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };






// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Divider,
//   Alert,
//   Stack,
//   AppBar,
//   Toolbar,
//   Fade,
//   Paper,
// } from '@mui/material';
// import {
//   VideoCall,
//   Person,
//   Medication,
//   Assignment,
//   ExitToApp,
//   LocalHospital,
//   Groups,
//   Schedule,
//   TrendingUp,
//   Call,
//   Close,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import VideoCallComponent from './VideoCall';

// const DoctorDashboard = () => {
//   const { t } = useTranslation();
//   const [patients, setPatients] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [callAlert, setCallAlert] = useState(null);
//   const [showVideoCall, setShowVideoCall] = useState(false);
//   const [videoCallPatient, setVideoCallPatient] = useState(null);

//   const mockPatients = [
//     { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension', lastVisit: '2025-09-15', status: 'Active', priority: 'high' },
//     { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes', lastVisit: '2025-09-14', status: 'Follow-up', priority: 'medium' },
//     { id: 3, name: 'Bob Johnson', age: 45, condition: 'Asthma', lastVisit: '2025-09-13', status: 'New Patient', priority: 'high' },
//     { id: 4, name: 'Alice Brown', age: 52, condition: 'Arthritis', lastVisit: '2025-09-12', status: 'Active', priority: 'low' },
//   ];

//   useEffect(() => {
//     // Initialize patient list with mock data (replace with API in prod)
//     setPatients(mockPatients);

//     // Firebase auth listener for current user
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });

//     // Setup Socket.IO connection and listeners
//     const socketClient = io('http://localhost:5000'); // Backend socket server URL
//     setSocket(socketClient);

//     socketClient.emit('join_role_room', 'doctors');

//     socketClient.on('new_patient', (newPatient) => {
//       setPatients(prev => {
//         if (prev.find(p => p.id === newPatient.id)) return prev;
//         return [...prev, newPatient];
//       });
//     });

//     socketClient.on('incoming_call', ({ fromUser }) => {
//       setCallAlert(fromUser);
//     });

//     return () => {
//       unsubscribe();
//       socketClient.disconnect();
//     };
//   }, []);

//   const handleStartVideoCall = (patient = null) => {
//     setVideoCallPatient(patient);
//     setShowVideoCall(true);
//     setCallAlert(null);
//   };

//  const handleAnswerCall = () => {
//   setShowVideoCall(true);
//   setVideoCallPatient(callAlert); // Set the calling patient
//   setCallAlert(null);
// };

//   const handleRejectCall = () => {
//     setCallAlert(null);
//   };

//   const handleEndVideoCall = () => {
//     setShowVideoCall(false);
//     setVideoCallPatient(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return '#4ade80';
//       case 'Follow-up': return '#f59e0b';
//       case 'New Patient': return '#06b6d4';
//       default: return '#94a3b8';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#4ade80';
//       default: return '#94a3b8';
//     }
//   };

//   const stats = [
//     { label: 'Total Patients', value: patients.length, color: '#4ade80', icon: <Groups /> },
//     { label: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: '#06b6d4', icon: <Person /> },
//     { label: 'Follow-ups', value: patients.filter(p => p.status === 'Follow-up').length, color: '#f59e0b', icon: <Schedule /> },
//     { label: 'New Patients', value: patients.filter(p => p.status === 'New Patient').length, color: '#8b5cf6', icon: <TrendingUp /> },
//   ];

//   if (showVideoCall) {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Button variant="outlined" onClick={handleEndVideoCall} sx={{ mb: 2 }}>
//         ← Back to Dashboard
//       </Button>
//       {videoCallPatient && (
//         <Typography variant="h6" sx={{ mb: 2, color: '#f1f5f9' }}>
//           Video Consultation with {videoCallPatient.name}
//         </Typography>
//       )}
//       <VideoCallComponent 
//         role="doctor" 
//         currentUser={currentUser}
//         callingPatient={videoCallPatient}
//       />
//     </Box>
//   );
// }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' }}>
//       <AppBar position="sticky" sx={{ bgcolor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <LocalHospital sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
//             <Typography variant="h5" sx={{ background: 'linear-gradient(45deg, #4ade80, #22d3ee)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 700 }}>
//               Doctor Dashboard
//             </Typography>
//           </Box>
//           <IconButton onClick={handleLogout} sx={{ color: '#f1f5f9', border: '1px solid rgba(77, 222, 128, 0.3)', '&:hover': { borderColor: '#4ade80', bgcolor: 'rgba(77, 222, 128, 0.1)' } }}>
//             <ExitToApp />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {stats.map((stat, idx) => (
//             <Grid item xs={12} sm={6} md={3} key={idx}>
//               <Fade in={true} timeout={800 + idx * 200}>
//                 <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`, border: `1px solid ${stat.color}40`, borderRadius: 3, transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 20px 40px -10px ${stat.color}30` } }}>
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="h3" sx={{ color: stat.color, fontWeight: 800, fontSize: '2.5rem' }}>{stat.value}</Typography>
//                         <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 500 }}>{stat.label}</Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 2, background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)` }}>
//                         {React.cloneElement(stat.icon, { sx: { fontSize: 32, color: stat.color } })}
//                       </Box>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         {callAlert && (
//           <Alert severity="info" sx={{ mb: 2 }}>
//             {callAlert.name} is calling you for a video consultation.
//             <Button size="small" variant="contained" onClick={handleAnswerCall} sx={{ ml: 2 }}>Answer</Button>
//             <Button size="small" variant="outlined" onClick={handleRejectCall} sx={{ ml: 1 }}>Reject</Button>
//           </Alert>
//         )}

//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={12}>
//             <Paper elevation={0} sx={{ bgcolor: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(20px)', borderRadius: 3, border: '1px solid rgba(77,222,128,0.2)', p: 3 }}>
//               <Typography variant="h5" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
//                 <Groups sx={{ mr: 1, color: '#4ade80' }} /> Patient List
//               </Typography>

//               <List sx={{ p: 0 }}>
//                 {patients.map((patient, idx) => (
//                   <Box key={patient.id}>
//                     <ListItem sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'rgba(77,222,128,0.05)' } }}>
//                       <ListItemIcon>
//                         <Person sx={{ color: getPriorityColor(patient.priority) }} />
//                       </ListItemIcon>

//                       <ListItemText
//                         primary={<Stack direction="row" spacing={2} alignItems="center">
//                           <Typography variant="h6" sx={{ color: '#f1f5f9' }}>
//                             {patient.name}
//                           </Typography>
//                           <Chip label={patient.status} size="small" sx={{ backgroundColor: `${getStatusColor(patient.status)}20`, color: getStatusColor(patient.status), border: `1px solid ${getStatusColor(patient.status)}` }} />
//                           <Chip label={patient.priority?.toUpperCase()} size="small" sx={{ backgroundColor: `${getPriorityColor(patient.priority)}20`, color: getPriorityColor(patient.priority), border: `1px solid ${getPriorityColor(patient.priority)}` }} />
//                         </Stack>}
//                         secondary={<>
//                           <Typography variant="body2" color="#94a3b8"><strong>Age:</strong> {patient.age} • <strong>Condition:</strong> {patient.condition}</Typography>
//                           <Typography variant="body2" color="#94a3b8"><strong>Last Visit:</strong> {patient.lastVisit}</Typography>
//                         </>}
//                       />

//                       <IconButton
//                         onClick={() => handleStartVideoCall(patient)}
//                         sx={{
//                           color: '#06b6d4',
//                           border: '1px solid rgba(6,182,212,0.3)',
//                           '&:hover': { bgcolor: 'rgba(6,182,212,0.1)', borderColor: '#06b6d4'}
//                         }}
//                       >
//                         <VideoCall />
//                       </IconButton>
//                     </ListItem>
//                     {idx < patients.length - 1 && <Divider sx={{ borderColor: 'rgba(77,222,128,0.1)' }} />}
//                   </Box>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default DoctorDashboard;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Divider,
//   Alert,
//   Stack,
//   AppBar,
//   Toolbar,
//   Fade,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from '@mui/material';
// import {
//   VideoCall,
//   Person,
//   Medication,
//   Assignment,
//   ExitToApp,
//   LocalHospital,
//   Groups,
//   Schedule,
//   TrendingUp,
//   Call,
//   Close,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import VideoCallComponent from './VideoCall';

// const DoctorDashboard = () => {
//   const { t } = useTranslation();
//   const [patients, setPatients] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [callAlert, setCallAlert] = useState(null);
//   const [showVideoCall, setShowVideoCall] = useState(false);
//   const [videoCallPatient, setVideoCallPatient] = useState(null);
//   const [prescriptionDialog, setPrescriptionDialog] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [prescription, setPrescription] = useState({
//     diagnosis: '',
//     medicationName: '',
//     dosage: '',
//     frequency: '',
//     duration: '',
//     notes: ''
//   });

//   const API_BASE = 'http://localhost:5000/api';

//   const mockPatients = [
//     { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension', lastVisit: '2025-09-15', status: 'Active', priority: 'high' },
//     { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes', lastVisit: '2025-09-14', status: 'Follow-up', priority: 'medium' },
//     { id: 3, name: 'Bob Johnson', age: 45, condition: 'Asthma', lastVisit: '2025-09-13', status: 'New Patient', priority: 'high' },
//     { id: 4, name: 'Alice Brown', age: 52, condition: 'Arthritis', lastVisit: '2025-09-12', status: 'Active', priority: 'low' },
//   ];

//   useEffect(() => {
//     // Initialize patient list with mock data
//     setPatients(mockPatients);
    
//     // Firebase auth listener for current user
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });

//     // Setup Socket.IO connection and listeners
//     const socketClient = io('http://localhost:5000');
//     setSocket(socketClient);
//     socketClient.emit('join_role_room', 'doctors');

//     socketClient.on('new_patient', (newPatient) => {
//       setPatients(prev => {
//         if (prev.find(p => p.id === newPatient.id)) return prev;
//         return [...prev, newPatient];
//       });
//     });

//     socketClient.on('incoming_call', ({ fromUser }) => {
//       setCallAlert(fromUser);
//     });

//     return () => {
//       unsubscribe();
//       socketClient.disconnect();
//     };
//   }, []);

//   const handleStartVideoCall = (patient = null) => {
//     setVideoCallPatient(patient);
//     setShowVideoCall(true);
//     setCallAlert(null);
//   };

//   const handleAnswerCall = () => {
//     setShowVideoCall(true);
//     setVideoCallPatient(callAlert);
//     setCallAlert(null);
//   };

//   const handleRejectCall = () => {
//     setCallAlert(null);
//   };

//   const handleEndVideoCall = () => {
//     setShowVideoCall(false);
//     setVideoCallPatient(null);
//   };

//   const handleCreatePrescription = (patient) => {
//     setSelectedPatient(patient);
//     setPrescription({ 
//       diagnosis: '', 
//       medicationName: '',
//       dosage: '',
//       frequency: '',
//       duration: '',
//       notes: ''
//     });
//     setPrescriptionDialog(true);
//   };

//   const handleSavePrescription = async () => {
//     if (!prescription.diagnosis || !prescription.medicationName.trim()) {
//       alert('Please fill in diagnosis and medications');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('authToken') || 'mock-token';
//       const medications = [{
//         name: prescription.medicationName.trim(),
//         dosage: prescription.dosage.trim(),
//         frequency: prescription.frequency.trim(),
//         duration: prescription.duration.trim() || 'As needed'
//       }];

//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         alert('User not authenticated');
//         return;
//       }

//       const prescriptionData = {
//         patientId: selectedPatient.id,
//         patientName: selectedPatient.name,
//         doctorName: currentUser.displayName || 'Dr. Current User',
//         diagnosis: prescription.diagnosis,
//         medications: medications,
//         notes: prescription.notes,
//         status: 'active'
//       };

//       console.log('📝 Saving prescription to MongoDB:', prescriptionData);
      
//       const response = await fetch(`${API_BASE}/prescriptions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(prescriptionData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save prescription');
//       }

//       const savedPrescription = await response.json();
//       console.log('✅ Prescription saved to MongoDB:', savedPrescription._id);
      
//       setPrescriptionDialog(false);
//       setSelectedPatient(null);
//       setPrescription({ 
//         diagnosis: '', 
//         medicationName: '',
//         dosage: '',
//         frequency: '',
//         duration: '',
//         notes: '' 
//       });
//     } catch (error) {
//       console.error('❌ Error saving prescription:', error);
//       alert('Failed to save prescription to MongoDB');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return '#4ade80';
//       case 'Follow-up': return '#f59e0b';
//       case 'New Patient': return '#06b6d4';
//       default: return '#94a3b8';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#4ade80';
//       default: return '#94a3b8';
//     }
//   };

//   const stats = [
//     { label: 'Total Patients', value: patients.length, color: '#4ade80', icon: <Groups /> },
//     { label: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: '#06b6d4', icon: <Person /> },
//     { label: 'Follow-ups', value: patients.filter(p => p.status === 'Follow-up').length, color: '#f59e0b', icon: <Schedule /> },
//     { label: 'New Patients', value: patients.filter(p => p.status === 'New Patient').length, color: '#8b5cf6', icon: <TrendingUp /> },
//   ];

//   // Video Call View
//   if (showVideoCall) {
//     return (
//       <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#0f172a' }}>
//         <Button 
//           variant="outlined" 
//           onClick={handleEndVideoCall} 
//           sx={{ 
//             mb: 2,
//             borderColor: 'rgba(77, 222, 128, 0.3)',
//             color: '#f1f5f9',
//             '&:hover': {
//               borderColor: '#4ade80',
//               backgroundColor: 'rgba(77, 222, 128, 0.1)',
//             },
//           }}
//         >
//           ← Back to Dashboard
//         </Button>
//         {videoCallPatient && (
//           <Typography variant="h6" sx={{ mb: 2, color: '#f1f5f9' }}>
//             Video Consultation with {videoCallPatient.name}
//           </Typography>
//         )}
//         <VideoCallComponent 
//           role="doctor" 
//           currentUser={currentUser}
//           callingPatient={videoCallPatient}
//         />
//       </Box>
//     );
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
//             <LocalHospital sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
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
//               Doctor Dashboard
//             </Typography>
//           </Box>
//           <IconButton
//             onClick={handleLogout}
//             sx={{ 
//               color: '#f1f5f9',
//               border: '1px solid rgba(77, 222, 128, 0.3)',
//               '&:hover': {
//                 borderColor: '#4ade80',
//                 backgroundColor: 'rgba(77, 222, 128, 0.1)',
//               },
//             }}
//           >
//             <ExitToApp />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         {/* Incoming Call Alert */}
//         {callAlert && (
//           <Fade in={true}>
//             <Alert 
//               severity="info" 
//               sx={{ 
//                 mb: 3,
//                 backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                 color: '#06b6d4',
//                 border: '1px solid rgba(6, 182, 212, 0.3)',
//                 '& .MuiAlert-icon': { color: '#06b6d4' }
//               }}
//             >
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Typography variant="body1">
//                   <strong>{callAlert.name}</strong> is calling you for a video consultation.
//                 </Typography>
//                 <Box>
//                   <Button 
//                     size="small" 
//                     variant="contained" 
//                     onClick={handleAnswerCall} 
//                     startIcon={<Call />}
//                     sx={{
//                       mr: 1,
//                       background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                       color: '#0f172a',
//                       fontWeight: 600,
//                     }}
//                   >
//                     Answer
//                   </Button>
//                   <Button 
//                     size="small" 
//                     variant="outlined" 
//                     onClick={handleRejectCall}
//                     startIcon={<Close />}
//                     sx={{
//                       borderColor: 'rgba(239, 68, 68, 0.3)',
//                       color: '#ef4444',
//                       '&:hover': {
//                         borderColor: '#ef4444',
//                         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//                       },
//                     }}
//                   >
//                     Reject
//                   </Button>
//                 </Box>
//               </Stack>
//             </Alert>
//           </Fade>
//         )}

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Fade in={true} timeout={800 + index * 200}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
//                     border: `1px solid ${stat.color}40`,
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: `0 20px 40px -10px ${stat.color}30`,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography
//                           variant="h3"
//                           sx={{
//                             color: stat.color,
//                             fontWeight: 800,
//                             fontSize: '2.5rem',
//                           }}
//                         >
//                           {stat.value}
//                         </Typography>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{
//                             color: '#94a3b8',
//                             fontWeight: 500,
//                           }}
//                         >
//                           {stat.label}
//                         </Typography>
//                       </Box>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           width: 60,
//                           height: 60,
//                           borderRadius: 2,
//                           background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)`,
//                         }}
//                       >
//                         {React.cloneElement(stat.icon, { 
//                           sx: { fontSize: 32, color: stat.color } 
//                         })}
//                       </Box>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Main Content */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={8}>
//             <Fade in={true} timeout={1000}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   background: 'rgba(30, 41, 59, 0.5)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   borderRadius: 3,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                     p: 3,
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Groups sx={{ mr: 2, color: '#4ade80' }} />
//                     Patient List
//                   </Typography>
//                 </Box>
//                 <List sx={{ p: 0 }}>
//                   {patients.map((patient, index) => (
//                     <Box key={patient.id}>
//                       <ListItem
//                         sx={{
//                           py: 2,
//                           px: 3,
//                           '&:hover': {
//                             backgroundColor: 'rgba(77, 222, 128, 0.05)',
//                           },
//                         }}
//                       >
//                         <ListItemIcon>
//                           <Box
//                             sx={{
//                               width: 50,
//                               height: 50,
//                               borderRadius: '50%',
//                               background: `linear-gradient(45deg, ${getPriorityColor(patient.priority)}30, ${getPriorityColor(patient.priority)}60)`,
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <Person sx={{ color: getPriorityColor(patient.priority) }} />
//                           </Box>
//                         </ListItemIcon>
                        
//                         <ListItemText
//                           primary={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                               <Typography
//                                 variant="h6"
//                                 sx={{ color: '#f1f5f9', fontWeight: 600 }}
//                               >
//                                 {patient.name}
//                               </Typography>
//                               <Chip
//                                 label={patient.status}
//                                 size="small"
//                                 sx={{
//                                   backgroundColor: `${getStatusColor(patient.status)}20`,
//                                   color: getStatusColor(patient.status),
//                                   border: `1px solid ${getStatusColor(patient.status)}`,
//                                   fontWeight: 600,
//                                 }}
//                               />
//                               <Chip
//                                 label={patient.priority.toUpperCase()}
//                                 size="small"
//                                 sx={{
//                                   backgroundColor: `${getPriorityColor(patient.priority)}20`,
//                                   color: getPriorityColor(patient.priority),
//                                   border: `1px solid ${getPriorityColor(patient.priority)}`,
//                                   fontWeight: 600,
//                                 }}
//                               />
//                             </Box>
//                           }
//                           secondary={
//                             <Stack spacing={0.5}>
//                               <Typography variant="body2" sx={{ color: '#94a3b8' }}>
//                                 <strong>Age:</strong> {patient.age} • <strong>Condition:</strong> {patient.condition}
//                               </Typography>
//                               <Typography variant="body2" sx={{ color: '#94a3b8' }}>
//                                 <strong>Last Visit:</strong> {patient.lastVisit}
//                               </Typography>
//                             </Stack>
//                           }
//                         />
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button
//                             onClick={() => handleCreatePrescription(patient)}
//                             variant="contained"
//                             size="small"
//                             sx={{
//                               background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//                               color: '#0f172a',
//                               fontWeight: 600,
//                               '&:hover': {
//                                 background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
//                               },
//                             }}
//                           >
//                             <Medication sx={{ mr: 1, fontSize: 18 }} />
//                             Prescribe
//                           </Button>
                          
//                           <IconButton
//                             onClick={() => handleStartVideoCall(patient)}
//                             sx={{
//                               color: '#06b6d4',
//                               border: '1px solid rgba(6, 182, 212, 0.3)',
//                               '&:hover': {
//                                 backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                                 borderColor: '#06b6d4',
//                               },
//                             }}
//                           >
//                             <VideoCall />
//                           </IconButton>
//                         </Box>
//                       </ListItem>
//                       {index < patients.length - 1 && (
//                         <Divider sx={{ borderColor: 'rgba(77, 222, 128, 0.1)' }} />
//                       )}
//                     </Box>
//                   ))}
//                 </List>
//               </Paper>
//             </Fade>
//           </Grid>

//           {/* Quick Actions Sidebar */}
//           <Grid item xs={12} lg={4}>
//             <Fade in={true} timeout={1200}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   background: 'rgba(30, 41, 59, 0.5)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(77, 222, 128, 0.2)',
//                   borderRadius: 3,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
//                     p: 3,
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       color: '#f1f5f9',
//                       fontWeight: 700,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Assignment sx={{ mr: 2, color: '#4ade80' }} />
//                     Quick Actions
//                   </Typography>
//                 </Box>
//                 <CardContent sx={{ p: 3 }}>
//                   <Stack spacing={2}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<VideoCall />}
//                       onClick={() => handleStartVideoCall()}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(77, 222, 128, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#4ade80',
//                           backgroundColor: 'rgba(77, 222, 128, 0.1)',
//                         },
//                       }}
//                     >
//                       Start Consultation
//                     </Button>
                    
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<Assignment />}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(6, 182, 212, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#06b6d4',
//                           backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                         },
//                       }}
//                     >
//                       View Reports
//                     </Button>
                    
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<Medication />}
//                       sx={{
//                         py: 2,
//                         borderColor: 'rgba(139, 92, 246, 0.3)',
//                         color: '#f1f5f9',
//                         '&:hover': {
//                           borderColor: '#8b5cf6',
//                           backgroundColor: 'rgba(139, 92, 246, 0.1)',
//                         },
//                       }}
//                     >
//                       Manage Inventory
//                     </Button>
//                   </Stack>
//                 </CardContent>
//               </Paper>
//             </Fade>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Prescription Dialog */}
//       <Dialog
//         open={prescriptionDialog}
//         onClose={() => setPrescriptionDialog(false)}
//         maxWidth="md"
//         fullWidth
//         sx={{
//           '& .MuiDialog-paper': {
//             backgroundColor: 'rgba(30, 41, 59, 0.95)',
//             backdropFilter: 'blur(20px)',
//             border: '1px solid rgba(77, 222, 128, 0.2)',
//             borderRadius: 3,
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: '#f1f5f9', fontWeight: 700 }}>
//           Create Prescription for {selectedPatient?.name}
//         </DialogTitle>
//         <DialogContent>
//           <Stack spacing={3} sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               label="Diagnosis *"
//               multiline
//               rows={2}
//               required
//               value={prescription.diagnosis}
//               onChange={(e) => setPrescription(prev => ({...prev, diagnosis: e.target.value}))}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
            
//             <TextField
//               fullWidth
//               label="Medication Name *"
//               required
//               value={prescription.medicationName}
//               onChange={(e) => setPrescription(prev => ({...prev, medicationName: e.target.value}))}
//               placeholder="e.g., Amoxicillin, Lisinopril, Metformin..."
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
            
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Dosage *"
//                   required
//                   value={prescription.dosage}
//                   onChange={(e) => setPrescription(prev => ({...prev, dosage: e.target.value}))}
//                   placeholder="e.g., 500mg, 10ml, 1 tablet..."
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                       color: '#f1f5f9',
//                       '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                       '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                       '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                     },
//                     '& .MuiInputLabel-root': { 
//                       color: '#94a3b8',
//                       '&.Mui-focused': { color: '#4ade80' },
//                     },
//                   }}
//                 />
//               </Grid>
              
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Frequency *"
//                   required
//                   value={prescription.frequency}
//                   onChange={(e) => setPrescription(prev => ({...prev, frequency: e.target.value}))}
//                   placeholder="e.g., Twice daily, Every 8 hours..."
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                       color: '#f1f5f9',
//                       '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                       '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                       '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                     },
//                     '& .MuiInputLabel-root': { 
//                       color: '#94a3b8',
//                       '&.Mui-focused': { color: '#4ade80' },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
            
//             <TextField
//               fullWidth
//               label="Duration (Optional)"
//               value={prescription.duration}
//               onChange={(e) => setPrescription(prev => ({...prev, duration: e.target.value}))}
//               placeholder="e.g., 7 days, 2 weeks, Until symptoms improve..."
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
            
//             <TextField
//               fullWidth
//               label="Notes"
//               multiline
//               rows={2}
//               value={prescription.notes}
//               onChange={(e) => setPrescription(prev => ({...prev, notes: e.target.value}))}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'rgba(15, 23, 42, 0.5)',
//                   color: '#f1f5f9',
//                   '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
//                   '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
//                   '&.Mui-focused fieldset': { borderColor: '#4ade80' },
//                 },
//                 '& .MuiInputLabel-root': { 
//                   color: '#94a3b8',
//                   '&.Mui-focused': { color: '#4ade80' },
//                 },
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button 
//             onClick={() => setPrescriptionDialog(false)}
//             sx={{ color: '#94a3b8' }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSavePrescription}
//             variant="contained"
//             disabled={loading}
//             sx={{
//               background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
//               color: '#0f172a',
//               fontWeight: 600,
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
//               },
//             }}
//           >
//             {loading ? 'Saving...' : 'Create Prescription'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DoctorDashboard ;





// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Divider,
//   Alert,
//   Stack,
//   AppBar,
//   Toolbar,
//   Fade,
//   Paper,
// } from '@mui/material';
// import {
//   VideoCall,
//   Person,
//   Medication,
//   Assignment,
//   ExitToApp,
//   LocalHospital,
//   Groups,
//   Schedule,
//   TrendingUp,
//   Call,
//   Close,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import VideoCallComponent from './VideoCall';

// const DoctorDashboard = () => {
//   const { t } = useTranslation();
//   const [patients, setPatients] = useState([]); // Start with empty array - no mock data
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [callAlert, setCallAlert] = useState(null);
  
//   // Updated video call state for Jitsi Meet
//   const [videoCallData, setVideoCallData] = useState({
//     show: false,
//     patient: null,
//     roomName: null
//   });

//   useEffect(() => {
//     // Initialize with empty patient list (removed mock data)
//     // setPatients(mockPatients); // REMOVED THIS LINE

//     // Firebase auth listener for current user
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });

//     // Setup Socket.IO connection and listeners
//     const socketClient = io('http://localhost:5000'); // Backend socket server URL
//     setSocket(socketClient);

//     socketClient.emit('join_role_room', 'doctors');

//     // Listen for new patients logging in
//     socketClient.on('new_patient', (patientData) => {
//       console.log('🏥 New patient logged in:', patientData);
//       setPatients(prevPatients => {
//         // Check if patient already exists to avoid duplicates
//         const exists = prevPatients.find(p => p.id === patientData.id);
//         if (!exists) {
//           return [...prevPatients, {
//             id: patientData.id,
//             name: patientData.name,
//             email: patientData.email,
//             loginTime: new Date().toLocaleString(),
//             status: 'Online',
//             priority: 'medium'
//           }];
//         }
//         return prevPatients;
//       });
//     });

//     // Listen for incoming video call requests
//     socketClient.on('incoming_call', ({ fromUser, roomName }) => {
//       console.log('📞 Incoming call from:', fromUser.name, 'Room:', roomName);
//       setCallAlert({
//         ...fromUser,
//         roomName: roomName
//       });
//     });

//     return () => {
//       unsubscribe();
//       socketClient.disconnect();
//     };
//   }, []);

//   // Updated video call handler for Jitsi Meet
//   const handleVideoCall = (patient) => {
//     console.log('🎥 Starting video call with:', patient.name);
//     const roomName = `consultation-${patient.id}-${Date.now()}`;
    
//     setVideoCallData({
//       show: true,
//       patient: patient,
//       roomName: roomName
//     });
//   };

//   // Handle answering incoming call
//   const handleAnswerCall = () => {
//     if (callAlert && callAlert.roomName) {
//       setVideoCallData({
//         show: true,
//         patient: callAlert,
//         roomName: callAlert.roomName
//       });
//     }
//     setCallAlert(null);
//   };

//   const handleRejectCall = () => {
//     setCallAlert(null);
//   };

//   // Updated end call handler
//   const handleEndVideoCall = () => {
//     setVideoCallData({
//       show: false,
//       patient: null,
//       roomName: null
//     });
//   };

//   const handlePrescription = (patient) => {
//     console.log('💊 Open prescription for:', patient.name);
//     // Add your prescription logic here
//     // You can open a prescription modal or navigate to prescription tab
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Online': return '#4ade80';
//       case 'Follow-up': return '#f59e0b';
//       case 'New Patient': return '#06b6d4';
//       default: return '#94a3b8';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#4ade80';
//       default: return '#94a3b8';
//     }
//   };

//   const stats = [
//     { label: 'Total Patients', value: patients.length, color: '#4ade80', icon: <Groups /> },
//     { label: 'Online Patients', value: patients.filter(p => p.status === 'Online').length, color: '#06b6d4', icon: <Person /> },
//     { label: 'Active Calls', value: videoCallData.show ? 1 : 0, color: '#f59e0b', icon: <VideoCall /> },
//     { label: 'Notifications', value: callAlert ? 1 : 0, color: '#8b5cf6', icon: <TrendingUp /> },
//   ];

//   // Updated render section for Jitsi Meet video call
//   if (videoCallData.show) {
//     return (
//       <VideoCallComponent
//         role="doctor"
//         currentUser={currentUser}
//         callingPatient={videoCallData.patient}
//         roomName={videoCallData.roomName}
//         onCallEnd={handleEndVideoCall}
//       />
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' }}>
//       <AppBar position="sticky" sx={{ bgcolor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <LocalHospital sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
//             <Typography variant="h5" sx={{ background: 'linear-gradient(45deg, #4ade80, #22d3ee)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 700 }}>
//               Doctor Dashboard
//             </Typography>
//           </Box>
//           <IconButton onClick={handleLogout} sx={{ color: '#f1f5f9', border: '1px solid rgba(77, 222, 128, 0.3)', '&:hover': { borderColor: '#4ade80', bgcolor: 'rgba(77, 222, 128, 0.1)' } }}>
//             <ExitToApp />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {stats.map((stat, idx) => (
//             <Grid item xs={12} sm={6} md={3} key={idx}>
//               <Fade in={true} timeout={800 + idx * 200}>
//                 <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`, border: `1px solid ${stat.color}40`, borderRadius: 3, transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 20px 40px -10px ${stat.color}30` } }}>
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="h3" sx={{ color: stat.color, fontWeight: 800, fontSize: '2.5rem' }}>{stat.value}</Typography>
//                         <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 500 }}>{stat.label}</Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 2, background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)` }}>
//                         {React.cloneElement(stat.icon, { sx: { fontSize: 32, color: stat.color } })}
//                       </Box>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Incoming Call Alert */}
//         {callAlert && (
//           <Alert 
//             severity="info" 
//             sx={{ 
//               mb: 2,
//               backgroundColor: 'rgba(6, 182, 212, 0.1)',
//               border: '1px solid rgba(6, 182, 212, 0.3)',
//               color: '#22d3ee'
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//               <Typography sx={{ fontWeight: 600 }}>
//                 📞 {callAlert.name} is requesting a video consultation
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Button 
//                   size="small" 
//                   variant="contained" 
//                   onClick={handleAnswerCall}
//                   sx={{ 
//                     bgcolor: '#4ade80',
//                     '&:hover': { bgcolor: '#22c55e' }
//                   }}
//                 >
//                   Answer Call
//                 </Button>
//                 <Button 
//                   size="small" 
//                   variant="outlined" 
//                   onClick={handleRejectCall}
//                   sx={{ 
//                     color: '#ef4444',
//                     borderColor: '#ef4444',
//                     '&:hover': { borderColor: '#dc2626', bgcolor: 'rgba(239, 68, 68, 0.1)' }
//                   }}
//                 >
//                   Reject
//                 </Button>
//               </Box>
//             </Box>
//           </Alert>
//         )}

//         {/* Patient List */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={12}>
//             <Paper elevation={0} sx={{ bgcolor: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(20px)', borderRadius: 3, border: '1px solid rgba(77,222,128,0.2)', p: 3 }}>
//               <Typography variant="h5" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
//                 <Groups sx={{ mr: 1, color: '#4ade80' }} /> 
//                 Online Patients ({patients.length})
//               </Typography>

//               {patients.length === 0 ? (
//                 <Box sx={{ textAlign: 'center', py: 6 }}>
//                   <Person sx={{ fontSize: 64, color: '#374151', mb: 2 }} />
//                   <Typography variant="h6" sx={{ color: '#94a3b8', mb: 1 }}>
//                     No patients currently online
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#6b7280' }}>
//                     Patients will appear here when they log in to the system
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Grid container spacing={2}>
//                   {patients.map((patient) => (
//                     <Grid item xs={12} md={6} lg={4} key={patient.id}>
//                       <Card
//                         elevation={0}
//                         sx={{
//                           background: 'rgba(30, 41, 59, 0.5)',
//                           border: '1px solid rgba(77, 222, 128, 0.2)',
//                           borderRadius: 2,
//                           '&:hover': {
//                             borderColor: '#4ade80',
//                             transform: 'translateY(-2px)',
//                             transition: 'all 0.2s ease-in-out',
//                           },
//                         }}
//                       >
//                         <CardContent sx={{ p: 3 }}>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                             <Box sx={{ flex: 1 }}>
//                               <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 600, mb: 1 }}>
//                                 {patient.name}
//                               </Typography>
//                               <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
//                                 📧 {patient.email}
//                               </Typography>
//                               <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
//                                 🕒 Online since: {patient.loginTime}
//                               </Typography>
                              
//                               <Chip 
//                                 label={patient.status} 
//                                 size="small" 
//                                 sx={{ 
//                                   backgroundColor: `${getStatusColor(patient.status)}20`, 
//                                   color: getStatusColor(patient.status), 
//                                   border: `1px solid ${getStatusColor(patient.status)}`,
//                                   fontWeight: 600
//                                 }} 
//                               />
//                             </Box>
//                           </Box>
                          
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
//                             {/* Prescription Button */}
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               startIcon={<Medication />}
//                               onClick={() => handlePrescription(patient)}
//                               sx={{
//                                 flex: 1,
//                                 color: '#8b5cf6',
//                                 borderColor: 'rgba(139, 92, 246, 0.3)',
//                                 '&:hover': {
//                                   borderColor: '#8b5cf6',
//                                   backgroundColor: 'rgba(139, 92, 246, 0.1)',
//                                 },
//                               }}
//                             >
//                               Prescribe
//                             </Button>

//                             {/* Video Call Button */}
//                             <Button
//                               variant="contained"
//                               size="small"
//                               startIcon={<VideoCall />}
//                               onClick={() => handleVideoCall(patient)}
//                               sx={{
//                                 flex: 1,
//                                 background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
//                                 '&:hover': {
//                                   background: 'linear-gradient(45deg, #0891b2, #0e7490)',
//                                   transform: 'scale(1.02)',
//                                 },
//                               }}
//                             >
//                               Video Call
//                             </Button>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default DoctorDashboard;













import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Alert,
  Stack,
  AppBar,
  Toolbar,
  Fade,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  VideoCall,
  Person,
  Medication,
  ExitToApp,
  LocalHospital,
  Groups,
  Add,
  Delete,
  Save,
  Cancel,
  Assignment,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import VideoCallComponent from './VideoCall';

// Use environment variable for backend URL
const BACKEND_URL = process.env.REACT_APP_SOCKET_URL ;
const API_BASE = 'http://localhost:5000/api';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [callAlert, setCallAlert] = useState(null);

  const [videoCallData, setVideoCallData] = useState({
    show: false,
    patient: null,
    roomName: null,
  });
  const [prescriptionDialog, setPrescriptionDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    notes: '',
    medications: []
  });
  const [currentMedication, setCurrentMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);
  const [prescriptionError, setPrescriptionError] = useState('');
  const [prescriptionSuccess, setPrescriptionSuccess] = useState('');


  useEffect(() => {
    console.log('🏥 DoctorDashboard: Setting up Socket.IO connection');

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log('👨‍⚕️ Doctor auth state:', user ? 'Logged in' : 'Logged out');
    });

    const socketClient = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
      withCredentials: true,
    });

    socketClient.on('connect', () => {
      console.log('✅ Doctor: Socket connected to backend');
      console.log('🆔 Doctor Socket ID:', socketClient.id);
    });

    socketClient.on('connect_error', (error) => {
      console.error('❌ Doctor: Socket connection error:', error);
    });

    setSocket(socketClient);
    socketClient.emit('join_role_room', 'doctors');
    console.log('🏥 Doctor joined doctors room');

    socketClient.on('new_patient', (patientData) => {
      console.log('👤 New patient logged in:', patientData);
      setPatients(prevPatients => {
        const exists = prevPatients.find(p => p.id === patientData.id);
        if (!exists) {
          return [...prevPatients, {
            id: patientData.id,
            name: patientData.name,
            email: patientData.email,
            loginTime: new Date().toLocaleString(),
            status: 'Online',
            priority: 'medium',
          }];
        }
        return prevPatients;
      });
    });

    socketClient.on('incoming_call', ({ fromUser, roomName }) => {
      console.log('📞 Doctor: Incoming call from:', fromUser.name, 'Room:', roomName);
      setCallAlert({
        ...fromUser,
        roomName: roomName,
      });
    });

    return () => {
      console.log('🧹 Doctor: Cleaning up');
      unsubscribe();
      socketClient.disconnect();
    };
  }, []);

  const handleVideoCall = (patient) => {
    console.log('🎥 Doctor: Starting video call with:', patient.name);
    const roomName = `consultation-${patient.id}-${Date.now()}`;
    setVideoCallData({
      show: true,
      patient,
      roomName,
    });
  };

  const handleAnswerCall = () => {
    console.log('📞 Doctor: Answering call from:', callAlert.name);
    if (callAlert && callAlert.roomName) {
      setVideoCallData({
        show: true,
        patient: callAlert,
        roomName: callAlert.roomName,
      });
    }
    setCallAlert(null);
  };

  const handleRejectCall = () => {
    console.log('❌ Doctor: Rejecting call');
    setCallAlert(null);
  };

  const handleEndVideoCall = () => {
    console.log('📴 Doctor: Ending video call');
    setVideoCallData({
      show: false,
      patient: null,
      roomName: null,
    });
  };

  const handlePrescription = (patient) => {
    console.log('💊 Open prescription for:', patient.name);
    setSelectedPatient(patient);
    setPrescriptionDialog(true);
    setPrescriptionError('');
    setPrescriptionSuccess('');
    // Reset form
    setPrescriptionData({
      diagnosis: '',
      notes: '',
      medications: []
    });
    setCurrentMedication({
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  const handleClosePrescription = () => {
    setPrescriptionDialog(false);
    setSelectedPatient(null);
    setPrescriptionError('');
    setPrescriptionSuccess('');
  };

  const handleAddMedication = () => {
    if (!currentMedication.name || !currentMedication.dosage || !currentMedication.frequency) {
      setPrescriptionError('Please fill in medication name, dosage, and frequency');
      return;
    }

    const newMedication = {
      ...currentMedication,
      id: Date.now().toString()
    };

    setPrescriptionData(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));

    // Reset current medication form
    setCurrentMedication({
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
    setPrescriptionError('');
  };

  const handleRemoveMedication = (medicationId) => {
    setPrescriptionData(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== medicationId)
    }));
  };

  const handleSavePrescription = async () => {
    if (!prescriptionData.diagnosis || prescriptionData.medications.length === 0) {
      setPrescriptionError('Please provide diagnosis and at least one medication');
      return;
    }

    setPrescriptionLoading(true);
    setPrescriptionError('');

    try {
      const token = await auth.currentUser?.getIdToken();
      
      const prescriptionPayload = {
        patientId: selectedPatient.id.toString(),
        patientName: selectedPatient.name,
        patientEmail: selectedPatient.email,
        doctorName: currentUser?.displayName || currentUser?.email || 'Dr. Current User',
        doctorId: currentUser?.uid,
        diagnosis: prescriptionData.diagnosis.trim(),
        notes: prescriptionData.notes.trim(),
        medications: prescriptionData.medications.map(med => ({
          name: med.name.trim(),
          dosage: med.dosage.trim(),
          frequency: med.frequency.trim(),
          duration: med.duration.trim(),
          instructions: med.instructions.trim()
        })),
        status: 'active',
        prescribedDate: new Date().toISOString()
      };

      console.log('📋 Saving prescription:', prescriptionPayload);

      const response = await fetch(`${API_BASE}/prescriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'mock-token'}`
        },
        body: JSON.stringify(prescriptionPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Prescription saved successfully:', result);

      setPrescriptionSuccess('Prescription saved successfully to MongoDB!');
      
      // Auto close dialog after 2 seconds
      setTimeout(() => {
        handleClosePrescription();
      }, 2000);

    } catch (error) {
      console.error('❌ Error saving prescription:', error);
      setPrescriptionError(`Failed to save prescription: ${error.message}`);
    } finally {
      setPrescriptionLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return '#4ade80';
      case 'Follow-up': return '#f59e0b';
      case 'New Patient': return '#06b6d4';
      default: return '#94a3b8';
    }
  };

  const stats = [
    { label: 'Total Patients', value: patients.length, color: '#4ade80', icon: <Groups /> },
    { label: 'Online Patients', value: patients.filter(p => p.status === 'Online').length, color: '#06b6d4', icon: <Person /> },
    { label: 'Active Calls', value: videoCallData.show ? 1 : 0, color: '#f59e0b', icon: <VideoCall /> },
    { label: 'Notifications', value: callAlert ? 1 : 0, color: '#8b5cf6', icon: <LocalHospital /> },
  ];

  if (videoCallData.show) {
    return (
      <VideoCallComponent
        role="doctor"
        currentUser={currentUser}
        callingPatient={videoCallData.patient}
        roomName={videoCallData.roomName}
        onCallEnd={handleEndVideoCall}
      />
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalHospital sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
            <Typography variant="h5" sx={{
              background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 700,
            }}>
              Doctor Dashboard
            </Typography>
          </Box>
          <IconButton onClick={handleLogout} sx={{
            color: '#f1f5f9',
            border: '1px solid rgba(77, 222, 128, 0.3)',
            '&:hover': { borderColor: '#4ade80', bgcolor: 'rgba(77, 222, 128, 0.1)' },
          }}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Fade in timeout={800 + idx * 200}>
                <Card elevation={0} sx={{
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                  border: `1px solid ${stat.color}40`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 20px 40px -10px ${stat.color}30` },
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h3" sx={{ color: stat.color, fontWeight: 800, fontSize: '2.5rem' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)`,
                      }}>
                        {React.cloneElement(stat.icon, { sx: { fontSize: 32, color: stat.color } })}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {callAlert && (
          <Alert severity="info" sx={{
            mb: 2,
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: '#22d3ee',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontWeight: 600 }}>
                📞 {callAlert.name} is requesting a video consultation
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleAnswerCall}
                  sx={{
                    bgcolor: '#4ade80',
                    '&:hover': { bgcolor: '#22c55e' },
                  }}
                >
                  Answer Call
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleRejectCall}
                  sx={{
                    color: '#ef4444',
                    borderColor: '#ef4444',
                    '&:hover': { borderColor: '#dc2626', bgcolor: 'rgba(239, 68, 68, 0.1)' },
                  }}
                >
                  Reject
                </Button>
              </Box>
            </Box>
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Paper elevation={0} sx={{
              bgcolor: 'rgba(30,41,59,0.5)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(77,222,128,0.2)',
              p: 3,
            }}>
              <Typography variant="h5" sx={{ color: '#f1f5f9', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <Groups sx={{ mr: 1, color: '#4ade80' }} />
                Online Patients ({patients.length})
              </Typography>

              {patients.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Person sx={{ fontSize: 64, color: '#374151', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#94a3b8', mb: 1 }}>
                    No patients currently online
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Patients will appear here when they log in to the system
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {patients.map((patient) => (
                    <Grid item xs={12} md={6} lg={4} key={patient.id}>
                      <Card elevation={0} sx={{
                        background: 'rgba(30, 41, 59, 0.5)',
                        border: '1px solid rgba(77, 222, 128, 0.2)',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#4ade80',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 600, mb: 1 }}>
                                {patient.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                                📧 {patient.email}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                🕒 Online since: {patient.loginTime}
                              </Typography>

                              <Typography variant="caption" sx={{
                                backgroundColor: `${getStatusColor(patient.status)}20`,
                                color: getStatusColor(patient.status),
                                border: `1px solid ${getStatusColor(patient.status)}`,
                                fontWeight: 600,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                              }}>
                                {patient.status}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Medication />}
                              onClick={() => handlePrescription(patient)}
                              sx={{
                                flex: 1,
                                color: '#8b5cf6',
                                borderColor: 'rgba(139, 92, 246, 0.3)',
                                '&:hover': {
                                  borderColor: '#8b5cf6',
                                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                },
                              }}
                            >
                              Prescribe
                            </Button>

                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<VideoCall />}
                              onClick={() => handleVideoCall(patient)}
                              sx={{
                                flex: 1,
                                background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #0891b2, #0e7490)',
                                  transform: 'scale(1.02)',
                                },
                              }}
                            >
                              Video Call
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={prescriptionDialog}
        onClose={handleClosePrescription}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1e293b',
            border: '1px solid rgba(77, 222, 128, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{
          color: '#f1f5f9',
          background: 'linear-gradient(135deg, rgba(77, 222, 128, 0.1), rgba(34, 211, 238, 0.1))',
          borderBottom: '1px solid rgba(77, 222, 128, 0.2)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Assignment sx={{ mr: 2, color: '#4ade80' }} />
          Create Prescription for {selectedPatient?.name}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {prescriptionError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {prescriptionError}
            </Alert>
          )}

          {prescriptionSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {prescriptionSuccess}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Patient Info */}
            <Grid item xs={12}>
              <Paper sx={{
                p: 2,
                bgcolor: 'rgba(77, 222, 128, 0.05)',
                border: '1px solid rgba(77, 222, 128, 0.2)',
              }}>
                <Typography variant="subtitle1" sx={{ color: '#4ade80', fontWeight: 600, mb: 1 }}>
                  Patient Information
                </Typography>
                <Typography sx={{ color: '#f1f5f9' }}>
                  <strong>Name:</strong> {selectedPatient?.name}
                </Typography>
                <Typography sx={{ color: '#f1f5f9' }}>
                  <strong>Email:</strong> {selectedPatient?.email}
                </Typography>
                <Typography sx={{ color: '#f1f5f9' }}>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </Typography>
              </Paper>
            </Grid>

            {/* Diagnosis */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                multiline
                rows={3}
                value={prescriptionData.diagnosis}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, diagnosis: e.target.value }))}
                placeholder="Enter patient diagnosis..."
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8' },
                }}
              />
            </Grid>

            {/* Add Medication Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#f1f5f9', mb: 2, display: 'flex', alignItems: 'center' }}>
                <Medication sx={{ mr: 1, color: '#4ade80' }} />
                Add Medications
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Medication Name"
                    value={currentMedication.name}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Amoxicillin"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#f1f5f9',
                        '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                      },
                      '& .MuiInputLabel-root': { color: '#94a3b8' },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Dosage"
                    value={currentMedication.dosage}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="e.g., 500mg"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#f1f5f9',
                        '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                      },
                      '& .MuiInputLabel-root': { color: '#94a3b8' },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Frequency"
                    value={currentMedication.frequency}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, frequency: e.target.value }))}
                    placeholder="e.g., Twice daily"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#f1f5f9',
                        '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                      },
                      '& .MuiInputLabel-root': { color: '#94a3b8' },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Duration"
                    value={currentMedication.duration}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 7 days"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#f1f5f9',
                        '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                      },
                      '& .MuiInputLabel-root': { color: '#94a3b8' },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddMedication}
                    sx={{
                      height: '56px',
                      background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                      '&:hover': { background: 'linear-gradient(45deg, #22c55e, #16a34a)' },
                    }}
                  >
                    Add Medication
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Special Instructions (Optional)"
                    value={currentMedication.instructions}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, instructions: e.target.value }))}
                    placeholder="e.g., Take with food, Avoid alcohol"
                    multiline
                    rows={2}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#f1f5f9',
                        '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                      },
                      '& .MuiInputLabel-root': { color: '#94a3b8' },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Medications List */}
            {prescriptionData.medications.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: '#f1f5f9', mb: 2 }}>
                  Prescribed Medications ({prescriptionData.medications.length})
                </Typography>

                <TableContainer component={Paper} sx={{
                  bgcolor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(77, 222, 128, 0.2)',
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ '& th': { color: '#4ade80', fontWeight: 600 } }}>
                        <TableCell>Medication</TableCell>
                        <TableCell>Dosage</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Instructions</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescriptionData.medications.map((med) => (
                        <TableRow key={med.id} sx={{ '& td': { color: '#f1f5f9' } }}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>
                            <Chip
                              label={med.frequency}
                              size="small"
                              sx={{ bgcolor: 'rgba(34, 211, 238, 0.2)', color: '#22d3ee' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={med.duration}
                              size="small"
                              sx={{ bgcolor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}
                            />
                          </TableCell>
                          <TableCell>{med.instructions || '-'}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveMedication(med.id)}
                              sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes (Optional)"
                multiline
                rows={3}
                value={prescriptionData.notes}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional instructions or notes for the patient..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8' },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{
          p: 3,
          borderTop: '1px solid rgba(77, 222, 128, 0.2)',
          gap: 2,
        }}>
          <Button
            onClick={handleClosePrescription}
            startIcon={<Cancel />}
            sx={{
              color: '#94a3b8',
              borderColor: 'rgba(148, 163, 184, 0.3)',
              '&:hover': {
                borderColor: '#94a3b8',
                bgcolor: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSavePrescription}
            disabled={prescriptionLoading || !prescriptionData.diagnosis || prescriptionData.medications.length === 0}
            startIcon={prescriptionLoading ? <CircularProgress size={20} /> : <Save />}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #4ade80, #22c55e)',
              '&:hover': { background: 'linear-gradient(45deg, #22c55e, #16a34a)' },
              '&:disabled': { bgcolor: 'rgba(77, 222, 128, 0.3)' },
            }}
          >
            {prescriptionLoading ? 'Saving...' : 'Save Prescription'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorDashboard;
