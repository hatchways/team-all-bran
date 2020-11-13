const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController"); // import controller

// GET /interviews/
router.post("/", interviewController.register);

module.exports = router;
