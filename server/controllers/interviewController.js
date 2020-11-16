const mongoose = require('mongoose');
const interviewModel = require('../models/Interview');
const Interview = mongoose.model('Interview');

const { secretKey } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

// function getUserInterviews(req, res) {
//   const id = jwt.verify(req.cookies.token, secretKey).user._id;

//   //Return user interviews here
//   User.findById(id).then((data) => {
//     if (data.error) {
//       res.status(400).json({ error: data.error });
//     }
//     res.status(200).json({ response: data.interviews });
//   });
// }

// module.exports = { getUserInterviews };

module.exports = {
  getMyInterviews: async (req, res) => {
    const user = await interviewModel.getUserInterviews(req, res);
    console.log(user);
    res.send(user);
  },
  cInterview: async (req, res) => {
    const interview = await interviewModel.createInterview(req);
    res.send({ interview });
  },
  endInterview: async (req, res) => {
    const id = req.params.id;
    const interviewDoc = await Interview.findById(id);
    interviewDoc.endTime = Math.floor(Date.now() / 1000);
    await interviewDoc.save(); // what constitutes a completed interview?
    res.json(interviewDoc); // Feedback submitted? Review period ended?
  },
};
