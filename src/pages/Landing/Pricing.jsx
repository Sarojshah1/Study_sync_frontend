import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-teal-600">Our Subscriptions Plans</h1>
        <p className="mt-4 text-lg">
          Affordable plans designed to suit your needs. Choose the one that fits you best!
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Basic</h3>
            <p className="text-gray-600">$9.99/month</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Access to basic features</li>
              <li>Community support</li>
              <li>1 Month</li>
            </ul>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Standard</h3>
            <p className="text-gray-600">$19.99/month</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>All Basic features</li>
              <li>Priority support</li>
              <li>6 Month</li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="text-gray-600">$29.99/month</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>All Standard features</li>
              <li>Dedicated support</li>
              <li>1 Year</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
