const Job = require('../models/jobModel');

exports.getAllJobs = async (req, res) => {
  try {
    if (req.query.page) {
      const page = Number(req.query.page);
      const limit = 5;
      const skip = (page - 1) * limit;

      const [jobs, total] = await Promise.all([
        Job.find().sort('dateApplied').skip(skip).limit(limit),
        Job.countDocuments(),
      ]);

      return res.status(200).json({
        status: 'success',
        data: { jobs, page, totalPages: Math.ceil(total / limit) },
      });
    }

    const jobs = await Job.find({}).sort('dateApplied');
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
    const jobs = await Job.find();

    const result = {
      total: 0,
      applied: [],
      interviewing: [],
      offer: [],
      rejected: [],
    };

    jobs.forEach((job) => {
      result.total += 1;
      if (job.status === 'Applied') result.applied.push(job);
      if (job.status === 'Interviewing') result.interviewing.push(job);
      if (job.status === 'Offer') result.offer.push(job);
      if (job.status === 'Rejected') result.rejected.push(job);
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

exports.deleteAllJobs = async (req, res) => {
  try {
    await Job.deleteMany({});
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getRecentJobs = async (req, res) => {
  try {
    const period = req.query.period;
    const isMonthly = period === 'monthly';

    const now = new Date();
    const startDate = new Date();

    if (isMonthly) {
      startDate.setMonth(now.getMonth() - 11);
      startDate.setDate(1);
    } else {
      startDate.setDate(now.getDate() - 6);
    }

    const data = await Job.aggregate([
      {
        $match: {
          dateApplied: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: isMonthly
            ? { $dateToString: { format: '%Y-%m', date: '$dateApplied' } }
            : { $dateToString: { format: '%Y-%m-%d', date: '$dateApplied' } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const labels = [];
    if (isMonthly) {
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now);
        d.setMonth(now.getMonth() - i);
        labels.push(d.toISOString().slice(0, 7));
      }
    } else {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        labels.push(d.toISOString().slice(0, 10));
      }
    }

    const countMap = {};
    data.forEach(({ _id, count }) => {
      countMap[_id] = count;
    });

    const filled = labels.map((label) => {
      return {
        _id: label,
        count: countMap[label] || 0,
      };
    });

    res.status(200).json({
      status: 'success',
      data: {
        filled,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
