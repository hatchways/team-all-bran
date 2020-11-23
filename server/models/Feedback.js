const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Interview = mongoose.model('Interview');

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const FeedbackSchema = new Schema(
  {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    interview: {
      type: Schema.Types.ObjectId,
      ref: 'Interview',
    },
  },
  opts
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

async function addFeedback(req) {
  const {
    performanceLevel,
    categories,
    strengths,
    improvements,
    resources,
    other,
    userId,
    interviewId,
  } = req.body;

  try {
    let newFeedback = new Feedback({
      performanceLevel: performanceLevel,
      categories: categories,
      strengths: strengths,
      improvements: improvements,
      resources: resources,
      other: other,
      user: userId,
      interview: interviewId,
    });

    const interview = await Interview.findOne({ _id: interviewId });

    newFeedback = await newFeedback.save();

    interview.feedback.push(newFeedback);
    await interview.save();

    return { feedback: newFeedback };
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = {
  Feedback,
  addFeedback,
};
