const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const passport = require('passport');

router.get(
  '/:feedbackId/',
  passport.authenticate('jwt', { session: false }),
  feedbackController.getFeedbackById
);

module.exports = router;
