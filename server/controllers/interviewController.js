const interviewModel = require('../models/Interview');

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
};
