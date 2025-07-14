import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const user = auth?.user;

  // Form state
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    answer: user?.answer || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/api/v1/auth/profile', form);
      if (data.success) {
        toast.success('Profile updated!');
        setAuth({ ...auth, user: data.user });
        localStorage.setItem('auth', JSON.stringify({ ...auth, user: data.user }));
        setEditMode(false);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Profile">
      <div className="max-w-xl mx-auto py-10 px-4">
        <div className="flex flex-col items-center">
          <div className="bg-blue-200 rounded-full w-24 h-24 flex items-center justify-center mb-4">
            <svg className="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{user?.name || 'User'}</h2>
          <p className="text-gray-700 mb-1">Role: {user?.role === 1 ? 'Admin' : 'User'}</p>
        </div>
        <div className="mt-8 bg-white rounded shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editMode}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editMode}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Security Answer</label>
              <input
                type="text"
                name="answer"
                value={form.answer}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editMode}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editMode}
                placeholder="Leave blank to keep current password"
                minLength={6}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              {!editMode ? (
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => { setEditMode(false); setForm({ ...form, name: user?.name, email: user?.email, answer: user?.answer, password: '' }); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 