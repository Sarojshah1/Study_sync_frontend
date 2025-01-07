import React from "react";

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-teal-600">Our Features</h1>
        <p className="mt-4 text-lg">
          Explore the innovative tools and resources that make StudySync the ultimate study community platform.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Collaboration Tools</h3>
            <p className="text-gray-600">
              Seamlessly collaborate with peers on group projects and assignments.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">
              Get personalized recommendations to help you grow and succeed.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">Resource Sharing</h3>
            <p className="text-gray-600">
              Share and access a wide range of study materials with your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
