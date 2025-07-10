import React from 'react';

const Banner2 = () => {
  return (
    <section className="w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-[220px] md:min-h-[280px] py-10 px-4">
      <div className="w-full max-w-3xl rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 flex flex-col items-center justify-center py-8 px-6">
        <span className="mb-4 inline-block px-4 py-1 rounded-full bg-red-500 text-white text-xs font-bold tracking-widest uppercase shadow">
          Sale Live Now!
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center mb-2">
          <span className="text-blue-400">Welcome</span> to Your Next <span className="text-blue-400">Ecommerce</span> Experience
        </h1>
        <p className="text-gray-300 text-center text-base md:text-lg max-w-xl mb-4">
          Shop the latest trends, enjoy fast delivery, and experience hassle-free returns—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
         
        </div>
      </div>
    </section>
  );
};

export default Banner2;








