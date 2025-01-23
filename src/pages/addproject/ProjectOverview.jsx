import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTasks, FaUsers, FaCheckCircle, FaBullhorn, FaSyncAlt } from "react-icons/fa";
import "animate.css";

const ProjectOverview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {projectId, projectName, description,image} = location.state;

    // Handle missing state (fallback)
    if (!projectId) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <p className="text-red-600 text-lg font-semibold mb-4">
                    No project data found. Please go back and select a project.
                </p>
                <button
                    className="px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-all duration-300"
                    onClick={() => navigate("/my-projects")}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Project Image */}
                <div className="relative">
                    <img
                        src={`http://localhost:3000/${image}`}
                        alt={projectName}
                        className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white w-full h-full flex items-center justify-center">
                        <h1 className="text-5xl font-bold drop-shadow-lg">{projectName}</h1>
                    </div>
                </div>

                {/* Project Details */}
                <div className="p-10">
                    {/* Description */}
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                        {description}
                    </p>

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Project Statistics */}
                        <div className="bg-gradient-to-br from-teal-100 to-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
                                <FaTasks className="mr-3 text-teal-600" /> Project Statistics
                            </h3>
                            <ul className="text-gray-700 space-y-4">
                                <li className="flex items-center">
                                    <FaCheckCircle className="text-teal-600 mr-3" />
                                    Task Completion Rate: <strong className="text-teal-800">80%</strong>
                                </li>
                                <li className="flex items-center">
                                    <FaUsers className="text-teal-600 mr-3" />
                                    Total Members: <strong className="text-teal-800">12</strong>
                                </li>
                                <li className="flex items-center">
                                    <FaTasks className="text-teal-600 mr-3" />
                                    Active Tasks: <strong className="text-teal-800">5</strong>
                                </li>
                            </ul>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-gradient-to-br from-gray-100 to-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
                                <FaBullhorn className="mr-3 text-teal-600" /> Recent Activity
                            </h3>
                            <ul className="text-gray-700 space-y-4">
                                <li className="flex items-center">
                                    <FaCheckCircle className="text-teal-600 mr-3" />
                                    Task <strong className="text-teal-800">"Design UI"</strong> completed
                                </li>
                                <li className="flex items-center">
                                    <FaBullhorn className="text-teal-600 mr-3" />
                                    New discussion in <strong className="text-teal-800">"Project Updates"</strong>
                                </li>
                                <li className="flex items-center">
                                    <FaSyncAlt className="text-teal-600 mr-3" />
                                    <strong className="text-teal-800">"Backend Integration"</strong> updated
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 border-t pt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Project ID: <span className="font-medium text-gray-800">{projectId}</span>
                        </p>
                        <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
