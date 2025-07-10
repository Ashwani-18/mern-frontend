import React from 'react'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const navigate = useNavigate()
    const handleRedirect = () =>{
        navigate("/AllProducts")
    }
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Sale badge */}
        <div className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium mb-6 shadow-lg">
          <span className="mr-2">🔥</span>
          FLASH SALE - 50% Off
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Amazing
          <span className="block text-blue-400">Products</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Premium selection with excellent service and competitive prices.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shop Now
          </button>
          
          <button className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-800">
            Learn More
          </button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1 text-white">Free Shipping</h3>
            <p className="text-gray-400 text-sm">On orders over $50</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-500/30">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1 text-white">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">2-3 business days</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1 text-white">Easy Returns</h3>
            <p className="text-gray-400 text-sm">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner