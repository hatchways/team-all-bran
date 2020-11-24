const feedBackModel = require('../models/Feedback');

async function createFeedback(req, res) {
  const feedback = await feedBackModel.addFeedback(req);
  if (feedback.error) {
    res.status(400).json({ error: feedback.error });
  } else {
    res.json(feedback);
  }
}

async function getFeedback(req, res) {
  const interviewId = req.params.interviewId;
  const interview = await feedBackModel.getFeedback(interviewId);
  if (interview.error) {
    res.status(400).json({ error: interview.error });
  } else {
    res.json(interview);
  }
}

module.exports = { createFeedback, getFeedback };
