const feedBackModel = require('../models/Feedback');

function createFeedback(req, res) {
  const feedback = feedBackModel.addFeedback(req);
  feedback.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      res.json({ feedback: data.feedback });
    }
  });
}

function getFeedback(req, res) {
  const interviewId = req.params.interviewId;
  const feedback = feedBackModel.getFeedback(interviewId);
  feedback.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      res.json({ interview: data.interview });
    }
  });
}

module.exports = { createFeedback, getFeedback };
