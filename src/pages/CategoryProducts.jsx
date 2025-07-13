import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const CategoryProducts = () => {
  const { cid } = useParams();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/category/${cid}/products`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error loading products by category", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        '/api/v1/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
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
    fetchProducts();
  }, [cid]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-center">Products in Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow flex flex-col h-full">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description?.slice(0, 60)}...</p>
              <p className="text-green-600 font-bold">₹{p.price}</p>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-40 object-contain mt-2"
              />
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                onClick={() => handleAddToCart(p._id)}
                disabled={p.quantity === 0}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
