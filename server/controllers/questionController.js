const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');

module.exports = {
  create: async (req, res) => {
    const { title, difficulty } = req.body;

    const questionDoc = await new Question({ title, difficulty }).save();
    res.json(questionDoc);
  },
};
