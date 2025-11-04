const express = require('express');
const cors = require('cors');

const Project = require('./models/ProjectModel');

const app = express();
const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT || 5100;

app.get('/',(req,res) =>{
    res.send('Welcome to our website - Enclop!!');
});

app.use(cors());

// API endpoint to get all projects from the database
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({}); // find({}) gets all documents
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});