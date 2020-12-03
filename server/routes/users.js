const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // import controller
const passport = require('passport');

const { User } = require('../models/User');
const upload = require('../services/ImageUpload');
const singleUpload = upload.single('image');

// POST /users/register
router.post('/register', userController.register);

// POST /users/login
router.post('/login', userController.login);

// POST /users/logout
router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userController.logout
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.put(
  '/update/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.editUser
);

router.put(
  '/profilePicture',
  passport.authenticate('jwt', { session: false }),
  userController.updateProfilePic
);

module.exports = router;
