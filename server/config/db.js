const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    // The connection string. 'enclope' is the name of our database.
    const conn = await mongoose.connect('mongodb://localhost:27017/enclope');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;