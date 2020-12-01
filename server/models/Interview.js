const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');
const Question = require('../models/Question');

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const InterviewSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    endTime: { type: Number },
    theme: {
      type: Schema.Types.ObjectId,
      ref: 'Theme',
      /* Can we ref Tags here? Take most used tag out
      of the questions and stick it up here and call it a theme?
      Just wondering where theme comes from */
    },
    users: [
      {
        _id: false,
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        feedback: {
          type: Schema.Types.ObjectId,
          ref: 'Feedback',
        },
        question: {
          type: Schema.Types.ObjectId,
          ref: 'Question,',
        },
      },
    ],
    difficulty: {
      type: String,
    },
  },
  opts
);

async function createInterview(req) {
  const firstUser = req.user;
  try {
    const interviewDoc = new Interview({ difficulty: req.body.difficulty });
    interviewDoc.users.push({ user: firstUser._id });
    const interviewDocObject = interviewDoc.toObject();

    await interviewDoc.save();
    firstUser.interviews.push(interviewDocObject);
    await firstUser.save();
    return interviewDoc.populate('users');
  } catch (err) {
    return err;
  }
}

async function addUserToInterview(req) {
  const { userId } = req.body;
  const interviewId = req.params.id;
  const user = await User.findOne({ _id: userId });

  try {
    const interview = await Interview.findOne({ _id: interviewId });
    const interviewDoc = await interview.save();
    interviewDoc.users.push({ user: user._id });
    const interviewDocObject = interviewDoc.toObject();

    await interviewDoc.save();
    user.interviews.push(interviewDocObject);
    await user.save();
    return interviewDoc;
  } catch (err) {
    return err;
  }
}

async function getInterview(interviewId) {
  const interview = await Interview.findOne({ _id: interviewId }).populate(
    'users.feedback users.user users.questions'
  );
  return { interview: interview };
}

async function addInterviewQuestions(id) {
  const interview = await Interview.findOne({ _id: id });
  const { difficulty } = interview;
  const questions = await getRandomQuestionsByDifficulty(difficulty);

  interview.users.forEach((user) => {
    user.question = questions.pop();
  });
  interview.save();
  return interview;
}

const getRandomQuestionsByDifficulty = async (difficulty) => {
  const count = await Question.count({ difficulty });

  const questionOne = await Question.findOne({ difficulty }).skip(
    Math.floor(Math.random() * count)
  );
  const questionTwo = await Question.findOne({ difficulty }).skip(
    Math.floor(Math.random() * count)
  );
  if (questionOne.index === questionTwo.index) {
    getRandomQuestionByDifficulty(difficulty);
  }
  return [questionOne, questionTwo];
};

const loadInterview = async (id) => {
  const interview = await Interview.findById(id).populate('users');
  return { interview };
};

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = {
  Interview,
  createInterview,
  addUserToInterview,
  getInterview,
  addInterviewQuestions,
  loadInterview,
};
