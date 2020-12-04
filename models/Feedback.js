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
    problemSolving: {
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
  experience: {
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
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
    experience,
  } = req.body;
  const userIdCreator = req.user._id;
  const interviewId = req.params.interviewId;

  try {
    const interview = await Interview.findOne({ _id: interviewId });

    let interviewUser = interview.users[0];
    let userIdReciever = interview.users[1].user._id;
    let index = 0;
    if (!interview.users[0].user.equals(userIdCreator)) {
      interviewUser = interview.users[1];
      userIdReciever = interview.users[0].user._id;
      index = 1;
    }

    const feedback = await createAndUpdateFeedback(
      performanceLevel,
      categories,
      strengths,
      improvements,
      resources,
      other,
      experience,
      userIdCreator,
      userIdReciever,
      interviewUser,
      interviewId
    );
    interview.users[index].feedback = feedback;
    await interview.save();

    return { feedback: feedback };
  } catch (err) {
    return { error: err.message };
  }
}

async function createAndUpdateFeedback(
  performanceLevel,
  categories,
  strengths,
  improvements,
  resources,
  other,
  experience,
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
  if (experience) {
    feedback.experience = experience;
  }
  feedback = await feedback.save();
  return feedback;
}

async function getFeedbackCreator(interviewId, user) {
  const interview = await Interview.findOne({ _id: interviewId }).populate(
    'users.feedback'
  );

  if (
    interview.users[0].feedback &&
    interview.users[0].feedback.feedbackCreator.equals(user._id)
  ) {
    return { feedback: interview.users[0].feedback };
  } else if (
    interview.users[1].feedback &&
    interview.users[1].feedback.feedbackCreator.equals(user._id)
  ) {
    return { feedback: interview.users[1].feedback };
  } else {
    return { error: 'Could not find feedback for user' };
  }
}

async function getFeedbackReciever(interviewId, user) {
  const interview = await Interview.findOne({ _id: interviewId }).populate(
    'users.feedback'
  );

  if (
    interview.users[0].feedback &&
    interview.users[0].feedback.feedbackReciever.equals(user._id)
  ) {
    return { feedback: interview.users[0].feedback };
  } else if (
    interview.users[1].feedback &&
    interview.users[1].feedback.feedbackReciever.equals(user._id)
  ) {
    return { feedback: interview.users[1].feedback };
  } else {
    return { error: 'Could not find feedback for user' };
  }
}

async function getFeedbackById(feedbackId, user) {
  try {
    const feedback = await Feedback.findOne({ _id: feedbackId });
    if (feedback.feedbackReciever.equals(user._id)) {
      return { feedback: feedback };
    } else {
      return { error: 'Feedback not found' };
    }
  } catch (error) {
    return { error: 'Feedback not found' };
  }
}

module.exports = {
  Feedback,
  addFeedback,
  getFeedbackCreator,
  getFeedbackReciever,
  getFeedbackById,
};
