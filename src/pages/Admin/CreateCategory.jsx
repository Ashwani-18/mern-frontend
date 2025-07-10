import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        const { data } = await axios.put(
          `/api/v1/category/update-category/${selected._id}`,
          { name },
          { headers: { Authorization: `Bearer ${auth?.token}` } }
        );
        if (data.success) {
          toast.success("Category updated");
          setSelected(null);
          setName("");
          getAllCategories();
        }
      } else {
        const { data } = await axios.post(
          "/api/v1/category/create-category",
          { name },
          { headers: { Authorization: `Bearer ${auth?.token}` } }
        );
        if (data.success) {
          toast.success("Category created");
          setName("");
          getAllCategories();
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data.success) {
        toast.success("Category deleted");
        getAllCategories();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-4">
          <AdminMenu />
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-xl font-bold text-center mb-4">Manage Categories</h1>

          {/* Category Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded w-full"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {selected ? "Update" : "Create"}
            </button>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setName("");
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </form>

          {/* Category Table */}
          <div className="overflow-x-auto">
            {categories.length > 0 ? (
              <table className="w-full text-left border border-gray-200">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 text-sm">
                      <td className="p-3 border">{c.name}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => {
                            setSelected(c);
                            setName(c.name);
                          }}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
