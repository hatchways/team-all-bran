const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController"); // import controller

// GET /interviews/
router.get("/", interviewController.getUserInterviews);

module.exports = router;
