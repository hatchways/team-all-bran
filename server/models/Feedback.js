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
    userIdReciever,
    interviewId,
  } = req.body;

  const userIdCreator = req.user._id;

  try {
    const interview = await Interview.findOne({ _id: interviewId });
    let currFeedback = '';

    if (interview.users[0].user.equals(userIdCreator)) {
      currFeedback = await createAndUpdateFeedback(
        performanceLevel,
        categories,
        strengths,
        improvements,
        resources,
        other,
        userIdCreator,
        userIdReciever,
        interview.users[0],
        interviewId
      );
      interview.users[0].feedback = currFeedback;
    } else {
      currFeedback = await createAndUpdateFeedback(
        performanceLevel,
        categories,
        strengths,
        improvements,
        resources,
        other,
        userIdCreator,
        userIdReciever,
        interview.users[1],
        interviewId
      );
      interview.users[1].feedback = currFeedback; // new user should be existing before feedback is given
    }
    await interview.save();

    return { feedback: currFeedback };
  } catch (err) {
    return { error: err.message };
  }
}

async function getFeedback(interviewId) {
  const interview = await Feedback.find({ interview: interviewId });
  return { feedback: interview };
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
  interviewUsers,
  interviewId
) {
  let feedback = '';
  if (!interviewUsers.feedback) {
    feedback = new Feedback({
      feedbackCreator: userIdCreator,
      feedbackReciever: userIdReciever,
      interview: interviewId,
    });
  } else {
    feedback = await Feedback.findOne(interviewUsers.feedback);
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
