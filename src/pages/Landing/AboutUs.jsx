import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600">About StudySync</h1>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
          A vibrant and innovative community platform for students, educators, and knowledge enthusiasts to connect, collaborate, and grow together.
        </p>
      </header>

      {/* Mission Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          To create a unified platform where individuals from diverse educational backgrounds come together to share ideas, resources, and opportunities. We aim to foster a culture of learning that is accessible, engaging, and impactful.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Who We Are</h2>
        <p className="text-gray-600">
          StudySync was founded with the vision of bridging gaps in education and fostering a community-driven approach to learning. We are a team of passionate individuals committed to making education more inclusive, collaborative, and enjoyable.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Collaborative Learning: Study groups, forums, and discussions on various topics.</li>
          <li>Resources and Tools: A vast library of study materials, e-books, and tutorials.</li>
          <li>Mentorship Opportunities: Guidance from experienced mentors in academics and beyond.</li>
          <li>Events and Workshops: Virtual workshops, webinars, and community events.</li>
        </ul>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Why Choose StudySync?</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Inclusive Community: Open to everyone, regardless of background.</li>
          <li>Personalized Experience: Tailored to your learning preferences and goals.</li>
          <li>Global Network: Collaborate with members worldwide and build connections.</li>
          <li>Continuous Growth: Evolving with user feedback and cutting-edge technology.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <footer className="text-center mt-8">
        <h3 className="text-xl font-semibold text-teal-600">Join Us Today!</h3>
        <p className="text-gray-600 mt-2">
          Become a part of our growing community and unlock endless learning opportunities.
        </p>
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-medium mt-4 hover:bg-teal-600 shadow-lg">
        <Link to="/signup" className="hover:underline hover:text-white transition">
                  Get Started
                </Link>
        </button>
      </footer>
    </div>
  );
};

export default AboutUs;
