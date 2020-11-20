import axios from 'axios';

const api = axios.create({
  url: 'http://localhost:3000',
  withCredentials: true,
});
export default api;
