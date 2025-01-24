import React, { useState } from "react";
import axios from "axios";

const AddProjectPage = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(file); // Keep the file for uploading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("description", projectDescription);
    if (projectImage) {
      formData.append("projectPhoto", projectImage); 
    }

    try {
      const response = await axios.post("http://localhost:3000/api/projects/projects",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
       // Do not set Content-Type manually
      );

      if (response.status === 201) {
        // const result = await response.json();
        console.log("Project added successfully:");
        alert("Project added successfully!");
        // Reset form fields after successful submission
        setProjectName("");
        setProjectDescription("");
        setProjectImage(null);
      } else {
        // console.error("Failed to add project:", response.statusText);
        alert("Failed to add project. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      <div className="bg-white min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Add New Project</h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-gray-100 p-8 rounded-lg shadow-xl"
        >
          <div className="mb-6">
            <label
                htmlFor="projectName"
                className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Project Name
            </label>
            <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
                placeholder="Enter project name"
                required
            />
          </div>

          <div className="mb-6">
            <label
                htmlFor="projectDescription"
                className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Project Description
            </label>
            <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
                placeholder="Enter project description"
                required
            />
          </div>

          <div className="mb-6">
            <label
                htmlFor="projectImage"
                className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Project Image
            </label>
            <input
                type="file"
                id="projectImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 rounded-lg border border-gray-300"
            />
            {projectImage && (
                <div className="mt-4">
                  <h3 className="text-gray-700 font-semibold">Image Preview:</h3>
                  <img
                      src={URL.createObjectURL(projectImage)}
                      alt="Project Preview"
                      className="mt-2 max-w-full h-auto rounded-lg"
                  />
                </div>
            )}
          </div>

          <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Add Project
          </button>
        </form>
      </div>
  );
};

export default AddProjectPage;
