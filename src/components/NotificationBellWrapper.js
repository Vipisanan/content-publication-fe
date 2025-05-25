import React, { useRef, useState, useEffect } from "react";
import NotificationBell from "./NotificationBell";

export default function NotificationBellDropdown({
  unreadNotifications = [],
  onSeeAll,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    console.log("Unread notifications:", unreadNotifications);
  }, [unreadNotifications]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <NotificationBell
        unreadNotifications={unreadNotifications}
        onClick={() => setOpen((prev) => !prev)}
      />
    </div>
  );
}
