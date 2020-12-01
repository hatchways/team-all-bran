const mongoose = require('mongoose');
const interviewModel = require('../models/Interview');

const { secretKey } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');
const { Interview } = require('../models/Interview');

const cInterview = async (req, res) => {
  const interview = await interviewModel.createInterview(req);
  res.send({ interview });
};

const endInterview = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ msg: 'Invalid ID' });

  const interviewDoc = await Interview.findById(id);
  interviewDoc.endTime = Math.floor(Date.now() / 1000);
  await interviewDoc.save(); // what constitutes a completed interview?
  res.json(interviewDoc); // Feedback submitted? Review period ended?
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

  const interview = await interviewModel.addInterviewQuestions(id);

  res.json(interview);
};

const getInterviewsByUserId = async (req, res) => {
  const email = req.user.email;
  const interviews = (await User.findOne({ email }).populate('interviews'))
    .interviews;
  res.json(interviews);
};

const cancelInterviewById = async (req, res) => {
  const { id } = req.params;
  const interviews = await Interview.findByIdAndDelete(id);
  res.json(interviews);
};

module.exports = {
  cInterview,
  endInterview,
  addUser,
  getInterview,
  startInterview,
  getInterviewsByUserId,
  cancelInterviewById,
};
