import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-teal-400 text-white text-center">
      <h1 className="text-9xl font-bold drop-shadow-lg mb-4 animate-bounce">404</h1>
      <p className="text-xl md:text-2xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-white text-teal-500 font-semibold rounded-md shadow-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
