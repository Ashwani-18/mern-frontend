import React from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'

// function Dashboard() {
//   return (
//     <Layout>
//       <div className="flex flex-col items-center mt-8">
//         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//         <Link to="/dashboard/user/profile" className="mb-4">
//           <div className="bg-blue-200 rounded-full w-20 h-20 flex items-center justify-center hover:bg-blue-300 transition">
//             <svg className="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//         </Link>
//         <span className="text-lg text-gray-700">View Profile</span>
//       </div>
//     </Layout>
//   )
// }
// Improved Dashboard UI with Orders Option

function Dashboard() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">User Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Profile Card */}
          <Link to="/dashboard/user/profile" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:bg-blue-50 transition">
              <div className="bg-blue-200 rounded-full w-24 h-24 flex items-center justify-center mb-4 group-hover:bg-blue-300 transition">
                <svg className="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Profile</h2>
              <p className="text-gray-500 text-center">View and edit your profile information</p>
            </div>
          </Link>
          {/* Orders Card */}
          <Link to="/cart/orders" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:bg-green-50 transition">
              <div className="bg-green-200 rounded-full w-24 h-24 flex items-center justify-center mb-4 group-hover:bg-green-300 transition">
                <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Orders</h2>
              <p className="text-gray-500 text-center">View your order history and status</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard