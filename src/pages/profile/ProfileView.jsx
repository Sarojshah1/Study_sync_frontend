import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ProfileView = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const handleEditImage = () => {
    const newImage = prompt("Enter the URL of the new profile image:", profileImage);
    if (newImage) {
      setProfileImage(newImage);
    }
  };

  const [firstName] = useState("Hunter");
  const [lastName] = useState("Norton");
  const [email] = useState("hunter.norton@example.com");

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Profile</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to StudySync – your personal study companion!
      </p>

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-100 p-8 rounded-lg shadow-xl">
        {/* StudySync Section */}
        <div className="flex-1 pr-8 border-b md:border-b-0 md:border-r border-gray-300 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">StudySync</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            StudySync helps you keep track of your progress and learning goals.
            Enhance your knowledge and skills with tailored resources, and stay
            motivated on your educational journey.
          </p>
          <p className="text-sm text-gray-500 italic">
            Built with ❤️ to simplify learning.
          </p>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center justify-center px-8 mb-6 md:mb-0 relative">
          <div className="relative">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-md border-4 border-teal-600"  // Changed to teal-600
            />
            {/* Edit Icon */}
            <button
              className="absolute bottom-2 right-2 bg-gray-200 text-gray-600 p-2 rounded-full shadow hover:bg-gray-300 transition-all"
              title="Edit Profile Image"
              onClick={handleEditImage}
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 pl-8">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Details</h2>
          <div className="mb-4">
            <strong className="text-gray-700">Name:</strong>{" "}
            <span className="text-gray-600">
              {firstName} {lastName}
            </span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email:</strong>{" "}
            <span className="text-gray-600">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
