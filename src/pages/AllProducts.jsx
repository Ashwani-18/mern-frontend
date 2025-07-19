import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { getProductImageUrl } from "../utils/imageUrl";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth(); // token from context
  const handleAddToCart = async (productId) => {
    try {
      const { data } = await api.post(
        '/api/v1/cart/add',
        { productId, quantity: 1 }
      );
      if (data.success) {
        toast.success('Added to cart!');
      } else {
        toast.error(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      toast.error('Error adding to cart');
      console.error(err);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await api.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Unauthorized. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full"
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImageUrl(p._id)}
                    alt={p.name}
                    className="object-contain h-full w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-image.jpg"; // fallback image
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 min-h-[2.5em]">
                      {p.description && p.description.length > 60
                        ? p.description.slice(0, 60) + "..."
                        : p.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        ₹ {p.price?.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          p.quantity > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span>Qty: {p.quantity}</span>
                      <span>
                        Shipping:{" "}
                        <span className={p.shipping === 1 ? "text-green-600" : "text-red-500"}>
                          {p.shipping === 1 ? "Yes" : "No"}
                        </span>
                      </span>
                    </div>
                    <button
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                      onClick={() => handleAddToCart(p._id)}
                      disabled={p.quantity === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AllProducts;
