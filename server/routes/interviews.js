const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// Get all current users interviews
// GET /interviews/me
router.get('/me', interviewController.getMyInterviews);
router.post('/', interviewController.cInterview);

module.exports = router;
