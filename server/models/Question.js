const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  autoCreate: true,
};

const QuestionSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    index: Number,
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  opts
);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
