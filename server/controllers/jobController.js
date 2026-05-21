const Job = require('../models/jobModel');

exports.getAllJobs = async (req, res) => {
  try {
    const filter = { userId: req.headers['x-user-email'] };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.$or = [
        { company: { $regex: req.query.search, $options: 'i' } },
        { role: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    if (req.query.page) {
      const page = Number(req.query.page);
      const limit = 5;
      const skip = (page - 1) * limit;

      const [jobs, total] = await Promise.all([
        Job.find(filter)
          .sort({ dateApplied: -1, _id: -1 })
          .skip(skip)
          .limit(limit),
        Job.countDocuments(filter),
      ]);

      return res.status(200).json({
        status: 'success',
        data: { jobs, page, totalPages: Math.ceil(total / limit) },
      });
    }

    const jobs = await Job.find(filter).sort({ dateApplied: -1, _id: -1 });
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

exports.getAllJobsBypass = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      status: 'fail',
      message: 'error fetching all jobs',
    });
  }
};

exports.getJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    userId: req.headers['x-user-email'],
  });

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
};

exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      userId: req.headers['x-user-email'],
    });
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
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.headers['x-user-email'] },
      req.body,
      {
        new: true,
      },
    );
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
    await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.headers['x-user-email'],
    });
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
    const jobs = await Job.find({ userId: req.headers['x-user-email'] });

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
          userId: req.headers['x-user-email'],
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
