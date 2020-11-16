const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
    },
    difficulty: {
      type: Number,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  opts
);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = {
  Question,
};
