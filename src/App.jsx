import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/users/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Profile from "./pages/users/Profile";

import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProducts from "./pages/Admin/CreateProducts";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import AllProducts from "./pages/AllProducts";
import CategoryProducts from "./pages/CategoryProducts";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/users/Orders";
import AllOrders from "./pages/Admin/AllOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/category/:cid" element={<CategoryProducts />} />

          {/* Protected Cart Route */}
          <Route path="/cart" element={<PrivateRoute />}>
            <Route index element={<Cart />} />
             <Route path="orders" element={<Orders />} />
            
          </Route>

          {/* Protected User Dashboard */}
          <Route path="/dashboard/user" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            
            
          </Route>

          {/* Admin Protected Routes */}
          <Route path="/dashboard/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="create-product" element={<CreateProducts />} />
            <Route path="product/:slug" element={<UpdateProduct />} />
            <Route path="products" element={<Products />} />
            <Route path="manage-user" element={<Users />} />
            <Route path="all-orders" element={<AllOrders />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
