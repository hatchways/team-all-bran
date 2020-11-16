const express = require("express");
const { route } = require(".");
const router = express.Router();
const userController = require("../controllers/userController"); // import controller
const passport = require("passport");

const { User } = require("../models/User");

// POST /users/register
router.post("/register", userController.register);

// POST /users/login
router.post("/login", userController.login);

router.put("/update/:userId", userController.editUser);

module.exports = router;
