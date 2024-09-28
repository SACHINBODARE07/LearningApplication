require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const crypto = require('crypto');
const serverless = require('serverless-http'); // Import serverless-http

// Import routes
const userRoutes = require('./routes/userRoutes'); // Adjusted path
const levelRoutes = require('./routes/levelRoutes'); // Adjusted path
const videoRoutes = require('./routes/videoRoutes'); // Adjusted path
const productRoutes = require('./routes/productRoutes'); // Adjusted path

const app = express();

// Use built-in middleware for parsing JSON
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/products', productRoutes);

// MongoDB connection string
const dbURI = process.env.MONGODB_URI; // Use an environment variable for your connection string

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Example signup route
const userController = require('../controllers/userController'); // Adjusted path
app.post('/signup', userController.signup);

// Export the app as a Vercel serverless function
module.exports = serverless(app);
