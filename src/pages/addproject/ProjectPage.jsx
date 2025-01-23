import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(true); // Assume user is logged in for dummy data
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    setUserLoggedIn(false);
                    setShowModal(true);
                    setLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:3000/api/projects/projects", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:`Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await response.json();
                setProjects(data.projects || []); // Assuming the API returns an object with a "projects" array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        const checkUserStatus = () => {
            const isLoggedIn = localStorage.getItem("token");
            setUserLoggedIn(!!isLoggedIn);

            if (!isLoggedIn) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        };

        checkUserStatus();
        fetchUserProjects();
    }, [userLoggedIn]);

    const closeModal = () => {
        setShowModal(false);
        navigate("/");
    };

    const handleProjectDetails = (projectId, projectName) => {
        navigate(`/projects/${projectId}`, { state: { projectId, projectName } });
    };

    return (
        <div className="bg-gradient-to-b from-teal-100 to-gray-100 min-h-screen p-6">
            <h1 className="text-4xl font-extrabold text-teal-600 mb-12 text-center drop-shadow-md animate_animated animate_fadeIn">
                My Projects
            </h1>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="relative animate_animated animate_fadeIn">
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
                    <p className="text-teal-600 text-lg mt-4 font-semibold animate_animated animate_fadeIn">
                        Loading your projects...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            // onClick={() => handleProjectDetails(project._id, project.project_name)}
                            className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105 relative hover:bg-teal-50 animate_animated animate_fadeInUp"
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
                <strong>Created On:</strong> {new Date(project.created_at).toLocaleDateString()}
        </p>
</div>
    <button
        className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 w-full mb-4 text-lg font-semibold"
        onClick={() => {}}
    >
        Join Now
    </button>

    <div className="absolute top-2 right-2 bg-teal-100 text-teal-700 text-sm px-4 py-2 rounded-full shadow-md animate_animated animate_zoomIn">
        Popular
    </div>
</div>


))}
</div>
)}

{showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate_animated animate_fadeIn">
        <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Join Us!</h2>
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

export default ProjectsPage;