import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import 'animate.css';

const GroupsPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Mock data for channels
  const mockChannels = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      description: "Discuss all things tech.",
      imageUrl: "https://via.placeholder.com/150",
      createdBy: "Sushant",
      createdDate: "2025-01-01",
      members: 2345,
    },
    {
      id: 2,
      name: "Book Lovers",
      description: "Share and review your favorite books.",
      imageUrl: "https://via.placeholder.com/150",
      createdBy: "Sushant",
      createdDate: "2025-01-02",
      members: 1789,
    },
    {
      id: 3,
      name: "Fitness Freaks",
      description: "Stay motivated and fit together.",
      imageUrl: "https://via.placeholder.com/150",
      createdBy: "Sushant",
      createdDate: "2025-01-03",
      members: 3250,
    },
  ];

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setChannels(mockChannels);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching channels:", error);
        setLoading(false);
      }
    };

    const checkUserStatus = () => {
      const isLoggedIn = localStorage.getItem("userToken");
      setUserLoggedIn(!!isLoggedIn);

      if (!isLoggedIn) {
        setShowModal(true);
      }
    };

    checkUserStatus();
    fetchChannels();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-b from-teal-100 to-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-12 text-center drop-shadow-md animate__animated animate__fadeIn">
        Explore Community Groups
      </h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative animate__animated animate__fadeIn">
            {/* Spinner */}
            <div className="w-24 h-24 border-8 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Pulsating Center */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          {/* Bouncing Dots */}
          <div className="mt-6 flex space-x-4">
            <span className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-200"></span>
            <span className="w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-400"></span>
          </div>
          <p className="text-teal-600 text-lg mt-4 font-semibold animate__animated animate__fadeIn">
            Loading community groups...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105 relative hover:bg-teal-50 animate__animated animate__fadeInUp"
            >
              <img
  src={channel.imageUrl}
  alt={channel.name}
  className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-teal-500 shadow-lg"
/>
              <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">{channel.name}</h2>
              <p className="text-gray-600 text-center mb-6">{channel.description}</p>

              <div className="mb-6 text-center">
                <p className="text-sm text-gray-500">
                  <strong>Created By:</strong> {channel.createdBy}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created On:</strong> {new Date(channel.createdDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                <FaUsers className="mr-2 text-teal-600" /> {channel.members} Members
              </div>

              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 w-full mb-4 text-lg font-semibold">
                Join Now
              </button>

              <div className="absolute top-2 right-2 bg-teal-100 text-teal-700 text-sm px-4 py-2 rounded-full shadow-md animate__animated animate__zoomIn">
                Popular
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">
              Join Us!
            </h2>
            <p className="text-gray-600 mb-8">
              Please create an account to access community groups.
            </p>
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 w-full mb-4 text-lg font-bold"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 w-full text-lg font-bold"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;