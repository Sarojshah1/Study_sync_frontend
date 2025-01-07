import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import SignUpLogo from "../assets/LoginLogo.png";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  return (
      <div className="relative h-screen bg-white overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Section */}
            <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-teal-700 to-cyan-700 text-white p-10">
              <img
                  src={SignUpLogo}
                  alt="Sign Up Logo"
                  className="w-32 h-32 mb-6 animate-bounce"
              />
              <h1 className="text-4xl font-extrabold">WELCOME</h1>
              <p className="mt-4 text-center max-w-xs">
                Join us today and unlock exclusive features for an amazing experience!
              </p>
            </div>

            {/* Right Section */}
            <div className="flex-1 p-8 flex flex-col justify-center items-center">
              {/* Profile Picture Section */}
              <div className="relative mb-6">
                <h2 className="text-2xl font-bold text-center mb-8 text-teal-600">
                  Be a member of StudySync
                </h2>
                <div className="relative w-32 h-32 mx-auto">
                  <img
                      src={profileImage || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
                  />
                  <label
                      htmlFor="profile-picture-input"
                      className="absolute bottom-1 right-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-full shadow-lg cursor-pointer"
                  >
                    <FaEdit className="text-sm" />
                  </label>
                </div>
                {/* Hidden File Input */}
                <input
                    type="file"
                    id="profile-picture-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
              </div>

              {/* Form Section */}
              <form className="w-full max-w-sm">
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                      type="email"
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>

                {/* Checkbox */}
                <div className="mb-6 flex items-center">
                  <input
                      type="checkbox"
                      id="terms"
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label
                      htmlFor="terms"
                      className="ml-2 text-gray-700 text-sm font-medium"
                  >
                    I agree to the{" "}
                    <Link
                        to="/terms-and-policies" // Updated the path for React Router
                        className="text-teal-600 underline hover:text-teal-800"
                    >
                      Terms and Policies
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${
                        !isAgreed ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isAgreed}
                >
                  Sign Up
                </button>
              </form>

              {/* Login Link */}
              <p className="text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-teal-600 font-medium hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
