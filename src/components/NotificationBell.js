import React, { useRef, useState, useEffect } from "react";

export default function NotificationBell({
  unreadNotifications = [],
  onSeeAll,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
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
      <button
        className="relative p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        type="button"
      >
        {/* Bell Icon */}
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* Red Dot Indicator */}
        {unreadNotifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border shadow-lg z-50">
          <div className="p-4 border-b font-semibold text-gray-800">
            Notifications
          </div>
          <div className="max-h-60 overflow-y-auto">
            {unreadNotifications.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">
                No new notifications
              </div>
            ) : (
              unreadNotifications.map((n, i) => (
                <div
                  key={n.id || i}
                  className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <div className="text-sm text-gray-800">{n.message}</div>
                  <div className="text-xs text-gray-400">{n.createdAt}</div>
                </div>
              ))
            )}
          </div>
          <button
            className="w-full py-2 text-blue-600 font-medium hover:bg-gray-100 rounded-b-lg"
            onClick={onSeeAll}
          >
            See all
          </button>
        </div>
      )}
    </div>
  );
}
