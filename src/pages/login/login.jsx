import React from "react";
import LoginLogo from "../../assets/LoginLogo.png";

const Login = () => {
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
              src={LoginLogo}
              alt="Login Logo"
              className="w-32 h-32 mb-6 animate-bounce"
            />
            <h1 className="text-4xl font-extrabold">WELCOME</h1>
            <p className="mt-4 text-center max-w-xs">
              Unlock the best experience for learning and management with our
              platform.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-8 flex flex-col justify-center items-center">
            <form className="w-full max-w-sm">
              <h2 className="text-2xl font-bold text-center mb-8 text-teal-600">
                Login to Your Account
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="test@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forget"
                  className="text-teal-500 text-sm hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                Sign In
              </button>
            </form>
            <p className="text-gray-600 mt-6">
              Don't have an account?{" "}
              <a href="/register" className="text-teal-500 font-medium hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
