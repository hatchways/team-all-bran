const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

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

module.exports = {
  Feedback,
};
