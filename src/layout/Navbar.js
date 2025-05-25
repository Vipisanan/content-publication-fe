import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import NotificationBellDropdown from "../components/NotificationBellWrapper";

const Navbar = () => {
  const publisher = localStorage.getItem("publisher") === "true";
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  // Use useCallback to prevent unnecessary re-subscribes
  const handleNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  useNotifications(userId, handleNotification);

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
            {/* Other icons or links */}
            <NotificationBellDropdown
              unreadNotifications={notifications}
              onSeeAll={() => navigate("/notifications")}
            />
          </li>
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
              to="/category"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Category
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
