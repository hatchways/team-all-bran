const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const TagSchema = new Schema(
  {
    content: {
      type: String,
      unique: true, // TODO: sanitize
    },

    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  opts
);

const Tag = mongoose.model('Tag', TagSchema);

module.exports = {
  Tag,
};
