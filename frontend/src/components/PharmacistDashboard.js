// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Chip,
//   AppBar,
//   Toolbar,
//   Grid,
// } from '@mui/material';
// import {
//   LocalPharmacy,
//   Add,
//   Edit,
//   Delete,
//   Inventory,
//   ExitToApp,
// } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';

// const PharmacistDashboard = () => {
//   const { t } = useTranslation();
//   const [medicines, setMedicines] = useState([]);
//   const [medicineDialog, setMedicineDialog] = useState(false);
//   const [editingMedicine, setEditingMedicine] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     quantity: '',
//     price: '',
//     expiry: '',
//     manufacturer: ''
//   });

//   const mockMedicines = [
//     { id: 1, name: 'Paracetamol', quantity: 500, price: 5.99, expiry: '2026-12-31', manufacturer: 'PharmaCorp' },
//     { id: 2, name: 'Amoxicillin', quantity: 250, price: 12.50, expiry: '2026-08-15', manufacturer: 'MediLab' },
//     { id: 3, name: 'Ibuprofen', quantity: 300, price: 8.75, expiry: '2026-10-20', manufacturer: 'HealthPlus' },
//     { id: 4, name: 'Aspirin', quantity: 45, price: 3.25, expiry: '2025-11-30', manufacturer: 'MediCorp' },
//     { id: 5, name: 'Cough Syrup', quantity: 120, price: 7.50, expiry: '2026-03-15', manufacturer: 'PharmPlus' },
//   ];

//   useEffect(() => {
//     setMedicines(mockMedicines);
//   }, []);

//   const handleAddMedicine = () => {
//     setEditingMedicine(null);
//     setFormData({ name: '', quantity: '', price: '', expiry: '', manufacturer: '' });
//     setMedicineDialog(true);
//   };

//   const handleEditMedicine = (medicine) => {
//     setEditingMedicine(medicine);
//     setFormData({
//       name: medicine.name,
//       quantity: medicine.quantity.toString(),
//       price: medicine.price.toString(),
//       expiry: medicine.expiry,
//       manufacturer: medicine.manufacturer
//     });
//     setMedicineDialog(true);
//   };

//   const handleSaveMedicine = () => {
//     if (editingMedicine) {
//       // Update existing medicine
//       setMedicines(prev => prev.map(med => 
//         med.id === editingMedicine.id 
//           ? { ...med, ...formData, quantity: parseInt(formData.quantity), price: parseFloat(formData.price) }
//           : med
//       ));
//     } else {
//       // Add new medicine
//       const newMedicine = {
//         id: Date.now(),
//         ...formData,
//         quantity: parseInt(formData.quantity),
//         price: parseFloat(formData.price)
//       };
//       setMedicines(prev => [...prev, newMedicine]);
//     }
//     setMedicineDialog(false);
//   };

//   const handleDeleteMedicine = (id) => {
//     setMedicines(prev => prev.filter(med => med.id !== id));
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getStockStatus = (quantity) => {
//     if (quantity < 50) return { label: 'Low Stock', color: 'error' };
//     if (quantity < 100) return { label: 'Medium Stock', color: 'warning' };
//     return { label: 'Good Stock', color: 'success' };
//   };

//   const lowStockCount = medicines.filter(med => med.quantity < 50).length;
//   const totalValue = medicines.reduce((sum, med) => sum + (med.quantity * med.price), 0);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Header */}
//       <AppBar position="static" sx={{ mb: 3 }}>
//         <Toolbar>
//           <LocalPharmacy sx={{ mr: 2 }} />
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Pharmacist Dashboard
//           </Typography>
//           <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 3 }}>
//           <Grid item xs={12} md={3}>
//             <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
//               <CardContent>
//                 <Typography variant="h4" color="white" align="center">
//                   {medicines.length}
//                 </Typography>
//                 <Typography variant="body1" color="white" align="center">
//                   Total Medicines
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <Card sx={{ background: 'linear-gradient(45deg, #F44336 30%, #EF5350 90%)' }}>
//               <CardContent>
//                 <Typography variant="h4" color="white" align="center">
//                   {lowStockCount}
//                 </Typography>
//                 <Typography variant="body1" color="white" align="center">
//                   Low Stock Items
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
//               <CardContent>
//                 <Typography variant="h4" color="white" align="center">
//                   ${totalValue.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body1" color="white" align="center">
//                   Total Inventory Value
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #42A5F5 90%)' }}>
//               <CardContent>
//                 <Typography variant="h4" color="white" align="center">
//                   {medicines.reduce((sum, med) => sum + med.quantity, 0)}
//                 </Typography>
//                 <Typography variant="body1" color="white" align="center">
//                   Total Units
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Medicine Inventory */}
//         <Card>
//           <CardContent>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography variant="h6">
//                 Medicine Inventory
//               </Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={handleAddMedicine}
//                 sx={{ background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)' }}
//               >
//                 Add Medicine
//               </Button>
//             </Box>

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Medicine Name</TableCell>
//                     <TableCell align="right">Quantity</TableCell>
//                     <TableCell align="right">Price</TableCell>
//                     <TableCell>Expiry Date</TableCell>
//                     <TableCell>Manufacturer</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell align="center">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {medicines.map((medicine) => {
//                     const stockStatus = getStockStatus(medicine.quantity);
//                     return (
//                       <TableRow key={medicine.id}>
//                         <TableCell component="th" scope="row">
//                           {medicine.name}
//                         </TableCell>
//                         <TableCell align="right">{medicine.quantity}</TableCell>
//                         <TableCell align="right">${medicine.price}</TableCell>
//                         <TableCell>{medicine.expiry}</TableCell>
//                         <TableCell>{medicine.manufacturer}</TableCell>
//                         <TableCell>
//                           <Chip
//                             label={stockStatus.label}
//                             color={stockStatus.color}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell align="center">
//                           <IconButton
//                             onClick={() => handleEditMedicine(medicine)}
//                             size="small"
//                             color="primary"
//                           >
//                             <Edit />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleDeleteMedicine(medicine.id)}
//                             size="small"
//                             color="error"
//                           >
//                             <Delete />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>

//         {/* Medicine Dialog */}
//         <Dialog
//           open={medicineDialog}
//           onClose={() => setMedicineDialog(false)}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>
//             {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
//           </DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Medicine Name"
//                 fullWidth
//                 value={formData.name}
//                 onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
//               />
//               <TextField
//                 label="Quantity"
//                 type="number"
//                 fullWidth
//                 value={formData.quantity}
//                 onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
//               />
//               <TextField
//                 label="Price ($)"
//                 type="number"
//                 step="0.01"
//                 fullWidth
//                 value={formData.price}
//                 onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
//               />
//               <TextField
//                 label="Expiry Date"
//                 type="date"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.expiry}
//                 onChange={(e) => setFormData(prev => ({...prev, expiry: e.target.value}))}
//               />
//               <TextField
//                 label="Manufacturer"
//                 fullWidth
//                 value={formData.manufacturer}
//                 onChange={(e) => setFormData(prev => ({...prev, manufacturer: e.target.value}))}
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setMedicineDialog(false)}>Cancel</Button>
//             <Button onClick={handleSaveMedicine} variant="contained">
//               {editingMedicine ? 'Update' : 'Add'} Medicine
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default PharmacistDashboard;








import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
  AppBar,
  Toolbar,
  Grid,
  Fade,
  Stack,
  Divider,
} from '@mui/material';
import {
  LocalPharmacy,
  Add,
  Edit,
  Delete,
  Inventory,
  ExitToApp,
  TrendingDown,
  TrendingUp,
  AttachMoney,
  Medication,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const PharmacistDashboard = () => {
  const { t } = useTranslation();
  const [medicines, setMedicines] = useState([]);
  const [medicineDialog, setMedicineDialog] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    expiry: '',
    manufacturer: ''
  });
  
  const API_BASE = 'http://localhost:5000/api';

  // Remove mockMedicines array completely

useEffect(() => {
  fetchMedicines();
}, []);

const fetchMedicines = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE}/medicines`);
    if (!response.ok) throw new Error('Failed to fetch medicines');
    const data = await response.json();
    setMedicines(data);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    alert('Failed to load medicines from MongoDB');
  } finally {
    setLoading(false);
  }
};

  

  const handleAddMedicine = () => {
    setEditingMedicine(null);
    setFormData({ name: '', quantity: '', price: '', expiry: '', manufacturer: '' });
    setMedicineDialog(true);
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      quantity: medicine.quantity.toString(),
      price: medicine.price.toString(),
      expiry: medicine.expiry,
      manufacturer: medicine.manufacturer
    });
    setMedicineDialog(true);
  };

  const handleSaveMedicine = async () => {
    setLoading(true);
    try {
      const medicineData = {
        name: formData.name,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        expiry: formData.expiry,
        manufacturer: formData.manufacturer
      };

      let response;
      if (editingMedicine) {
        // Update existing medicine in MongoDB
        response = await fetch(`${API_BASE}/medicines/${editingMedicine._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medicineData),
        });
      } else {
        // Add new medicine to MongoDB
        response = await fetch(`${API_BASE}/medicines`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medicineData),
        });
      }

      if (!response.ok) throw new Error('Failed to save medicine');

      await fetchMedicines(); // Refresh from MongoDB
      setMedicineDialog(false);
      setEditingMedicine(null);

    } catch (error) {
      console.error('Error saving medicine:', error);
      alert('Failed to save medicine to MongoDB');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteMedicine = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine from MongoDB?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/medicines/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Failed to delete medicine');

      setMedicines(prev => prev.filter(med => med._id !== id));

    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('Failed to delete medicine from MongoDB');
      fetchMedicines(); // Refresh if error
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity < 50) return { label: 'Low Stock', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.2)' };
    if (quantity < 100) return { label: 'Medium Stock', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.2)' };
    return { label: 'Good Stock', color: '#4ade80', bgColor: 'rgba(74, 222, 128, 0.2)' };
  };

  const lowStockCount = medicines.filter(med => med.quantity < 50).length;
  const totalValue = medicines.reduce((sum, med) => sum + (med.quantity * med.price), 0);

  const stats = [
    {
      label: 'Total Medicines',
      value: medicines.length,
      color: '#4ade80',
      icon: <Medication />,
    },
    {
      label: 'Low Stock Items',
      value: lowStockCount,
      color: '#ef4444',
      icon: <TrendingDown />,
    },
    {
      label: 'Total Inventory Value',
      value: `$${totalValue.toFixed(2)}`,
      color: '#06b6d4',
      icon: <AttachMoney />,
    },
    {
      label: 'Total Units',
      value: medicines.reduce((sum, med) => sum + med.quantity, 0),
      color: '#8b5cf6',
      icon: <TrendingUp />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    >
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(77, 222, 128, 0.2)',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalPharmacy sx={{ color: '#4ade80', mr: 2, fontSize: 32 }} />
            <Typography
              variant="h5"
              sx={{
                background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
              }}
            >
              Pharmacist Dashboard
            </Typography>
          </Box>

          <IconButton
            onClick={handleLogout}
            sx={{ 
              color: '#f1f5f9',
              border: '1px solid rgba(77, 222, 128, 0.3)',
              '&:hover': {
                borderColor: '#4ade80',
                backgroundColor: 'rgba(77, 222, 128, 0.1)',
              },
            }}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={800 + index * 200}>
                <Card
                  elevation={0}
                  sx={{
                    background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                    border: `1px solid ${stat.color}40`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 40px -10px ${stat.color}30`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography
                          variant="h3"
                          sx={{
                            color: stat.color,
                            fontWeight: 800,
                            fontSize: '2rem',
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: '#94a3b8',
                            fontWeight: 500,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}40)`,
                        }}
                      >
                        {React.cloneElement(stat.icon, { 
                          sx: { fontSize: 32, color: stat.color } 
                        })}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Fade in={true} timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(77, 222, 128, 0.2)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(90deg, rgba(77, 222, 128, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#f1f5f9',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Inventory sx={{ mr: 2, color: '#4ade80' }} />
                Medicine Inventory
              </Typography>
              
              <Button
                startIcon={<Add />}
                onClick={handleAddMedicine}
                sx={{
                  background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
                  color: '#0f172a',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Add Medicine
              </Button>
            </Box>

            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Medicine Name
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Expiry Date
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Manufacturer
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9', fontWeight: 700 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicines.map((medicine) => {
                    const stockStatus = getStockStatus(medicine.quantity);
                    return (
                      <TableRow 
                        key={medicine._id}
                        sx={{ 
                          '&:hover': { backgroundColor: 'rgba(77, 222, 128, 0.05)' }
                        }}
                      >
                        <TableCell sx={{ color: '#f1f5f9', fontWeight: 600 }}>
                          {medicine.name}
                        </TableCell>
                        <TableCell sx={{ color: '#94a3b8' }}>
                          {medicine.quantity}
                        </TableCell>
                        <TableCell sx={{ color: '#94a3b8' }}>
                          ${medicine.price}
                        </TableCell>
                        <TableCell sx={{ color: '#94a3b8' }}>
                          {medicine.expiry}
                        </TableCell>
                        <TableCell sx={{ color: '#94a3b8' }}>
                          {medicine.manufacturer}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={stockStatus.label}
                            sx={{
                              backgroundColor: stockStatus.bgColor,
                              color: stockStatus.color,
                              border: `1px solid ${stockStatus.color}`,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              onClick={() => handleEditMedicine(medicine)}
                              size="small"
                              sx={{
                                color: '#06b6d4',
                                border: '1px solid rgba(6, 182, 212, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                                  borderColor: '#06b6d4',
                                },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            
                            <IconButton
                              onClick={() => handleDeleteMedicine(medicine._id)}
                              size="small"
                              sx={{
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                  borderColor: '#ef4444',
                                },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Fade>
      </Box>

      <Dialog
        open={medicineDialog}
        onClose={() => setMedicineDialog(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(77, 222, 128, 0.2)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#f1f5f9', fontWeight: 700 }}>
          {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Medicine Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': { 
                    color: '#94a3b8',
                    '&.Mui-focused': { color: '#4ade80' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': { 
                    color: '#94a3b8',
                    '&.Mui-focused': { color: '#4ade80' },
                  },
                }}
              />
            </Grid>
                        <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94a3b8',
                    '&.Mui-focused': { color: '#4ade80' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.expiry}
                onChange={(e) => setFormData(prev => ({...prev, expiry: e.target.value}))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94a3b8',
                    '&.Mui-focused': { color: '#4ade80' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData(prev => ({...prev, manufacturer: e.target.value}))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    color: '#f1f5f9',
                    '& fieldset': { borderColor: 'rgba(77, 222, 128, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 222, 128, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#4ade80' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94a3b8',
                    '&.Mui-focused': { color: '#4ade80' },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setMedicineDialog(false)}
            sx={{ color: '#94a3b8' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveMedicine}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #4ade80, #22d3ee)',
              color: '#0f172a',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #22c55e, #06b6d4)',
              },
            }}
          >
            {editingMedicine ? 'Update' : 'Add'} Medicine
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PharmacistDashboard;
