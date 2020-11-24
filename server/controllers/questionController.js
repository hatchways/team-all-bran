const Question = require('../models/Question');

module.exports = {
  create: async (req, res) => {
    const { index, url, title, difficulty, description } = req.body;

    const questionDoc = await new Question({ index, url, title, difficulty, description }).save();
    res.json(questionDoc);
  },
  getRandomQuestionByDifficulty: async (req, res) => {
    const { difficulty } = req.query;
    const count = await Question.count({ difficulty });
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne({ difficulty }).skip(random);
    res.status(200).json(question);
  }
};
