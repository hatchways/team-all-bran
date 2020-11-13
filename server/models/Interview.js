const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const InterviewSchema = new Schema({
  startTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endTime: {
    type: Date,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

async function getUserInterviews(req) {
  // return req.headers.cookie;
  const token = req.headers.cookie;
  console.log(token);
  try {
    const decoded = jwt.verify(token, 'secret');
    console.log('OUTPUT: getUserInterviews -> decoded', decoded);
    req.user = decoded.user;

    return req;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

async function createInterview(req) {
  const { creator } = req.body;
  try {
    const interview = new Interview({
      creator,
    });
    const interviewDoc = await interview.save();
    return interviewDoc.toObject();
  } catch (err) {
    console.log('OUTPUT: createInterview -> err', err);
  }
}

async function endInterview(req) {
  console.log('OUTPUT: endInterview -> req', req.body);
}

async function joinInterview(req) {
  console.log('OUTPUT: joinInterview -> req', req.body);
}

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = {
  Interview,
  createInterview,
  endInterview,
  joinInterview,
  getUserInterviews,
};
