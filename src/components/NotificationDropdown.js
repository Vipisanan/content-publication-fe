import React, { useState, useCallback } from "react";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationDropdown({ userId }) {
  const [notifications, setNotifications] = useState([]);

  // Use useCallback to prevent unnecessary re-subscribes
  const handleNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  useNotifications(userId, handleNotification);

  return (
    <div className="notification-dropdown">
      <button>Notifications ({notifications.length})</button>
      <ul>
        {notifications.map((notif, idx) => (
          <li key={idx}>
            <b>{notif.type}</b>: {notif.message}
            <br />
            <small>{notif.createdAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
