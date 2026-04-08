import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wood-art-drab.vercel.app/api',
});

// Request interceptor to add token (Institutional Access Control)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
