import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpLogo from "../assets/LoginLogo.png";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!isAgreed) {
      toast.error("You must agree to the Terms and Policies.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.fullName);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("profile_picture", profileImage);

      const response = await axios.post("http://localhost:3000/api/user/register", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Sign Up Successful!");
      console.log("Response:", response.data);

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setProfileImage(null);
      setIsAgreed(false);
    } catch (error) {
      console.error("Error during sign up:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Sign Up Failed. Please try again.");
    }
  };

  return (
      <div className="relative h-screen bg-white overflow-hidden">
        <ToastContainer />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Section */}
            <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-teal-700 to-cyan-700 text-white p-10">
              <img src={SignUpLogo} alt="Sign Up Logo" className="w-32 h-32 mb-6 animate-bounce" />
              <h1 className="text-4xl font-extrabold">WELCOME</h1>
              <p className="mt-4 text-center max-w-xs">
                Join us today and unlock exclusive features for an amazing experience!
              </p>
            </div>

            {/* Right Section */}
            <div className="flex-1 p-8 flex flex-col justify-center items-center">
              <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-8 text-teal-600">
                  Be a member of StudySync
                </h2>
                {/* Profile Picture */}
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                        src={
                          profileImage
                              ? URL.createObjectURL(profileImage)
                              : "https://via.placeholder.com/150"
                        }
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
                  <input
                      type="file"
                      id="profile-picture-input"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                  />
                </div>

                {/* Full Name */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      required
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      required
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                  <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      required
                  />
                </div>

                {/* Terms and Policies */}
                <div className="mb-6 flex items-center">
                  <input
                      type="checkbox"
                      id="terms"
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-700 text-sm font-medium">
                    I agree to the{" "}
                    <Link to="/terms-and-policies" className="text-teal-600 underline hover:text-teal-800">
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
                <Link to="/login" className="text-teal-600 font-medium hover:underline">
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
