const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;
