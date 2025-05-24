import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // navigate("/login");
    window.location.href = "/login";
  };
  return (
    <nav className="bg-blue-700 px-4 py-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">ContentPub</Link>
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/content/new"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Publish
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
