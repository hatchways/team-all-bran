const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const feedbackController = require('../controllers/feedbackController');
const passport = require('passport');

// Get all current users interviews
// GET /interviews/me
router.post('/', interviewController.cInterview);
router.patch('/:id', interviewController.endInterview);

router.put('/:id/user', interviewController.addUser);

router.put(
  '/:interviewId/feedback',
  passport.authenticate('jwt', { session: false }),
  feedbackController.createFeedback
);

router.get(
  '/:interviewId',
  passport.authenticate('jwt', { session: false }),
  feedbackController.getFeedback
);

module.exports = router;
