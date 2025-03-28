import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/"); // Redirect to home page after logout
  };

  const menuItems = [
    { name: "Home", path: "/home2",  }, // Home icon
    { name: "Track", path: "/Track",}, // Chart line icon
    { name: "Test", path: "/Test", }, // Test tube icon
  ];

  return (
    <nav className="bg-[#f595a8] shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/home2"
          className="text-3xl font-bold text-[#ad3559] uppercase tracking-wide"
        >
          Polysense
        </Link>

        {/* Centered Menu Items */}
        <div className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-2 text-white bg-[#cf446d] py-2 px-4 rounded-full text-lg font-semibold uppercase tracking-wide hover:bg-pink-700 hover:scale-105 transition-transform"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white bg-[#cf446d] py-2 px-4 rounded-full text-lg font-semibold uppercase tracking-wide hover:bg-pink-700 hover:scale-105 transition-transform"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-xl">👤</span> {/* User Icon */}
            <span>{localStorage.getItem("username") || "Guest"}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <Link
                to="/home2"
                onClick={() => setIsDropdownOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-pink-100 shadow-lg transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex flex-col items-center space-y-6 py-6">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 left-4 text-pink-600 focus:outline-none"
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleMobileMenu}
              className="flex items-center space-x-2 text-white bg-pink-800 py-2 px-6 rounded-full text-lg font-semibold uppercase tracking-wide hover:bg-pink-700 hover:scale-105 transition-transform"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
