import React from "react";
import {
  FaUsers,
  FaBookOpen,
  FaTools,
  FaShareAlt,
  FaChartLine,
  FaRegClock,
  FaRocket,
  FaTasks,
  FaShieldAlt,
} from "react-icons/fa";

const Features = () => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-gray-50 to-gray-100 text-gray-800 p-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-teal-600 mb-6">
            Discover Our Features
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Explore the tools and resources that make{" "}
            <span className="text-teal-700 font-semibold">StudySync</span> the
            ultimate study community platform. Empower your academic journey with
            these innovative features.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Cards */}
            {[
              {
                icon: <FaUsers />,
                title: "Collaboration Tools",
                description:
                    "Work seamlessly with peers on group projects and assignments.",
              },
              {
                icon: <FaBookOpen />,
                title: "Personalized Learning",
                description:
                    "Get tailored recommendations to help you grow and excel.",
              },
              {
                icon: <FaShareAlt />,
                title: "Resource Sharing",
                description:
                    "Share and access a wide range of study materials effortlessly.",
              },
              {
                icon: <FaChartLine />,
                title: "Progress Tracking",
                description:
                    "Monitor your academic journey and achieve your goals.",
              },
              {
                icon: <FaTools />,
                title: "Advanced Tools",
                description:
                    "Utilize state-of-the-art tools to enhance your productivity.",
              },
              {
                icon: <FaRegClock />,
                title: "Time Management",
                description:
                    "Stay on track with deadlines using built-in reminders.",
              },
            ].map((feature, index) => (
                <div
                    key={index}
                    className="group bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-teal-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-teal-600 text-5xl bg-teal-100 p-4 rounded-full mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 mt-16 mb-12"></div>

          {/* Upcoming Features Section */}
          <h2 className="text-4xl font-bold text-teal-600 mb-6">
            Upcoming Features
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            We're constantly working to improve your experience. Here's a sneak
            peek at what's coming soon:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Upcoming Feature Cards */}
            {[
              {
                icon: <FaRocket />,
                title: "AI-Powered Study Assistant",
                description:
                    "Get instant answers and guidance from an AI-powered assistant tailored to your learning style.",
              },
              {
                icon: <FaTasks />,
                title: "Task Automation",
                description:
                    "Automate repetitive tasks like scheduling and group coordination.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Enhanced Privacy",
                description:
                    "Advanced security features to protect your data and privacy.",
              },
              {
                icon: <FaBookOpen />,
                title: "Interactive E-Books",
                description:
                    "Access e-books with interactive annotations and quizzes.",
              },
              {
                icon: <FaUsers />,
                title: "Live Group Study",
                description:
                    "Join live study sessions with peers worldwide in real-time.",
              },
              {
                icon: <FaChartLine />,
                title: "Detailed Analytics",
                description:
                    "Track your progress with detailed insights and analytics on your learning journey.",
              },
            ].map((feature, index) => (
                <div
                    key={index}
                    className="group bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-teal-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-teal-600 text-5xl bg-teal-100 p-4 rounded-full mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Features;
