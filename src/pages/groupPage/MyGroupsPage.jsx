import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import "animate.css";

const MyGroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    setUserLoggedIn(false);
                    setLoading(false);
                    return;
                }

                setUserLoggedIn(true);
                const response = await axios.get("http://localhost:3000/api/studyGroup/groups/user", {
                    headers: { Authorization:` Bearer ${token}` }});
                console.log(response);

                setGroups(response.data.groups);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user groups:", error);
                setLoading(false);
            }
        };

        fetchUserGroups();
    }, []);

    const leaveGroup = async (groupId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please log in to leave a group.");
                return;
            }

            await axios.post(
               ` http://localhost:3000/api/studyGroup/groups/${groupId}/leave`,
            {},
            { headers: { Authorization: `Bearer ${token}`} }
        );

            alert("Successfully left the group!");
            setGroups(groups.filter((group) => group._id !== groupId));
        } catch (error) {
            console.error("Error leaving group:", error);
            alert("There was an error leaving the group.");
        }
    };

    if (!userLoggedIn) {
        navigate("/login");
        return null;
    }

    const handlechats = (contextId,group_name) => {
      navigate(`/chats/${contextId}`,{ state: { contextId,group_name } }); 
    };
  

  return (
    <div className="bg-gradient-to-b from-teal-100 to-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-12 text-center drop-shadow-md animate__animated animate__fadeIn">
        My Groups
      </h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative animate__animated animate__fadeIn">
            <div className="w-24 h-24 border-8 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <span className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-200"></span>
            <span className="w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-400"></span>
          </div>
          <p className="text-teal-600 text-lg mt-4 font-semibold animate__animated animate__fadeIn">
            Loading your groups...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div
              key={group._id}
              onClick={() => handlechats(group._id,group.group_name)}
              className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105 relative hover:bg-teal-50 animate__animated animate__fadeInUp"
            >
              <img
                src={`http://localhost:3000/${group.groupPhoto}`}
                alt={group.group_name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-teal-500 shadow-lg"
              />
              <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">{group.group_name}</h2>
              <p className="text-gray-600 text-center mb-6">{group.description}</p>

              <div className="mb-6 text-center">
                <p className="text-sm text-gray-500">
                  <strong>Created By:</strong> {group.created_by.name}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created On:</strong> {new Date(group.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                <FaUsers className="mr-2 text-teal-600" /> {group.members.length || 0} Members
              </div>

              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 w-full mb-4 text-lg font-semibold"
                onClick={() => leaveGroup(group._id)}
              >
                Leave Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroupsPage;