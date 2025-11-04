const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    // Use environment variable for MongoDB connection string
    // Falls back to localhost for local development
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/enclop';
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;