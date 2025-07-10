// // import React, { useState } from 'react';
// // import Category from '../components/Category';
// // import Footer from './Footer';
// // import Carosal from '../components/Carosal';

// // // function Home() {
// // //   const [currentSlide, setCurrentSlide] = useState(0);

// // //   const nextSlide = () => {
// // //     setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
// // //   };

// // //   const prevSlide = () => {
// // //     setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
// // //   };

// // //   return (
// // //     <>
// // //     <div className="relative w-full h-[650px] overflow-hidden">
// // //       {/* Slider container */}
// // //       <div
// // //         className="flex transition-transform duration-300 ease-linear"
// // //         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// // //       >
// // //         {/* Slide 1 */}
// // //         <div className="min-w-full h-[650px] relative">
// // //           <img
// // //             src="/Assets/banner1.jpg"
// // //             alt="Fashion Collection"
// // //             className="w-full h-full object-cover"
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
// // //             <div className="text-white max-w-2xl ml-20">
// // //               <h2 className="text-5xl font-bold mb-6">Summer Collection 2025</h2>
// // //               <p className="text-2xl mb-8">
// // //                 Discover the latest trends in fashion with our exclusive summer collection
// // //               </p>
// // //               <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
// // //                 Shop Now
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Slide 2 */}
// // //         <div className="min-w-full h-[650px] relative">
// // //           <img
// // //             src="/Assets/banner2.jpg"
// // //             alt="Electronics"
// // //             className="w-full h-full object-cover"
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
// // //             <div className="text-white max-w-2xl ml-20">
// // //               <h2 className="text-5xl font-bold mb-6">Tech Essentials</h2>
// // //               <p className="text-2xl mb-8">
// // //                 Upgrade your digital lifestyle with our premium tech collection
// // //               </p>
// // //               <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
// // //                 Explore
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Slide 3 */}
// // //         <div className="min-w-full h-[650px] relative">
// // //           <img
// // //             src="/Assets/banner3.jpg"
// // //             alt="Home Decor"
// // //             className="w-full h-full object-cover"
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
// // //             <div className="text-white max-w-2xl ml-20">
// // //               <h2 className="text-5xl font-bold mb-6">Home Decor</h2>
// // //               <p className="text-2xl mb-8">
// // //                 Transform your living space with our curated home collection
// // //               </p>
// // //               <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
// // //                 View Collection
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Navigation arrows */}
// // //       <button
// // //         onClick={prevSlide}
// // //         className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/30 p-4 rounded-full hover:bg-white/50 transition-opacity duration-200"
// // //       >
// // //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // //         </svg>
// // //       </button>
// // //       <button
// // //         onClick={nextSlide}
// // //         className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/30 p-4 rounded-full hover:bg-white/50 transition-opacity duration-200"
// // //       >
// // //         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // //         </svg>
// // //       </button>
// // //     </div>
// // <>
// // {/* <Carosal/>
// //     <Category/>
// //     <Footer/>
// // </>
  
// // }


// // export default Home; */}


// // function Home() {
// //   return (
// //    <>
// //    <Carosal/>
// //     <Category/>
// //     <Footer/>
// //    </>
// //   )
// // }

// // export default Home
//  import Category from '../components/Category';
//  import Footer from '../components/layout/Footer'
//  import Carosal from '../components/Carosal';

// import React from 'react'
// import Showcase from '../components/Showcase';
// import TopPooducts from '../components/TopPooducts';
// import {ToastContainer} from 'react-toastify'
// import { useAuth } from '../context/auth';


// function Home() {
//   const[auth, setAuth] = useAuth()
//   return (
//     <>
//    <pre>{JSON.stringify(auth, null,4)}</pre>
//     <Carosal/>
//     <div className='main-content'>a
//         <div className='layout'>
//             <Category/>
//         </div>
//     </div>
//     <Showcase/>
//     <TopPooducts/>
//     <Footer/>
//     </>
//   )
// }

// export default Home
// Home.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Banner from "../components/Banner";
import Banner2 from "../components/Banner2"
import axios from "axios";
import Banner3 from "../components/Banner3"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <Banner />

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Browse by Category</h2>
        {categories?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate(`/category/${cat._id}`)}
                className="cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">
                      {cat.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {cat.description?.slice(0, 80) || "No description available"}
                  {cat.description?.length > 80 && "..."}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories found</p>
        )}
      </div>
      <Banner2/>
      <Banner3/>
    </Layout>
  );
};

export default Home;
