import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';

const statusOptions = ['pending', 'shipped', 'delivered', 'cancelled'];

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/order/all');
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error('❌ Error fetching all orders:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth?.token) fetchAllOrders();
    // eslint-disable-next-line
  }, [auth]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/order/status/${orderId}`,
        { status: newStatus }
      );
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating order status');
      console.error(err);
    }
  };

  return (
    <Layout title="All Orders (Admin)">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="statusFilter" className="font-medium">Filter by status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <p>No orders found for this status.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">User Email</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Products</th>
                  <th className="p-2 border">Shipping Address</th>
                  <th className="p-2 border">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{order.user?.email || 'N/A'}</td>
                    <td className="p-2 border">₹ {order.payment?.amount || 0}</td>
                    <td className="p-2 border font-semibold">{order.status}</td>
                    <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-2 border">
                      <ul className="list-disc ml-4">
                        {order.products.map((p, idx) => (
                          <li key={p.product?._id || idx}>
                            {p.product?.name || 'Deleted Product'} x {p.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 border text-xs">
                      {order.address && (
                        <div>
                          {order.address.street && <div>{order.address.street}</div>}
                          {order.address.city && <div>{order.address.city}</div>}
                          {order.address.state && <div>{order.address.state}</div>}
                          {order.address.zip && <div>{order.address.zip}</div>}
                          {order.address.country && <div>{order.address.country}</div>}
                        </div>
                      )}
                    </td>
                    <td className="p-2 border">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border rounded px-2 py-1"
                        disabled={order.status === 'cancelled' || order.status === 'delivered'}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllOrders;
