import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import api from '../utils/api';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import { getProductImageUrl } from '../utils/imageUrl';

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

  // Address validation function
  const isAddressComplete = () => {
    return (
      address.street.trim() !== '' &&
      address.city.trim() !== '' &&
      address.state.trim() !== '' &&
      address.zip.trim() !== '' &&
      address.country.trim() !== ''
    );
  };

  // Calculate address completion percentage
  const getAddressCompletionPercentage = () => {
    const fields = [address.street, address.city, address.state, address.zip, address.country];
    const filledFields = fields.filter(field => field.trim() !== '').length;
    return (filledFields / fields.length) * 100;
  };

  const handlePayment = async () => {
    // Validate address before proceeding
    if (!isAddressComplete()) {
      toast.error("Please fill in all address fields before proceeding with payment");
      return;
    }

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
      <div className="max-w-4xl mx-auto py-8 px-4" data-aos="fade-up">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={getProductImageUrl(item.product._id)}
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
                <h2 className="text-lg font-semibold mb-2 text-left">Shipping Address <span className="text-red-500">*</span></h2>
                
                {/* Address completion progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Address Completion</span>
                    <span className="text-sm font-medium text-gray-700">{Math.round(getAddressCompletionPercentage())}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getAddressCompletionPercentage()}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-left">
                  <div>
                    <input
                      type="text"
                      placeholder="Street Address *"
                      className={`border px-2 py-1 rounded w-full transition-colors ${
                        address.street.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'
                      }`}
                      value={address.street}
                      onChange={e => setAddress({ ...address, street: e.target.value })}
                      required
                    />
                    {address.street.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Street address is required</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="City *"
                      className={`border px-2 py-1 rounded w-full transition-colors ${
                        address.city.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'
                      }`}
                      value={address.city}
                      onChange={e => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                    {address.city.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">City is required</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="State/Province *"
                      className={`border px-2 py-1 rounded w-full transition-colors ${
                        address.state.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'
                      }`}
                      value={address.state}
                      onChange={e => setAddress({ ...address, state: e.target.value })}
                      required
                    />
                    {address.state.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">State is required</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Zip/Postal Code *"
                      className={`border px-2 py-1 rounded w-full transition-colors ${
                        address.zip.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'
                      }`}
                      value={address.zip}
                      onChange={e => setAddress({ ...address, zip: e.target.value })}
                      required
                    />
                    {address.zip.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Zip code is required</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Country *"
                      className={`border px-2 py-1 rounded w-full transition-colors ${
                        address.country.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'
                      }`}
                      value={address.country}
                      onChange={e => setAddress({ ...address, country: e.target.value })}
                      required
                    />
                    {address.country.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Country is required</p>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">Total: ₹ {total}</h2>
                
                {/* Address validation message */}
                {!isAddressComplete() ? (
                  <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
                    ⚠️ Please fill in all address fields to proceed with payment
                  </div>
                ) : (
                  <div className="mb-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                    ✅ Address complete! You can now proceed with payment
                  </div>
                )}
                
                <button
                  onClick={handlePayment}
                  disabled={loading || !isAddressComplete()}
                  className={`px-6 py-2 rounded font-semibold transition-all duration-200 ${
                    loading || !isAddressComplete()
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
                  }`}
                >
                  {loading ? "Processing..." : isAddressComplete() ? "Pay Now" : "Complete Address First"}
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
