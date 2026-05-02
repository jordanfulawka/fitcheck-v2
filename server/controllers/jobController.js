const Job = require('../models/jobModel');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'error fetching all jobs',
    });
  }
};

exports.getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
};

exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        job: newJob,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      message: 'failed to create job',
    });
  }
};
