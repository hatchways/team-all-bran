const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // import controller

// POST /users/register
router.post('/register', userController.register);

// POST /users/login
router.post('/login', userController.login);

module.exports = router;
