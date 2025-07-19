import React from 'react'
import Layout from '../components/layout/Layout'

function Contact() {
  return (
   <Layout>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
     <div className="max-w-3xl mx-auto px-4 py-12">
       <div className="text-center mb-8">
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
         <p className="text-gray-600">Have a question? We'd love to hear from you.</p>
       </div>

       <div className="bg-white p-6 rounded-lg shadow-md">
         <form className="space-y-4">
           <div>
             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
             <input
               type="text"
               id="name"
               name="name"
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
               required
             />
           </div>

           <div>
             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
             <input
               type="email"
               id="email"
               name="email"
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
               required
             />
           </div>

           <div>
             <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
             <textarea
               id="message"
               name="message"
               rows="4"
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
               required
             ></textarea>
           </div>

           <button
             type="submit"
             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
           >
             Send Message
           </button>
         </form>
       </div>
     </div>
   </div>
   </Layout>
  )
}

export default Contact