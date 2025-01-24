import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

const MyProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserProjects = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:3000/api/projects/userProjects", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Ensure the response is valid before parsing
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                // Parse JSON once
                const data = await response.json();

                // Debugging log (ensure this is removed in production)
                console.log(data);

                // Ensure the expected structure of the response
                setProjects(data.projects || []);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to fetch projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (userLoggedIn) {
            fetchUserProjects();
        }
    }, [userLoggedIn, token]);

    const handleProjectDetails = (projectId) => {
        navigate(`/projects/${projectId}/overview`, { state: { projectId} });
    };

    return (
        <div className="bg-gradient-to-b from-teal-100 to-gray-100 min-h-screen p-6">
            <h1 className="text-4xl font-extrabold text-teal-600 mb-12 text-center drop-shadow-md animate__animated animate__fadeIn">
                My Projects
            </h1>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="relative animate__animated animate__fadeIn">
                        <div className="w-24 h-24 border-8 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-10 h-10 bg-teal-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-teal-600 text-lg mt-4 font-semibold animate__animated animate__fadeIn">
                        Loading your projects...
                    </p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 font-semibold mt-8">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            onClick={() =>
                                handleProjectDetails(project._id)
                            }
                            className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105 relative hover:bg-teal-50 animate__animated animate__fadeInUp"
                        >
                            <img
                                src={`http://localhost:3000/${project.image}`} 
                                alt={project.project_name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-teal-600 shadow-lg"
                            />
                            <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
                                {project.project_name}
                            </h2>
                            <p className="text-gray-600 text-center mb-6">{project.description}</p>

                            <div className="mb-6 text-center">
                                <p className="text-sm text-gray-500">
                                    <strong>Created By:</strong> {project.created_by.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Created On:</strong>{" "}
                                    {new Date(project.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProjectsPage;
