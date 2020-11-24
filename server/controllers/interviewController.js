const mongoose = require('mongoose');
const interviewModel = require('../models/Interview');

const { secretKey } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');
const { Interview } = require('../models/Interview');

module.exports = {
  cInterview: async (req, res) => {
    const interview = await interviewModel.createInterview(req);
    res.send({ interview });
  },
  endInterview: async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(400).json({ msg: 'Invalid ID' });

    const interviewDoc = await Interview.findById(id);
    interviewDoc.endTime = Math.floor(Date.now() / 1000);
    await interviewDoc.save(); // what constitutes a completed interview?
    res.json(interviewDoc); // Feedback submitted? Review period ended?
  },
  joinInterview: async (req, res) => {
    try {
      const interview = await Interview.findOne({ _id: req.params.id });
      await interview.users.push(req.user);
      await interview.save();
      await req.user.save();
      res.json({ interview });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};
