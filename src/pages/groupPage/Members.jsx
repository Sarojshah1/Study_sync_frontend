import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const MembersPage = () => {
  const [members, setMembers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { state } = useLocation();
  const { contextId } = state || {};
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/studyGroup/groups/${contextId}/members`,{
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json()) 
        .then((data) => {setMembers(data.members)
            console.log(data.members)
        }).catch((err) => console.error("Error fetching messages:", err));
        console.log(response)
    
      } catch (err) {
        setError('Failed to load members');
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchMembers();
  }, []);


  // Display loading state or error if they exist
  if (loading) {
    return <div className="text-center text-xl text-gray-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }
  console.log(members)

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-12">Meet Our Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 w-full max-w-screen-xl">
        {members.map((member) => (
          <div
            key={member.user_id }
            className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 p-6 flex flex-col items-center text-center"
          >
            <img
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-500 shadow-lg"
              src={`http://localhost:3000/${member.user_id.profile_picture}`}
              alt={member.user_id.name}
            />
            <p className="text-xl font-semibold text-gray-800 mb-2">{member.user_id.name}</p>
            <p className="text-gray-600 text-sm">Member</p>
            <div className="mt-4">
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                onClick={() => alert(`Viewing profile of ${member.user_id.name}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
