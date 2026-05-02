const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');

app.use(express.json());

app.use('/jobs', jobRoutes);

module.exports = app;
