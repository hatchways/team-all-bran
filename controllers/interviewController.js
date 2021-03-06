const mongoose = require('mongoose');
const interviewModel = require('../models/Interview');

const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');
const { Interview } = require('../models/Interview');

const cInterview = async (req, res) => {
  const interview = await interviewModel.createInterview(req);

  if (interview.error) {
    res.status(400).json({ error: interview.error });
  } else {
    res.send({ interview });
  }
};

const endInterview = async (req, res) => {
  const { interviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(interviewId))
    res.status(400).json({ msg: 'Invalid ID' });

  const interview = await interviewModel.endInterview(interviewId);

  if (interview.error) {
    res.json({ error: interview.error });
  } else {
    res.json(interview);
  }
};

const addUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ msg: 'Invalid ID' });

  const interview = await interviewModel.addUserToInterview(req);
  res.send({ interview });
};

async function getInterview(req, res) {
  const interviewId = req.params.interviewId;
  const interview = await interviewModel.getInterview(interviewId);
  if (interview.error) {
    res.status(400).json({ error: interview.error });
  } else {
    res.json(interview);
  }
}

const startInterview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ msg: 'Invalid ID' });

  const interview = await interviewModel.addInterviewQuestions(id);

  if (interview.error) {
    res.status(400).json({ error: interview.error });
  } else {
    res.json(interview);
  }
};

const getInterviewsByUserId = async (req, res) => {
  const email = req.user.email;
  const id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ msg: 'Invalid ID' });

  const interviews = (await User.findOne({ email }).populate('interviews'))
    .interviews;

  if (interviews.error) {
    res.status(400).json({ error: interviews.error });
  } else {
    res.json(interviews);
  }
};

const cancelInterviewById = async (req, res) => {
  const { id } = req.params;
  const interviews = await Interview.findByIdAndDelete(id);
  res.json(interviews);
};

const getQuestionFromInterview = async (req, res) => {
  const { questionId, interviewId } = req.params;
  const question = await interviewModel.getQuestionFromInterview(
    questionId,
    interviewId,
    req.user
  );
  if (question.error) {
    res.status(404).json({ error: question.error });
  } else {
    res.json(question);
  }
};

module.exports = {
  cInterview,
  endInterview,
  addUser,
  getInterview,
  startInterview,
  getInterviewsByUserId,
  cancelInterviewById,
  getQuestionFromInterview,
};
