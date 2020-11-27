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

export const logoutUser = () => {
  return api.post('/users/logout');
};

export const createFeedback = (interviewId, formData) => {
  return api.put(`/interviews/${interviewId}/feedback/`, formData);
};

export const getFeedbackCreator = (interviewId) => {
  return api.get(`/interviews/${interviewId}/feedback/creator`);
};
