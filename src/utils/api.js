// API configuration utility
import axios from 'axios';

// Explicitly set the backend URL for deployment
const API_BASE_URL = 'https://mern-backend-4dux.onrender.com';

// Create a new axios instance with explicit configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Debug: Log the full URL being requested
    console.log('Making request to:', config.baseURL + config.url);
    
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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Auto-logout on token expiry
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Test function to verify API configuration
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_BASE_URL);
    const response = await api.get('/api/v1/product/get-4-products');
    console.log('API connection successful:', response.status);
    return true;
  } catch (error) {
    console.error('API connection failed:', error.message);
    return false;
  }
};

export default api; 