// Utility function to generate correct product image URLs
const BACKEND_URL = process.env.REACT_APP_API_URL || 'https://mern-backend-4dux.onrender.com';

export const getProductImageUrl = (productId) => {
  return `${BACKEND_URL}/api/v1/product/product-photo/${productId}`;
}; 