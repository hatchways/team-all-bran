const feedBackModel = require('../models/Feedback');

function createFeedback(req, res) {
  let feedback = feedBackModel.addFeedback(req);
  feedback.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      res.json({ feedback: data.feedback });
    }
  });
}

function getFeedback(req, res) {
  let interviewId = req.params.interviewId;
  let feedback = feedBackModel.getFeedback(interviewId);
  feedback.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      res.json({ feedback: data.feedback });
    }
  });
}

module.exports = { createFeedback, getFeedback };
