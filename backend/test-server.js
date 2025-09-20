const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Patient registration route
app.post('/api/patients', (req, res) => {
  console.log('👨‍⚕️ New patient:', req.body);
  
  // Emit to doctors
  io.to('doctors').emit('new_patient', req.body);
  
  res.json({ success: true, user: req.body });
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('join_role_room', (role) => {
    socket.join(role);
    console.log(`👤 User joined ${role} room`);
  });

  socket.on('call_initiated', ({ fromUser, toRole, roomName }) => {
    console.log('📞 Call from:', fromUser.name, 'to:', toRole);
    
    if (toRole === 'doctor') {
      socket.broadcast.to('doctors').emit('incoming_call', { 
        fromUser, 
        roomName,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/api/test`);
});
