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
    content: {
      type: String,
    },
    codingRating: {
      type: Number,
    },
    communication: {
      type: Number,
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

const Question = mongoose.model('Question', FeedbackSchema);

module.exports = {
  Question,
};
