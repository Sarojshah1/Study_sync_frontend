import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/LoginLogo.png";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API
      const response = await axios.post("http://localhost:3000/api/otp", { email });
      // Update the UI based on the response
      setMessage(response.data.message || "Reset link sent successfully!");
      setError(""); // Clear any previous error messages
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div
          className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ minHeight: "28rem" }}
        >
          {/* Left Section */}
          <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-teal-700 to-cyan-700 text-white p-10">
            <img
              src={logo}
              alt="Reset Password Logo"
              className="w-32 h-32 mb-6 animate-bounce"
            />
            <h1 className="text-4xl font-extrabold">RESET PASSWORD</h1>
            <p className="mt-4 text-center max-w-xs">
              Enter your email address to receive instructions on how to reset
              your password.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-8 flex flex-col justify-center items-center">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-center mb-8 text-teal-600">
                Forgot Your Password?
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                Send Reset Link
              </button>
            </form>

            {/* Success Message */}
            {message && (
              <p className="text-green-600 mt-4 font-medium">{message}</p>
            )}

            {/* Error Message */}
            {error && (
              <p className="text-red-600 mt-4 font-medium">{error}</p>
            )}

            <p className="text-gray-600 mt-6">
              Remembered your password?{" "}
              <a href="/login" className="text-teal-600 font-medium hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;