const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  participants: [
    {
      userOne: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      userTwo: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
});

async function createInterview(req) {
  console.log('OUTPUT: createInterview -> req', req);
}

async function endInterview(req) {
  console.log('OUTPUT: endInterview -> req', req);
}

async function joinInterview(req) {
  console.log('OUTPUT: joinInterview -> req', req);
}

const Interview = mongoose.model('interviews', InterviewSchema);
module.exports = { Interview, createInterview, endInterview, joinInterview };
