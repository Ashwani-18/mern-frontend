import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import { getProductImageUrl } from '../../utils/imageUrl';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/my-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const { data } = await axios.patch(`/api/v1/order/cancel/${orderId}`, {});
      if (data.success) {
        setOrders((prev) => prev.map(order => order._id === orderId ? { ...order, status: 'cancelled' } : order));
      } else {
        alert(data.message || 'Failed to cancel order');
      }
    } catch (err) {
      alert('Error cancelling order');
      console.error(err);
    }
  };

  return (
    <Layout title="My Orders">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded shadow-sm">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Payment ID:</strong> {order.payment?.razorpay_payment_id || "N/A"}</p>
              <p><strong>Amount Paid:</strong> ₹ {order.payment?.amount || 0}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status || 'pending'}</p>
              {order.address && (
                <div className="mt-2 text-sm text-gray-700">
                  <strong>Shipping Address:</strong>
                  <div className="ml-4">
                    {order.address.street && <div>{order.address.street}</div>}
                    {order.address.city && <div>{order.address.city}</div>}
                    {order.address.state && <div>{order.address.state}</div>}
                    {order.address.zip && <div>{order.address.zip}</div>}
                    {order.address.country && <div>{order.address.country}</div>}
                  </div>
                </div>
              )}

              <div className="mt-2">
                <strong>Products:</strong>
                <ul className="list-disc ml-6">
                  {order.products.map((p, idx) => (
                    <li key={p.product?._id || idx} className="flex items-center gap-2 mb-2">
                      {p.product?._id && (
                        <img
                          src={getProductImageUrl(p.product._id)}
                          alt={p.product?.name}
                          className="w-12 h-12 object-cover rounded"
                          onError={e => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }}
                        />
                      )}
                      <span>
                        {p.product?.name || 'Deleted Product'} x {p.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {order.status !== 'cancelled' && (
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Orders;
