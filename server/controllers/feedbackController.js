const Feedback = require('../models/Feedback');
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

async function getFeedbackCreator(req, res) {
  const interviewId = req.params.interviewId;
  const feedback = await feedBackModel.getFeedbackCreator(
    interviewId,
    req.user
  );
  if (feedback.error) {
    res.status(400).json({ error: feedback.error });
  } else {
    res.json(feedback);
  }
}

async function getFeedbackReciever(req, res) {
  const interviewId = req.params.interviewId;
  const feedback = await feedBackModel.getFeedbackReciever(
    interviewId,
    req.user
  );
  if (feedback.error) {
    res.status(404).json({ error: feedback.error });
  } else {
    res.json(feedback);
  }
}

async function getFeedbackById(req, res) {
  const feedbackId = req.params.feedbackId;
  const feedback = await feedBackModel.getFeedbackById(feedbackId, req.user);
  if (feedback.error) {
    res.status(400).json({ error: feedback.error });
  } else {
    res.json(feedback);
  }
}

module.exports = {
  createFeedback,
  getFeedback,
  getFeedbackCreator,
  getFeedbackReciever,
  getFeedbackById,
};
