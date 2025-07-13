import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import api from '../utils/api';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/api/v1/cart/user-cart');
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Fetch cart failed:", error);
      toast.error("Failed to load cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const { data } = await api.delete(`/api/v1/cart/remove/${productId}`);
      if (data.success) {
        toast.success("Item removed");
        fetchCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;
      await api.post(
        "/api/v1/cart/add",
        { productId, quantity: 1 }
      );
      fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      const item = cart.find(i => i.product._id === productId);
      if (!item || item.quantity <= 1) return;

      await api.post(
        '/api/v1/cart/update',
        { productId, quantity: item.quantity - 1 }
      );
      fetchCart();
    } catch (err) {
      toast.error("Error decrementing quantity");
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(
        "/api/v1/payment/create-order",
        { amount: total }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_dummy",
        amount: data.order.amount,
        currency: "INR",
        name: "My E-Commerce",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post(
              "/api/v1/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: total,
                address,
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment successful!");
              fetchCart(); // Clear cart
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
        },
        theme: {
          color: "#1e40af",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initialize payment");
    }
  };

  useEffect(() => {
    if (auth?.token) fetchCart();
  }, [auth]);

  return (
    <Layout title="Your Cart">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`/api/v1/product/product-photo/${item.product._id}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain border rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p className="text-green-600 font-bold">₹ {item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => decrementQuantity(item.product._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <div className="bg-gray-100 p-4 rounded shadow text-right">
                <h2 className="text-lg font-semibold mb-2 text-left">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-left">
                  <input
                    type="text"
                    placeholder="Street"
                    className="border px-2 py-1 rounded"
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border px-2 py-1 rounded"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="border px-2 py-1 rounded"
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="border px-2 py-1 rounded"
                    value={address.zip}
                    onChange={e => setAddress({ ...address, zip: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="border px-2 py-1 rounded"
                    value={address.country}
                    onChange={e => setAddress({ ...address, country: e.target.value })}
                    required
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">Total: ₹ {total}</h2>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
