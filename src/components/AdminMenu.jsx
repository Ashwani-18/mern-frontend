import { NavLink } from "react-router-dom";
import { PlusCircle, Package, Users } from "lucide-react";

const AdminMenu = () => {
  return (
    <div className="bg-gray-50 p-0 pb-6">

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NavLink
            to="/dashboard/admin/create-category"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <PlusCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Create Category</h3>
            </div>
            <p className="text-sm text-gray-600">Add new product categories</p>
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Create Product</h3>
            </div>
            <p className="text-sm text-gray-600">Add new products to your store</p>
          </NavLink>

           <NavLink
            to="/dashboard/admin/products"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Products</h3>
            </div>
            <p className="text-sm text-gray-600">All products</p>
          </NavLink>

          <NavLink
            to="/dashboard/admin/all-orders"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Manage Orders</h3>
            </div>
            <p className="text-sm text-gray-600">View and manage All Orders</p>
          </NavLink>

          <NavLink
            to="/dashboard/admin/manage-user"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
            </div>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
