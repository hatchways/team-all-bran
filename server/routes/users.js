const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // import controller
const auth = require('../config/auth');
const passport = require('../config/passport');

// POST /users/register
router.post('/register', userController.register);

// POST /users/login
router.post('/login', userController.login);

router.get('/', auth);

module.exports = router;
