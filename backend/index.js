require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./src/config/database');
const limiter = require('./src/utils/rateLimit');
const authLimiter = require('./src/utils/authRateLimit');
const logger = require('./src/utils/logger');
const AppError = require('./src/utils/errors');
const validators = require('./src/utils/validators');
const groqService = require('./src/services/groq');
const { Server } = require('socket.io');
const path = require('path');

// Import routes
const speechRoutes = require('./src/routes/speech');
const chatRoutes = require('./src/routes/chat');
const healthRoutes = require('./src/routes/health');
const userRoutes = require('./src/routes/userRoutes');
const voiceRoutes = require('./src/routes/voice');
const reviewRoutes = require('./src/routes/reviewRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Render Load Balancer Support
app.set('trust proxy', 1);

// Middleware
const allowedOrigins = [
  'https://healthbuddy-x0enff.flutterflow.app',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Set to true if you want strict CSP
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(limiter);

// Specialized Rate Limiting for Auth
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/speech', speechRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/', userRoutes);
app.use('/api/', reviewRoutes);
app.use('/api/', adminRoutes);

// Define axios client for internal interactions
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.BACKEND_URL || 'http://localhost:3001')
  : 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server);
// io.on('connection', (socket) => {
//   console.log('a user connected', socket.id);
// });
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Adjust this to match your frontend's origin
//     methods: ['GET', 'POST'],
//   },
// });

// // Create a WebSocket server
// const wss = new WebSocket.Server({ server });

// Use groqService singleton

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // // Handle receiving a message from the client
  socket.on('send_message', async (data) => {
    try {
      // const message = data;
      const message = typeof data === 'string' ? data : data.message;
      console.log('Send message:', data);
      if (!data) {
        throw new Error('Message data is empty');
      }

      // Ensure message is properly formatted
      if (!message) {
        return socket.emit('receive_message', {
          success: false,
          error: 'Message is required',
        });
      }


      // Make API request with Auth Token
      const token = socket.handshake.auth?.token;
      if (!token) {
         return socket.emit('receive_message', { success: false, error: 'Unauthorized: missing token' });
      }

      const response = await apiClient.post('/api/chat/message', { message }, {
         headers: { Authorization: `Bearer ${token}` }
      });
      
      socket.emit('receive_message', response.data);
    } catch (error) {
      logger.error('WebSocket error:', error.message);
      // Detailed error logging
      console.error('Detailed error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });

      // More specific error handling
      let errorMessage = 'Failed to process message';

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
        // Emit error message back to the client
        socket.emit('receive_message', {
          success: false,
          error: 'Failed to process message',
        });
      }
    }
  });


  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

//testing js frontend for socket.io
app.use(express.static(path.resolve("./src/public")));

app.get('/', (req, res) => {
  // res.send('Welcome to the homepage!');
  return res.sendFile(__dirname + "/src/public/test.html");
});
// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  logger.info(`Server running on port http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});