// Configuration for different environments
const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    razorpayKey: 'rzp_test_dummy'
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://mern-backend-4dux.onrender.com',
    razorpayKey: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummy'
  }
};

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

export default currentConfig; 