import React, { useState } from "react";

const AddGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(URL.createObjectURL(file)); // Preview the image after upload
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save the group data, send it to a backend, etc.)
    console.log({
      groupName,
      groupDescription,
      groupImage,
    });
  };

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Add New Group</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-100 p-8 rounded-lg shadow-xl"
      >
        <div className="mb-6">
          <label
            htmlFor="groupName"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300"
            placeholder="Enter group name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="groupDescription"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Group Description
          </label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300"
            placeholder="Enter group description"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="groupImage"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Group Image
          </label>
          <input
            type="file"
            id="groupImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          {groupImage && (
            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold">Image Preview:</h3>
              <img
                src={groupImage}
                alt="Group Preview"
                className="mt-2 max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Add Group
        </button>
      </form>
    </div>
  );
};

export default AddGroupPage;
