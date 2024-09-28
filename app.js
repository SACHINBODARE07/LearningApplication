require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const crypto = require('crypto');

// Import routes
const userRoutes = require('./routes/userRoutes');
const levelRoutes = require('./routes/levelRoutes');
const videoRoutes = require('./routes/videoRoutes');
const productRoutes = require('./routes/productRoutes');

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
};

// Generate and log the JWT secret
const jwtSecret = generateJwtSecret();
console.log('JWT Secret:', jwtSecret);

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
const dbURI = 'mongodb+srv://LearningApp:251536@cluster0.xgy0bwd.mongodb.net/learningApp'; // Replace with your actual MongoDB connection string

// Connect to MongoDB
mongoose.connect(dbURI)
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Example signup route
const userController = require('./controllers/userController');
app.post('/signup', userController.signup);

const PORT = process.env.PORT || 5000;

// Export the server for serverless deployment
module.exports.handler = async (event, context) => {
  return app(event, context);
};

// If not serverless, run the server locally
if (process.env.NODE_ENV !== 'serverless') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
