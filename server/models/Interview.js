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

    feedback: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question,',
      },
    ],
  },
  opts
);

async function createInterview(req) {
  const firstUser = req.user;
  try {
    const interviewDoc = await new Interview({}).save();
    interviewDoc.users.push(firstUser);
    const interviewDocObject = interviewDoc.toObject();

    await interviewDoc.save();
    firstUser.interviews.push(interviewDocObject);
    await firstUser.save();
    return interviewDoc.populate('users');
  } catch (err) {
    return err;
  }
}

async function endInterview(req) {}

async function joinInterview(req) {}

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = { Interview, createInterview, endInterview, joinInterview };
