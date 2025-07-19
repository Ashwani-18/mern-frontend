import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4" data-aos="fade-up">
        {/* AdminMenu centered */}
        <div className="d-flex justify-content-center">
          <AdminMenu />
        </div>

        {/* Admin Info Card */}
        <div className="d-flex justify-content-center">
          <div className="card w-75 p-3 mt-0">
            <h3>Admin Name: {auth?.user?.name}</h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
            <h3>Admin Contact: {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
