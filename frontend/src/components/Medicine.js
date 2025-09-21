import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress
} from '@mui/material';

const API_BASE = 'http://localhost:5000/api'; // Adjust as needed

const InventoryList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
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

  if (loading) return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: '#4ade80' }}>
        Available Medicines
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(30,41,59,0.8)' }}>
              <TableCell sx={{ color: '#000000ff' }}>Name</TableCell>
              <TableCell sx={{ color: '#000000ff' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#000000ff' }}>Price</TableCell>
              <TableCell sx={{ color: '#000000ff' }}>Expiry</TableCell>
              <TableCell sx={{ color: '#000000ff' }}>Manufacturer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((med) => (
              <TableRow key={med._id} sx={{ '&:hover': { backgroundColor: 'rgba(77,222,128,0.1)' } }}>
                <TableCell sx={{ color: '#000000ff' }}>{med.name}</TableCell>
                <TableCell sx={{ color: '#000000ff' }}>{med.quantity}</TableCell>
                <TableCell sx={{ color: '#000000ff' }}>${med.price}</TableCell>
                <TableCell sx={{ color: '#000000ff' }}>{med.expiry}</TableCell>
                <TableCell sx={{ color: '#000000ff' }}>{med.manufacturer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryList;
