const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Get all current users interviews
// GET /interviews/me
router.post("/", questionController.create);

module.exports = router;
