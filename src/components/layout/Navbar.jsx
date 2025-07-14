import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import SearchInput from '../SearchInput';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: '' });
    localStorage.removeItem('auth');
    setIsUserMenuOpen(false);
    setIsOpen(false);
  };

  // Helper to close mobile menu on link click
  const handleMobileNav = (to) => {
    setIsOpen(false);
    navigate(to);
  };

  return (
    <nav className="bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">AishMart</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-black hover:text-gray-900">Home</Link>
            <Link to="/allProducts" className="text-black hover:text-gray-900">All Products</Link>
            {auth.user && (
              <Link
                to={auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
                className="text-black hover:text-gray-900"
              >
                Dashboard
              </Link>
            )}
            <Link to="/contact" className="text-black hover:text-gray-900">Contact</Link>
            {/* Desktop SearchInput */}
            <div className="hidden md:block ml-4"><SearchInput /></div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Cart Icon */}
            <button onClick={() => navigate("/cart")} className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                  {!auth.user ? (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                      <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Signup</Link>
                    </>
                  ) : (
                    <Link
                      onClick={handleLogout}
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-50 rounded-b-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => handleMobileNav('/')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900">Home</button>
              <button onClick={() => handleMobileNav('/allProducts')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900">All Products</button>
              <button onClick={() => handleMobileNav('/contact')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900">Contact</button>
              {auth.user && (
                <button
                  onClick={() => handleMobileNav(auth.user.role === 1 ? '/dashboard/admin' : '/dashboard/user')}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </button>
              )}
            </div>
            <div className="border-t border-blue-200 my-2" />
            {/* Mobile SearchInput */}
            <div className="px-3 py-2"><SearchInput /></div>
            <div className="flex items-center justify-between px-3 py-2">
              {/* Cart Icon */}
              <button onClick={() => handleMobileNav('/cart')} className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              {/* User Menu (mobile) */}
              {!auth.user ? (
                <>
                  <button onClick={() => handleMobileNav('/login')} className="text-gray-600 hover:text-gray-900 px-2">Login</button>
                  <button onClick={() => handleMobileNav('/signup')} className="text-gray-600 hover:text-gray-900 px-2">Signup</button>
                </>
              ) : (
                <button onClick={() => { handleLogout(); handleMobileNav('/login'); }} className="text-gray-600 hover:text-gray-900 px-2">Logout</button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
