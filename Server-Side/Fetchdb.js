// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SHL_PROJECTS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
    Project: {
        Title: String,
        Technologies: String
      },
      Technical_Skillset: {
        Frontend: String,
        Backend: String,
        Databases: String,
        Infrastructre: String
      }
      
},{ collection: 'Projects_Sample' });

const Project = mongoose.model('Project', ProjectSchema);

app.use(cors());
app.use(express.json());

// Define your API route to fetch data
app.get('/api/projects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
