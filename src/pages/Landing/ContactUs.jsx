import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white via-blue-600 to-blue-400 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl text-teal-600 font-bold mb-6">How Can We Help You?</h1>
          <p className="text-lg text-black">
            Got questions or need assistance? Feel free to reach out—we’re here to help!
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <FaEnvelope className="text-4xl bg-white text-teal-600 p-3 rounded-full shadow-lg" />
            <h3 className="text-xl font-semibold text-teal-600">Email Us</h3>
            <p className="text-black">support@studysync.com</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <FaPhone className="text-4xl bg-white text-teal-600 p-3 rounded-full shadow-lg" />
            <h3 className="text-xl font-semibold text-teal-600">Call Us</h3>
            <p className="text-black">+1 234 567 890</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <FaMapMarkerAlt className="text-4xl bg-white text-teal-600 p-3 rounded-full shadow-lg" />
            <h3 className="text-xl font-semibold text-teal-600">Visit Us</h3>
            <p className="text-black">Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-teal-600 p-8 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
              />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your email"
              />
            </div>
            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write your message here"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
