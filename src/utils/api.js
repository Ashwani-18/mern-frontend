// API configuration utility
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mern-backend-4dux.onrender.com';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout on token expiry
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios; 