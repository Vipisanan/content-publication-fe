import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const publisher = localStorage.getItem("publisher") === "true";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("publisher");
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
          {publisher && (
            <li>
              <Link
                to="/content/new"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Publish
              </Link>
            </li>
          )}

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
