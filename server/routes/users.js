const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // import controller
const auth = require('../config/auth');
//const passport = require('../config/passport');
const passport = require('passport');

// POST /users/register
router.post('/register', userController.register);

// POST /users/login
router.post('/login', userController.login);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.put(
  '/update/:userId',
  //passport.authenticate('jwt'),
  userController.editUser
);

module.exports = router;
