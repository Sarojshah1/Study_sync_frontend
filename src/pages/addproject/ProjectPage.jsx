import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

const MyProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(true); // Assume user is logged in for dummy data
    const navigate = useNavigate();

    useEffect(() => {
        // Dummy data instead of an API call
        const fetchUserProjects = async () => {
            setLoading(true);

            // Simulate delay for fetching data
            setTimeout(() => {
                const dummyProjects = [
                    {
                        _id: "1",
                        name: "Project Alpha",
                        description: "An innovative project solving real-world problems.",
                        createdBy: { name: "Alice" },
                        createdAt: new Date().toISOString(),
                        photo: "dummy-image1.jpg", // Replace with a valid image path if available
                    },
                    {
                        _id: "2",
                        name: "Project Beta",
                        description: "A collaborative effort to revolutionize technology.",
                        createdBy: { name: "Bob" },
                        createdAt: new Date().toISOString(),
                        photo: "dummy-image2.jpg", // Replace with a valid image path if available
                    },
                    {
                        _id: "3",
                        name: "Project Gamma",
                        description: "Breaking barriers in modern science and engineering.",
                        createdBy: { name: "Charlie" },
                        createdAt: new Date().toISOString(),
                        photo: "dummy-image3.jpg", // Replace with a valid image path if available
                    },
                ];
                setProjects(dummyProjects);
                setLoading(false);
            }, 1000); // Simulated delay of 1 second
        };

        fetchUserProjects();
    }, []);

    const leaveProject = (projectId) => {
        alert(`Successfully left the project with ID: ${projectId}`);
        setProjects(projects.filter((project) => project._id !== projectId));
    };

    const handleProjectDetails = (projectId, projectName) => {
        navigate(`/projects/${projectId}`, { state: { projectId, projectName } });
    };

    if (!userLoggedIn) {
        navigate("/login");
        return null;
    }

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
                    <div className="mt-6 flex space-x-4">
                        <span className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></span>
                        <span className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-200"></span>
                        <span className="w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-400"></span>
                    </div>
                    <p className="text-teal-600 text-lg mt-4 font-semibold animate__animated animate__fadeIn">
                        Loading your projects...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => handleProjectDetails(project._id, project.name)}
                            className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105 relative hover:bg-teal-50 animate__animated animate__fadeInUp"
                        >
                            <img
                                src={project.photo}
                                alt={project.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-teal-600 shadow-lg"
                            />
                            <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
                                {project.name}
                            </h2>
                            <p className="text-gray-600 text-center mb-6">{project.description}</p>

                            <div className="mb-6 text-center">
                                <p className="text-sm text-gray-500">
                                    <strong>Created By:</strong> {project.createdBy.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Created On:</strong> {new Date(project.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 w-full mb-4 text-lg font-semibold"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    leaveProject(project._id);
                                }}
                            >
                                Leave Project
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProjectsPage;
