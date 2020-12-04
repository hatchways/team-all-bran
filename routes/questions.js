const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/:questionId', questionController.getQuestion);

router.post('/', questionController.createQuestion);

module.exports = router;
