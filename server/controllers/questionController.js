const Question = require('../models/Question');

module.exports = {
  create: async (req, res) => {
    const { index, url, title, difficulty, description } = req.body;

    const questionDoc = await new Question({ index, url, title, difficulty, description }).save();
    res.json(questionDoc);
  },
  getRandomQuestionByDifficulty: async (req, res) => {
    const { difficulty } = req.query;

    const questions = await Question.find({ difficulty: difficulty })
    var randomIndex = Math.floor(Math.random() * questions.length);
    res.status(200).json(questions[randomIndex]);
  }
};
