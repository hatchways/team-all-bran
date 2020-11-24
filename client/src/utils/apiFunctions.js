import api from './api';

export const getUser = () => {
  return api.get('/users');
};

export const updateUser = (id) => {
  return api.put(`/users/update/${id}`);
};

export const signUpUser = (formData) => {
  return api.post(`/users/register`, formData);
};

export const loginUser = (formData) => {
  return api.post('/users/login', formData);
};

export const logoutUser = () => {
  return api.post('/users/logout');
};
