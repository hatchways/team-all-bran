const feedbackController = require('../controllers//feedbackController');
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  feedbackController.createFeedback
);

module.exports = router;
