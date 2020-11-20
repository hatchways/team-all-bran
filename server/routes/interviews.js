const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const passport = require('passport');

// Get all current users interviews
// GET /interviews/me
router.post('/', interviewController.cInterview);
// router.patch('/:id', interviewController.endInterview);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  interviewController.joinInterview
);

module.exports = router;
