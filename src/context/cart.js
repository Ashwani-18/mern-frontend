// context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/v1/cart/user-cart'); // Backend returns user-specific cart
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
