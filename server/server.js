import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cvRoutes from './routes/cvRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app', // Replace with your actual Vercel URL
    /\.vercel\.app$/ // Allow all Vercel subdomains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'CV Generator API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/cv', cvRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    if (error.message.includes('IP')) {
      console.error('\n🚨 IP WHITELIST ERROR:');
      console.error('1. Go to MongoDB Atlas Dashboard');
      console.error('2. Navigate to Network Access');
      console.error('3. Add IP Address: 0.0.0.0/0 (Allow from anywhere)');
      console.error('4. Or add Render\'s IP ranges');
      console.error('5. Save and wait 2-3 minutes for changes to apply\n');
    }
    
    if (error.message.includes('authentication')) {
      console.error('\n🚨 AUTHENTICATION ERROR:');
      console.error('1. Check your MongoDB username and password');
      console.error('2. Ensure MONGODB_URI is correctly set in environment variables');
      console.error('3. Verify database user has proper permissions\n');
    }
    
    process.exit(1);
  }
};

// Start server only after successful DB connection
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});