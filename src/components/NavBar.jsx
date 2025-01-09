import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaCaretDown, FaUser, FaProjectDiagram, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const navitems = [
    { link: "Dashboard", path: "" },
    { link: "Projects", path: "projects" },
    { link: "Groups", path: "groups" },
    { link: "Contact Us", path: "contact" },
  ];

  const handleNavLinkClick = (path) => {
    if (window.location.pathname !== `/${path}`) {
      navigate(`/${path}`);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserProfile(response.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);  // Toggle the menu when the profile section is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate("/login");
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
        {isLoggedIn && userProfile ? (
          // Profile Section (after login)
          <div className="relative flex items-center space-x-4 cursor-pointer" onClick={handleProfileClick}>
            <img
              src={`http://localhost:3000/${userProfile.profile_picture}`}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md"
            />
            <div className="text-white">
              <p className="font-semibold">{userProfile.name}</p>
              <p className="text-sm">{userProfile.email}</p>
            </div>
            {/* Dropdown Button */}
            <FaCaretDown className="text-white w-4 h-4 ml-4" />
            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute top-14 right-0 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg w-64 z-50">
                <ul className="text-sm text-gray-700">
                  <li
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <FaUser className="w-5 h-5 text-teal-500" />
                    <span>Profile</span>
                  </li>
                  <li
                    onClick={() => navigate("/groups")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <FaUsers className="w-5 h-5 text-teal-500" />
                    <span>Your Groups</span>
                  </li>
                  <li
                    onClick={() => navigate("/projects")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <FaProjectDiagram className="w-5 h-5 text-teal-500" />
                    <span>Your Projects</span>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="w-5 h-5 text-teal-500" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
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
