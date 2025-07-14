import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/auth';

function Users() {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/api/v1/auth/all-users');
        if (data.success) setUsers(data.users);
      } catch (err) {
        // Optionally handle error
      }
    };
    if (auth?.token) fetchUsers();
  }, [auth]);

  const roleBadge = (role) => (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${role === 1 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
      {role === 1 ? 'Admin' : 'User'}
    </span>
  );

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="d-flex justify-content-center">
          <AdminMenu />
        </div>
        <div className="d-flex justify-content-center">
            <div className="w-100 max-w-3xl bg-white rounded-xl shadow-lg p-6 mt-0">
              <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={user._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{roleBadge(user.role)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Users