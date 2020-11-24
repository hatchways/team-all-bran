const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Interview = mongoose.model('Interview');

const FeedbackSchema = new Schema({
  createdAt: Number,
  updatedAt: Number,
  performanceLevel: {
    type: Number,
  },
  categories: {
    communication: {
      type: Number,
    },
    codeEfficiency: {
      type: Number,
    },
    codeOrganization: {
      type: Number,
    },
    speed: {
      type: Number,
    },
    debugging: {
      type: Number,
    },
    prolemSolving: {
      type: Number,
    },
  },
  strengths: {
    type: String,
  },
  improvements: {
    type: String,
  },
  resources: {
    type: String,
  },
  other: {
    type: String,
  },
  feedbackCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  feedbackReciever: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  interview: {
    type: Schema.Types.ObjectId,
    ref: 'Interview',
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

async function addFeedback(req) {
  const {
    performanceLevel,
    categories,
    strengths,
    improvements,
    resources,
    other,
  } = req.body;

  const userIdCreator = req.user._id;
  const interviewId = req.params.interviewId;

  try {
    const interview = await Interview.findOne({ _id: interviewId });
    let currFeedback = '';

    let interviewUser = interview.users[0];
    let userIdReciever = interview.users[1].user._id;
    if (!interview.users[0].user.equals(userIdCreator)) {
      interviewUser = interview.users[1];
      userIdReciever = interview.users[0].user._id;
    }

    currFeedback = await createAndUpdateFeedback(
      performanceLevel,
      categories,
      strengths,
      improvements,
      resources,
      other,
      userIdCreator,
      userIdReciever,
      interviewUser,
      interviewId
    );
    interview.users.feedback = currFeedback;
    await interview.save();

    return { feedback: currFeedback };
  } catch (err) {
    return { error: err.message };
  }
}

async function getFeedback(interviewId) {
  const interview = await Interview.findOne({ _id: interviewId }).populate(
    'users.feedback'
  );
  //console.log(interview);
  return { interview: interview };
}

async function createAndUpdateFeedback(
  performanceLevel,
  categories,
  strengths,
  improvements,
  resources,
  other,
  userIdCreator,
  userIdReciever,
  interviewUser,
  interviewId
) {
  let feedback;
  if (!interviewUser.feedback) {
    feedback = new Feedback({
      feedbackCreator: userIdCreator,
      feedbackReciever: userIdReciever,
      interview: interviewId,
    });
  } else {
    feedback = await Feedback.findOne(interviewUser.feedback);
  }

  if (performanceLevel) {
    feedback.performanceLevel = performanceLevel;
  }
  if (categories) {
    feedback.categories = categories;
  }
  if (strengths) {
    feedback.strengths = strengths;
  }
  if (improvements) {
    feedback.improvements = improvements;
  }
  if (resources) {
    feedback.resources = resources;
  }
  if (other) {
    feedback.other = other;
  }
  feedback = await feedback.save();
  return feedback;
}

module.exports = {
  Feedback,
  addFeedback,
  getFeedback,
};
