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

router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  interviewController.getInterviewsByUserId
);

router.post(
  '/:id/start',
  passport.authenticate('jwt', { session: false }),
  interviewController.startInterview
);

router.get(
  '/:interviewId/feedback/creator',
  passport.authenticate('jwt', { session: false }),
  feedbackController.getFeedbackCreator
);

router.put(
  '/:interviewId/end',
  passport.authenticate('jwt', { session: false }),
  interviewController.endInterview
);

router.post(
  '/:id/cancel',
  passport.authenticate('jwt', { session: false }),
  interviewController.cancelInterviewById
);
module.exports = router;
