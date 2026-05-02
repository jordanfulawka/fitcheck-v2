const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  company: String,
  role: String,
  location: String,
  dateApplied: String,
  applicationURL: String,
  status: String,
  priority: String,
  notes: String,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
