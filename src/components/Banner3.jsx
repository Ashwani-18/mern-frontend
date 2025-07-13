import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();

  const getProducts = async () => {
    try {
      const { data } = await api.get("/api/v1/product/get-4-products");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching top 4 products:", error);
    }
  };

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded shadow p-3 flex flex-col items-center"
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-base font-semibold text-gray-800 mb-1">{p.name}</h3>
              <p className="text-xs text-gray-600 mb-2">
                {p.description.substring(0, 40)}...
              </p>
              <span className="text-green-600 font-bold mb-2">₹ {p.price}</span>
              <Link
                to={`/product/${p.slug}`}
                className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </Link>
              <button
                className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                onClick={() => handleAddToCart(p._id)}
                disabled={p.quantity === 0}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;

