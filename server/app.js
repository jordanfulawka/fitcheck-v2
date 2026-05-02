const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use(express.json());

app.use('/api', jobRoutes);
app.use('/api', matchRoutes);

module.exports = app;
