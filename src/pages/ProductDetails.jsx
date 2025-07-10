import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";

const ProductDetails = () => {
    const Params = useParams()
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-products/${Params.slug}`);
      setProduct(data?.product);
    } catch (error) {
      console.log("Error fetching product", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  return (
    <Layout title={product?.name || "Product Details"}>
      <div className="p-4 max-w-4xl mx-auto">
        {product ? (
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full md:w-1/2 rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-xl font-semibold text-green-600">
                ₹ {product.price}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
