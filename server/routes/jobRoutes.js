const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router
  .route('/jobs')
  .get(jobController.getAllJobs)
  .post(jobController.createJob);

router.route('/jobs/stats').get(jobController.getJobsByStatus);

router
  .route('/jobs/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
