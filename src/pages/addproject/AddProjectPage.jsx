import React, { useState } from "react";

const AddProjectPage = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(URL.createObjectURL(file)); // Preview the image after upload
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save the project data, send it to a backend, etc.)
    console.log({
      projectName,
      projectDescription,
      projectImage,
    });
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
                src={projectImage}
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
