import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/LoginLogo.png";

const ResetPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Extract query parameters from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const emailFromURL = queryParams.get("email");
    if (token) setResetToken(token);
    if (emailFromURL) setEmail(emailFromURL);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    try {
      // Call the API to reset the password
      const response = await axios.put("http://localhost:3000/api/user/reset-password", {
       "token": resetToken,
        "newPassword":newPassword,
      });

      // Update UI with the success message
      setMessage(response.data.message || "Password reset successfully!");
      setError("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setMessage("");
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
          style={{ minHeight: "30rem" }}
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
              Enter your new password to reset your account securely.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-8 flex flex-col justify-center items-center">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-center mb-8 text-teal-600">
                Reset Your Password
              </h2>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                Reset Password
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
              Back to{" "}
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

export default ResetPassword;