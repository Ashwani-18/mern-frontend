// Configuration for different environments
const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    razorpayKey: 'rzp_test_dummy'
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://ecommerce-backend-woad-iota.vercel.app',
    razorpayKey: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummy'
  }
};

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

export default currentConfig; 