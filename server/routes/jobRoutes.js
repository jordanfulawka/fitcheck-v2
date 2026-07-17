const express = require('express');
const jobController = require('../controllers/jobController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF and Word documents are allowed'));
  },
});

const router = express.Router();

router
  .route('/jobs')
  .get(jobController.getAllJobs)
  .post(
    upload.fields([
      { name: 'resume', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 },
    ]),
    jobController.createJob,
  )
  .delete(jobController.deleteAllJobs);

router.route('/jobs/stats').get(jobController.getJobsByStatus);

router.route('/jobs/chart').get(jobController.getRecentJobs);

router.route('/jobs/jobsBypass').get(jobController.getAllJobsBypass);

router
  .route('/jobs/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
