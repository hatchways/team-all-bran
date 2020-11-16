const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// Get all current users interviews
// GET /interviews/me
router.post('/', interviewController.cInterview);
router.patch('/:id', interviewController.endInterview);

module.exports = router;
