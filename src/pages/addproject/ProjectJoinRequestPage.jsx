import React, { useState, useEffect} from 'react';
import { useLocation,useParams } from "react-router-dom";

const ProjectJoinRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useLocation();
    const { contextId } = state || {};
    const { id } = useParams();
    const token = localStorage.getItem("token");
    console.log(id);

    useEffect(() => {
        const fetchJoinRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/projects/projects/${id}/join-requests`, {
                method: "GET",
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch join requests');
            }
            const data = await response.json();
            setRequests(data.joinRequests || []);
        } catch (err) {
            setError('Failed to load join requests');
            console.error('Error fetching join requests:', err);
        } finally {
            setLoading(false);
        }
    };

    if (id && token) {
        fetchJoinRequests();
    }
}, [contextId, token]);
console.log(requests);

const handleJoinRequestAction = async (requestId, action) => {
    try {
        const endpoint =
            action === "accept"
                ? `http://localhost:3000/api/projects/project/${id}/accept/${requestId}`
    : `http://localhost:3000/api/projects/project/${id}/reject/${requestId}`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        if (!response.ok) {
            throw new Error(`Failed to ${action} join request`);
        }
        setRequests((prev) =>
            prev.filter((request) => request._id !== requestId)
        );
        alert(action === "accept" ? "Join request accepted" : "Join request rejected");
    } catch (err) {
        console.error(`Error handling join request: ${err.message}`);
        alert(`Failed to ${action} the join request. Please try again.`);
    }
};

if (loading) {
    return <div className="text-center text-xl text-gray-800">Loading...</div>;
}

if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
}

return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-green-200 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Join Requests</h1>
        <div className="space-y-8">
            {requests.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No join requests at the moment.</p>
            ) : (
                requests.map((request) => (
                    <div
                        key={request._id}
                        className="bg-white rounded-lg shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-16 h-16 rounded-full object-cover border-4 border-indigo-500"
                                src={`http://localhost:3000/${request.user_id.profile_picture || "default-profile.png"}`}
                                    alt={request.user_id.name || "User"}
                                    />
                                    <div className="text-center sm:text-left">
                                    <p className="text-xl font-semibold text-gray-800">{request.user_id.name || "Unknown User"}</p>
                        <p className="text-sm text-gray-600">{request.user_id.email || "No email provided"}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                <button
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
                onClick={() => handleJoinRequestAction(request.user_id._id, "accept")}
        >
            Accept
        </button>
        <button
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300"
            // onClick={() => handleJoinRequestAction(request._id, "reject")}
        >
            Reject
        </button>
    </div>
</div>
))
)}
</div>
</div>
);
};

export default ProjectJoinRequestPage;