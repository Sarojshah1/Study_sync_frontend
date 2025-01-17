import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const ProfileView = () => {
  const [profileData, setProfileData] = useState({
    profileImage: "https://via.placeholder.com/150",
    name: "",
    email: "",
    bio: "",
    contactNumber: "",
    address: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)

        if (response.status === 200) {
          setProfileData({
            profileImage: response.data.profile_picture,
            name: response.data.name,
            email: response.data.email,
            bio: response.data.bio,
            contactNumber: response.data.contact_number,
            address: response.data.address,
          });
        } else {
          alert(`Failed to fetch profile: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("An error occurred while fetching the profile data.");
      }
    };

    fetchProfileData();
  }, [token]);

  // Function to handle editing the profile photo
  const handleEditImage = async () => {
    const newImage = prompt("Enter the URL of the new profile image:", profileData.profileImage);
    if (newImage) {
      setIsUpdating(true); // Show updating status

      try {
        const response = await axios.put(
            "http://localhost:3000/api/users/update-profile-picture",
            { profile_picture: newImage },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
        );

        if (response.status === 200) {
          setProfileData((prevState) => ({
            ...prevState,
            profileImage: newImage,
          }));
          alert("Profile photo updated successfully!");
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error updating profile photo:", error);
        alert("An error occurred while updating the profile photo. Please try again.");
      } finally {
        setIsUpdating(false); // Reset updating status
      }
    }
  };

  return (
      <div className="bg-gradient-to-br from-teal-100 via-white to-gray-100 min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-teal-700 mb-4">Profile</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
          Welcome to <span className="font-semibold text-teal-600">StudySync</span> – your personal study companion!
          Enhance your learning journey with tailored resources and tools.
        </p>

        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl">
          {/* StudySync Section */}
          <div className="flex-1 pr-8 border-b md:border-b-0 md:border-r border-gray-300 mb-6 md:mb-0">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">StudySync</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
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
            <div className="relative group">
              {/* Profile Image */}
              <img
                  src={`http://localhost:3000/${profileData.profileImage}`}
                  alt="Profile"
                  className="w-48 h-48 rounded-full shadow-lg border-4 border-teal-500 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
              />
              {/* Edit Icon */}
              <button
                  className={`absolute bottom-4 right-4 bg-teal-500 text-white p-3 rounded-full shadow hover:bg-teal-600 transition-all ${
                      isUpdating ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  title="Edit Profile Image"
                  onClick={handleEditImage}
                  disabled={isUpdating}
              >
                <FaEdit />
              </button>
            </div>
            {isUpdating && <p className="text-sm text-gray-500 mt-2">Updating photo...</p>}
          </div>

          {/* Details Section */}
          <div className="flex-1 pl-8">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">Details</h2>
            <div className="mb-4">
              <strong className="text-gray-800">Name:</strong>{" "}
              <span className="text-gray-700">
              {profileData.name}
            </span>
            </div>
            <div className="mb-4">
              <strong className="text-gray-800">Email:</strong>{" "}
              <span className="text-gray-700">{profileData.email}</span>
            </div>
            <div className="mb-4">
              <strong className="text-gray-800">Bio:</strong>{" "}
              <span className="text-gray-700">{profileData.bio}</span>
            </div>
            <div className="mb-4">
              <strong className="text-gray-800">Contact Number:</strong>{" "}
              <span className="text-gray-700">{profileData.contactNumber}</span>
            </div>
            <div className="mb-4">
              <strong className="text-gray-800">Address:</strong>{" "}
              <span className="text-gray-700">{profileData.address}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileView;
