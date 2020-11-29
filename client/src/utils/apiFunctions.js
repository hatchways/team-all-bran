import api from './api';

export const getUser = () => {
  return api.get('/users');
};

export const updateUser = (id, userData) => {
  return api.put(`/users/update/${id}`, userData);
};

export const signUpUser = (formData) => {
  return api.post(`/users/register`, formData);
};

export const loginUser = (formData) => {
  return api.post('/users/login', formData);
};

export const joinInterview = (id) => {
  return api.put(`/interviews/${id}`);
};

export const createInterview = ({ id, difficulty }) => {
  return api.post(`/interviews`, { creator: id, difficulty });
};

export const addUserToInterview = ({ userId, roomId }) => {
  return api.put(`/interviews/${roomId}/user`, { userId });
};

export const addInterviewQuestions = (roomId) => {
  return api.post(`/interviews/${roomId}/start`);
};

export const logoutUser = () => {
  return api.post('/users/logout');
};

export const getInterview = (roomId) => {
  return api.get(`/interviews/${roomId}`);
};

export const getQuestion = (questionId) => {
  return api.get(`/questions/${questionId}`);
};

export const createFeedback = (interviewId, formData) => {
  return api.put(`/interviews/${interviewId}/feedback/`, formData);
};

export const getFeedbackCreator = (interviewId) => {
  return api.get(`/interviews/${interviewId}/feedback/creator`);
};

export const endInterview = (interviewId) => {
  return api.put(`/interviews/${interviewId}/end`);
};
