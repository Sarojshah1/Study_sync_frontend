import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold text-white">StudySync</h2>
            <p className="mt-4 text-sm">
              Empowering students and educators with tools for seamless project collaboration,
              effective learning, and growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
            <li>
                <Link to="/about" className="hover:underline hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
              <Link to="/features" className="hover:underline hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:underline hover:text-white transition">
                  Subscription
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="mt-4 text-sm">
              Have a question? Feel free to reach out to us!
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="mailto:info@studysync.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-blue-400 transition"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-pink-500 transition"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-blue-700 transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm">
          <p>© {new Date().getFullYear()} StudySync. All rights reserved.</p>
          <div className="space-x-4 mt-4 sm:mt-0">
            <a href="/terms" className="hover:underline hover:text-white transition">
              Terms of Use
            </a>
            <a href="/privacy" className="hover:underline hover:text-white transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
