import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaTasks,
  FaUsers,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";
import "animate.css";

const ProjectOverview = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { projectId } = location.state;

  useEffect(() => {
    const fetchProjectById = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/projects/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Adding static technologies for now
        setProject({
          ...data.project,
          technologies: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Socket.IO",
            "Jitsi Meet",
          ],
        });
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to fetch project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectById();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-gray-100">
        <p className="text-xl text-teal-600 font-medium animate-pulse">
          Loading project...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-gray-100">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-gray-100">
        <p className="text-xl text-gray-600 font-semibold">
          Project not found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Project Image */}
        <div className="relative">
          <img
            src={`http://localhost:3000/${project.image}`}
            alt={project.project_name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white w-full h-full flex items-center justify-center">
            <h1 className="text-5xl font-bold drop-shadow-lg uppercase tracking-wide">
              {project.project_name}
            </h1>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-10">
          {/* Description */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Statistics */}
            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
                <FaTasks className="mr-3 text-teal-600" /> Project Statistics
              </h3>
              <ul className="text-gray-700 space-y-4">
                <li className="flex items-center">
                  <FaCheckCircle className="text-teal-600 mr-3" />
                  Task Completion Rate:{" "}
                  <strong className="text-teal-800">80%</strong>
                </li>
                <li className="flex items-center">
                  <FaUsers className="text-teal-600 mr-3" />
                  Total Members:{" "}
                  <strong className="text-teal-800">
                    {project.members.length}
                  </strong>
                </li>
                <li className="flex items-center">
                  <FaTasks className="text-teal-600 mr-3" />
                  Active Tasks:{" "}
                  <strong className="text-teal-800">5</strong>
                </li>
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
                <FaCode className="mr-3 text-teal-600" /> Technologies Used
              </h3>
              <ul className="text-gray-700 space-y-4">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-teal-600 mr-3" />
                    <strong className="text-teal-800">{tech}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Members */}
            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
                <FaUsers className="mr-3 text-teal-600" /> Team Members
              </h3>
              <ul className="text-gray-700 space-y-4">
                {project.members.map((member, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={`http://localhost:3000/${member.user_id.profile_picture}`}
                      alt={member.user_id.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <strong className="text-teal-800">{member.user_id.name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t pt-6 text-center">
            <p className="text-sm text-gray-600">
              Project ID:{" "}
              <span className="font-medium text-gray-800">{projectId}</span>
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
