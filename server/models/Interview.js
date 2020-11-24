const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

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
        questions: {
          type: Schema.Types.ObjectId,
          ref: 'Question,',
        },
      },
    ],
  },
  opts
);

async function createInterview(req) {
  const { creator } = req.body;
  const firstUser = await User.findOne({ _id: creator });

  try {
    const interview = new Interview({});
    const interviewDoc = await interview.save();
    interviewDoc.users.push({ user: firstUser._id });
    const interviewDocObject = interviewDoc.toObject();

    await interviewDoc.save();
    firstUser.interviews.push(interviewDocObject);
    await firstUser.save();
    return interviewDoc;
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

async function endInterview(req) {}

async function joinInterview(req) {}

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = {
  Interview,
  createInterview,
  endInterview,
  joinInterview,
  addUserToInterview,
};
