require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');

const app = express();

// Database connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('Troubleshooting tips:');
    console.log('1. Check your MongoDB URI in .env file');
    console.log('2. Verify MongoDB service is running');
    console.log('3. Check your network connection');
    console.log('4. Ensure your IP is whitelisted in MongoDB Atlas (if using cloud)');
    process.exit(1);
  }
};

connectDB();

// Database connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(authController.isLoggedIn);

// EJS Layouts Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main'); // This is your layout file

// Routes
app.use('/products', productRoutes);
app.use('/', authRoutes);

// Home route redirect
app.get('/', (req, res) => {
  res.redirect('/products');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    message: 'The page you requested could not be found',
    body: '<h1>404 - Page Not Found</h1><p>The page you requested could not be found.</p><a href="/products">Return to Home</a>'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', {
    title: 'Server Error',
    message: 'Something went wrong on our end',
    body: '<h1>500 - Server Error</h1><p>We\'re sorry, something went wrong on our end.</p><a href="/products">Return to Home</a>'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡️ Access it at http://localhost:${PORT}`);
});
