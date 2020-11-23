const codeController = require('../controllers/codeController');
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  codeController.executeCode
);

module.exports = router;
