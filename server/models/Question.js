const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const QuestionSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  opts
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
