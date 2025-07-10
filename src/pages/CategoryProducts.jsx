import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";

const CategoryProducts = () => {
  const { cid } = useParams();
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    fetchProducts();
  }, [cid]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-center">Products in Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description?.slice(0, 60)}...</p>
              <p className="text-green-600 font-bold">₹{p.price}</p>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-40 object-contain mt-2"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
