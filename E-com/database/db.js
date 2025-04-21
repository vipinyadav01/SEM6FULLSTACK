const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('Troubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your MongoDB Atlas credentials');
    console.log('3. Ensure your IP is whitelisted in Atlas');
    console.log('4. Check cluster is running in Atlas');
    process.exit(1);
  }
};

mongoose.connection.on('connecting', () => {
  console.log('Connecting to MongoDB Atlas...');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Atlas connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = connectDB;