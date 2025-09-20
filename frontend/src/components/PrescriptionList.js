import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import {
  Medication,
  Schedule,
  LocalPharmacy,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PrescriptionList = () => {
  const { t } = useTranslation();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = 'http://localhost:5000/api';
  
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // const fetchPrescriptions = async () => {
  //   try {
  //     // Mock data for demonstration
  //     const mockPrescriptions = [
  //       {
  //         id: 1,
  //         doctorName: 'Dr. Smith',
  //         date: '2025-09-15',
  //         diagnosis: 'Hypertension',
  //         medications: [
  //           { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
  //           { name: 'Hydrochlorothiazide', dosage: '25mg', frequency: 'Once daily', duration: '30 days' }
  //         ],
  //         status: 'active'
  //       },
  //       {
  //         id: 2,
  //         doctorName: 'Dr. Johnson',
  //         date: '2025-09-10',
  //         diagnosis: 'Upper Respiratory Infection',
  //         medications: [
  //           { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
  //           { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '7 days' }
  //         ],
  //         status: 'completed'
  //       }
  //     ];

  //     setPrescriptions(mockPrescriptions);
  //   } catch (error) {
  //     console.error('Error fetching prescriptions:', error);
  //   }
  //   setLoading(false);
  // };
  const fetchPrescriptions = async () => {
  try {
    // Get auth token from Firebase
    const token = localStorage.getItem('authToken') || 'mock-token';
    
    const response = await fetch(`${API_BASE}/prescriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prescriptions');
    }

    const data = await response.json();
    console.log('✅ Prescriptions loaded from MongoDB:', data.length);
    
    // Format data for display
    const formattedPrescriptions = data.map(prescription => ({
      ...prescription,
      id: prescription._id,
      date: prescription.prescribedDate ? 
        new Date(prescription.prescribedDate).toISOString().split('T')[0] : 
        new Date().toISOString().split('T')[0]
    }));
    
    setPrescriptions(formattedPrescriptions);
  } catch (error) {
    console.error('❌ Error fetching prescriptions:', error);
    alert('Failed to load prescriptions from MongoDB');
  }
  setLoading(false);
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'default';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'completed': return <Schedule sx={{ color: '#9e9e9e' }} />;
      case 'expired': return <Warning sx={{ color: '#f44336' }} />;
      default: return <Medication />;
    }
  };

  if (loading) {
    return <Typography>Loading prescriptions...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Medication sx={{ fontSize: 32, color: '#4caf50', mr: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#4caf50' }}>
          {t('prescriptions')}
        </Typography>
      </Box>

      {prescriptions.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="body1">
            No prescriptions found. Your prescribed medications will appear here.
          </Typography>
        </Alert>
      ) : (
        prescriptions.map((prescription) => (
          <Card key={prescription._id} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {prescription.diagnosis}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prescribed by {prescription.doctorName} on {prescription.date}
                  </Typography>
                </Box>
                <Chip
                  icon={getStatusIcon(prescription.status)}
                  label={prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  color={getStatusColor(prescription.status)}
                  variant="outlined"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                Medications:
              </Typography>

              <List>
                {prescription.medications.map((med, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <ListItemIcon>
                      <LocalPharmacy sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {med.name}
                          </Typography>
                          <Chip label={med.dosage} size="small" color="primary" variant="outlined" />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Frequency:</strong> {med.frequency}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Duration:</strong> {med.duration}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="outlined" size="small">
                  Check Availability
                </Button>
                <Button variant="outlined" size="small">
                  Download PDF
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PrescriptionList;