import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/AdminMenu';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      toast.error("Unable to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-4">
          <AdminMenu />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="relative group bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl border border-gray-200 hover:scale-[1.025] hover:shadow-2xl transition-all duration-200 overflow-hidden flex flex-col h-full">
                  {p.photo && (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="object-contain h-full w-full transition-transform duration-200 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-image.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{p.name}</h3>
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
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${p.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                      Edit
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
