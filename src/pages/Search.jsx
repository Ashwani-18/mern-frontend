import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import api from "../utils/api";
import { getProductImageUrl } from "../utils/imageUrl";

const Search = () => {
  const [values] = useSearch();
  const [auth] = useAuth();
  const { fetchCart } = useCart(); // refresh cart after adding
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      if (!auth?.user || !auth?.token) {
        toast.error("Please login to add to cart");
        navigate("/login");
        return;
      }

      const res = await api.post(
        "/api/v1/cart/add",
        { productId }
      );

      if (res.data.success) {
        toast.success("Item added to cart");
        fetchCart(); // Refresh cart state globally
      } else {
        toast.error(res.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Error adding to cart");
    }
  };

  return (
    <Layout title={"Search Results"}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results</h1>
          <h6 className="text-gray-600 text-lg">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product${values?.results.length > 1 ? "s" : ""}`}
          </h6>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values?.results.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={getProductImageUrl(p._id)}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h5>
                <p className="text-gray-600 text-sm mb-2">
                  {p.description.substring(0, 60)}...
                </p>
                <p className="text-green-600 font-bold mb-4">₹ {p.price}</p>
                <div className="flex justify-between">
                  <Link
                    to={`/product/${p.slug}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    More Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p._id)}
                    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
