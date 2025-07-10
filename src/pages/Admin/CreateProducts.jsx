import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth(); // ✅ Your token is here
  const navigate = useNavigate();

  // ✅ Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ✅ Create product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!auth?.token) {
        toast.error("Unauthorized. Please login again.");
        return;
      }

      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`, // ✅ Token used here
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Product creation failed");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Something went wrong while creating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-0">
        <div className="flex justify-center mb-0">
          <div className="scale-95">
            <AdminMenu />
          </div>
        </div>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Create Product
          </h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter product description"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                placeholder="Enter price"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="0"
                placeholder="Enter quantity"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Category</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Shipping</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                required
              >
                <option value="">Select shipping</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {photo && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Preview"
                    className="h-32 object-contain border rounded"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProducts;
