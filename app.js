require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
//const cors = require('cors');
//app.use(cors());
//require('dotenv').config(); // Load environment variables from .env file
// Import routes
const userRoutes = require('./routes/userRoutes');
const crypto = require('crypto');
const multer = require('multer');
const levelRoutes = require('./routes/levelRoutes');
const videoRoutes = require('./routes/videoRoutes');
const productRoutes = require('./routes/productRoutes');
// const authMiddleware = require('./controllers/authMiddleware');



// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
};

// Generate and log the JWT secret
const jwtSecret = generateJwtSecret();
//const jwtSecret = process.env.JWT_SECRET;
console.log('JWT Secret:', jwtSecret);
// Make JWT secret available in userController.js
module.exports = { jwtSecret };

// Example controller
const userController = require('./controllers/userController');



const app = express();
// Use built-in middleware for parsing JSON (Express 4.16.0 and above)
app.use(express.json());
//app.use(bodyParser.json());

// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = await User.findById(decoded._id);
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };
<<<<<<< HEAD

=======
>>>>>>> c6c04da (Initial commit)
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/products', productRoutes);
app.use(limiter);
app.use(helmet());
app.use(cors());

// Middleware
// Middleware to log incoming requests for debugging
// app.use((req, _res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   console.log('Request Headers:', req.headers);
//   console.log('Request Body:', req.body);
//   next();
// });


// MongoDB connection string
const dbURI = 'mongodb+srv://LearningApp:251536@cluster0.xgy0bwd.mongodb.net/learningApp'; // Replace with your actual MongoDB connection string

// Connect to MongoDB
mongoose.connect(dbURI, {
 // useNewUrlParser: true, // Deprecated, but you can remove it
 // useUnifiedTopology: true, // Deprecated, but you can remove it
 // poolSize: 10 // Maintain up to 10 socket connections
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.post('/signup', userController.signup);


<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 5700;
>>>>>>> c6c04da (Initial commit)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
