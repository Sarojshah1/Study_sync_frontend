import React from "react";
import { FaCheckCircle, FaChalkboardTeacher, FaProjectDiagram, FaUsers, FaChartLine, FaCogs } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
     <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/your-background-image.jpg)' }}></div>
  <div className="max-w-7xl mx-auto px-4 py-32 text-center relative z-10">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-shadow-lg">
      Empower Collaboration with <span className="text-yellow-300">StudySync</span>
    </h1>
    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
      Your ultimate platform for seamless project management, group study, and efficient learning.
    </p>
    <div className="mt-6 space-x-4 flex justify-center">
      <a
        href="/signup"
        className="bg-yellow-300 text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-400 transition duration-300 transform hover:scale-105 shadow-lg"
      >
        Get Started
      </a>
      <a
        href="/features"
        className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
      >
        Learn More
      </a>
    </div>
  </div>
</header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose StudySync?</h2>
          <p className="text-center text-gray-600 mt-4">
            Designed for students, educators, and institutions to maximize productivity and collaboration.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <FaProjectDiagram className="text-blue-500 w-12 h-12 mx-auto" />
              <h3 className="mt-4 font-bold text-lg">Efficient Project Management</h3>
              <p className="mt-2 text-sm text-gray-600">
                Organize and track project progress with ease using our intuitive tools.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <FaUsers className="text-purple-500 w-12 h-12 mx-auto" />
              <h3 className="mt-4 font-bold text-lg">Group Collaboration</h3>
              <p className="mt-2 text-sm text-gray-600">
                Work with your peers in study groups and project teams seamlessly.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <FaCogs className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="mt-4 font-bold text-lg">Customizable Workflows</h3>
              <p className="mt-2 text-sm text-gray-600">
                Tailor workflows to match your project needs and optimize productivity.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <FaChartLine className="text-yellow-500 w-12 h-12 mx-auto" />
              <h3 className="mt-4 font-bold text-lg">Advanced Analytics</h3>
              <p className="mt-2 text-sm text-gray-600">
                Gain insights into performance and progress with powerful analytics tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<section className="py-16 bg-blue-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800">What Our Users Say</h2>
    <p className="text-center text-gray-600 mt-4 text-lg">
      See how StudySync is helping students, educators, and institutions across the globe. Our users are thriving with seamless project management, collaboration, and learning.
    </p>
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "StudySync transformed the way we manage group projects. It's a game-changer for students!"
        </p>
        <h3 className="mt-4 font-bold text-lg">— Sarah, Student</h3>
        <div className="mt-2 text-gray-500">University of ABC</div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "As a teacher, I can monitor student progress effectively and guide them better with StudySync. The group study tools are invaluable!"
        </p>
        <h3 className="mt-4 font-bold text-lg">— Mr. John, Educator</h3>
        <div className="mt-2 text-gray-500">XYZ High School</div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "The collaboration tools are amazing. It helps our institution streamline project timelines and improves team productivity."
        </p>
        <h3 className="mt-4 font-bold text-lg">— Dr. Smith, Principal</h3>
        <div className="mt-2 text-gray-500">Global Tech Institute</div>
      </div>
      {/* Additional Testimonial */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "StudySync has made group project management so easy. With all the tools in one platform, the process is so much more organized and efficient."
        </p>
        <h3 className="mt-4 font-bold text-lg">— Emily, Student</h3>
        <div className="mt-2 text-gray-500">College of Engineering</div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "As a teacher, being able to easily communicate with students and monitor their progress has made my work a lot easier and more rewarding."
        </p>
        <h3 className="mt-4 font-bold text-lg">— Mr. Alex, Lecturer</h3>
        <div className="mt-2 text-gray-500">University of Science</div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600 italic">
          "I can manage projects better, stay on top of deadlines, and collaborate with my peers seamlessly. StudySync is a must-have for students!"
        </p>
        <h3 className="mt-4 font-bold text-lg">— Jake, Student</h3>
        <div className="mt-2 text-gray-500">Elite Academy</div>
      </div>
    </div>
  </div>
</section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">
            Ready to Supercharge Your Learning and Collaboration?
          </h2>
          <p className="mt-4 text-lg">
            Join thousands of students and educators already using StudySync!
          </p>
          <div className="mt-6">
            <a
              href="/signup"
              className="bg-yellow-300 text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-yellow-400 transition"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
