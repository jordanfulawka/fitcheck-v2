const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router
  .route('/jobs')
  .get(jobController.getAllJobs)
  .post(jobController.createJob)
  .delete(jobController.deleteAllJobs);

router.route('/jobs/stats').get(jobController.getJobsByStatus);

router.route('/jobs/chart').get(jobController.getRecentJobs);

router
  .route('/jobs/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
