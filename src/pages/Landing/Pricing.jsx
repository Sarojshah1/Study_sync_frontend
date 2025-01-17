import React from "react";
import { FaCheckCircle, FaCrown, FaStar } from "react-icons/fa";

const Pricing = () => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-gray-50 to-gray-100 text-gray-800 p-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-teal-600 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Affordable and flexible plans designed to suit your needs. Get started
            today and make <span className="text-teal-700 font-semibold">StudySync</span> your ultimate study partner.
          </p>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Plan Details */}
            {[
              {
                title: "Basic",
                price: "रु 999",
                billing: "Per Month",
                icon: <FaStar />,
                features: [
                  "Access to basic features",
                  "Community support",
                  "1-month subscription",
                  "Email notifications",
                ],
                buttonText: "Get Started",
              },
              {
                title: "Standard",
                price: "रु 1,999",
                billing: "Per Month",
                icon: <FaCrown />,
                features: [
                  "All basic features",
                  "Priority support",
                  "6-month subscription",
                  "Access to exclusive groups",
                ],
                buttonText: "Upgrade",
                highlight: true, // Highlights this plan
              },
              {
                title: "Premium",
                price: "रु 2,999",
                billing: "Per Month",
                icon: <FaCheckCircle />,
                features: [
                  "All standard features",
                  "Dedicated support",
                  "1-year subscription",
                  "Early access to new features",
                  "Unlimited group projects",
                ],
                buttonText: "Go Premium",
              },
            ].map((plan, index) => (
                <div
                    key={index}
                    className={`${
                        plan.highlight ? "bg-teal-600 text-white" : "bg-white text-gray-800"
                    } rounded-lg shadow-lg p-8 border-2 ${
                        plan.highlight
                            ? "border-teal-600"
                            : "border-transparent hover:border-teal-500"
                    } transition-all duration-300`}
                >
                  {/* Plan Icon */}
                  <div className="flex justify-center">
                    <div
                        className={`text-5xl ${
                            plan.highlight
                                ? "bg-white text-teal-600"
                                : "bg-teal-100 text-teal-600"
                        } p-4 rounded-full mb-6`}
                    >
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan Title and Price */}
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-4xl font-extrabold mb-1">{plan.price}</p>
                  <p className="text-sm font-medium">{plan.billing}</p>

                  {/* Plan Features */}
                  <ul className="mt-6 space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <FaCheckCircle className="text-teal-600 mr-2" />
                          {feature}
                        </li>
                    ))}
                  </ul>

                  {/* Call to Action Button */}
                  <button
                      className={`mt-8 px-6 py-3 font-semibold rounded-lg ${
                          plan.highlight
                              ? "bg-white text-teal-600 hover:bg-teal-100"
                              : "bg-teal-600 text-white hover:bg-teal-700"
                      } transition-all duration-300`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
            ))}
          </div>

          {/* Additional Discounts Section */}
          <div className="mt-16 bg-teal-50 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">
              Save More with Annual Plans!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Pay for the entire year and{" "}
              <span className="font-bold">get 2 months free!</span>
            </p>
            <button className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300">
              Upgrade to Annual Plan
            </button>
          </div>
        </div>
      </div>
  );
};

export default Pricing;
