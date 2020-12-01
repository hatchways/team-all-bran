const questionModel = require('../models/Question');
const { Question } = questionModel;

module.exports = {
  createQuestion: async (req, res) => {
    const { index, url, title, difficulty, description } = req.body;

    const questionDoc = await new Question({
      index,
      url,
      title,
      difficulty,
      description,
    }).save();
    res.json(questionDoc);
  },
  getQuestion: async (req, res) => {
    const { questionId } = req.params;
    const question = await Question.findById(questionId);

    res.status(200).json(question);
  },
};
