import axios from 'axios';

const API_BASE_URL = 'https://mern-backend-4dux.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ✅ Add token only if it exists and is valid
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);

    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth?.token && auth?.token !== 'undefined') {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Intercept response, but only redirect on protected pages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);

    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith('/dashboard')
    ) {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Optional: test connection
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
