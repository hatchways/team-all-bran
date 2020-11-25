const Question = require('../models/Question');

module.exports = {
  create: async (req, res) => {
    const { index, url, title, difficulty, description } = req.body;

    const questionDoc = await new Question({ index, url, title, difficulty, description }).save();
    res.json(questionDoc);
  }
};
