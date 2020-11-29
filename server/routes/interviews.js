const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const feedbackController = require('../controllers/feedbackController');
const passport = require('passport');

// Get all current users interviews
// GET /interviews/me
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  interviewController.cInterview
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  interviewController.endInterview
);

router.put(
  '/:id/user',
  passport.authenticate('jwt', { session: false }),
  interviewController.addUser
);

router.put(
  '/:interviewId/feedback',
  passport.authenticate('jwt', { session: false }),
  feedbackController.createFeedback
);

router.get(
  '/:interviewId',
  passport.authenticate('jwt', { session: false }),
  interviewController.getInterview
);

router.post(
  '/:id/start',
  passport.authenticate('jwt', { session: false }),
  interviewController.startInterview
);

module.exports = router;
