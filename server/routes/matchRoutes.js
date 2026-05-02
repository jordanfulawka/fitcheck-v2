const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/match')
  .post(upload.single('resume'), matchController.getMatchScore);

module.exports = router;
