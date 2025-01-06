import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status

  const navitems = [
    { link: "Dashboard", path: "dashboard" },
    { link: "Projects", path: "projects" },
    { link: "Groups", path: "groups" },
    { link: "Contact Us", path: "contactus" },
  ];

  const handleNavLinkClick = (path) => {
    if (window.location.pathname !== `/${path}`) {
      navigate(`/${path}`);
    } else {
      window.location.reload();
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary shadow-md relative">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="StudySync" className="w-18 h-12" />
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        {navitems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavLinkClick(item.path)}
            className={`text-white hover:text-teal-200 hover:font-bold font-medium transition ${
              window.location.pathname === `/${item.path}` ? "font-bold text-teal-200" : ""
            }`}
          >
            {item.link}
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white hover:text-teal-200 focus:outline-none"
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-purple-600 shadow-lg md:hidden">
          <ul className="flex flex-col space-y-4 p-4">
            {navitems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    handleNavLinkClick(item.path);
                    setMenuOpen(false);
                  }}
                  className={`text-white block w-full text-left hover:text-teal-200 font-medium transition ${
                    window.location.pathname === `/${item.path}` ? "font-bold text-teal-200" : ""
                  }`}
                >
                  {item.link}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          // Profile Section (after login)
          <div className="relative group">
            <button
              className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white hover:shadow-lg transition transform hover:scale-105"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaUserCircle className="w-8 h-8" />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg w-40">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={() => navigate("/settings")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </li>
                <li
                  onClick={() => {
                    setIsLoggedIn(false); // Simulate logout
                    alert("Logged out");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Login and Sign Up Buttons (before login)
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-white text-teal-500 border border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white transition font-medium"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
