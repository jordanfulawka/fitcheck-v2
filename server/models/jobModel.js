const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  userId: String,
  company: String,
  role: String,
  location: String,
  dateApplied: Date,
  applicationURL: String,
  status: String,
  priority: String,
  notes: String,
  jobDescription: String,
  matchResult: {
    matchScore: Number,
    matchedSkills: [String],
    missingSkills: [String],
    strengths: [String],
    gaps: [String],
    recommendation: String,
    savedAt: Date,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
