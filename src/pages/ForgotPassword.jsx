import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forget", {
        email,
        answer,
        newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your registered email"
              />
            </div>
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                Security Question Answer
              </label>
              <input
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Who is your favorite athlete?"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your new password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
