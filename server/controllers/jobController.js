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

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        job: updatedJob,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'failed to update job',
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'failed to delete job',
    });
  }
};

exports.getJobsByStatus = async (req, res) => {
  try {
    const stats = await Job.aggregate().group({
      _id: '$status',
      count: { $sum: 1 },
    });

    const result = {
      total: 0,
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
    };

    stats.forEach(({ _id, count }) => {
      result.total += count;
      if (_id === 'Applied') result.applied = count;
      if (_id === 'Interviewing') result.interviewing = count;
      if (_id === 'Offer') result.offer = count;
      if (_id === 'Rejected') result.rejected = count;
    });

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
