import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskorbit-4b5s.onrender.com/api', // Will be proxy config in vite.config.js
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
