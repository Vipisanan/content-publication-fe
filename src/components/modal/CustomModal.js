import React from "react";

const typeStyles = {
  danger: {
    icon: (
      <svg
        className="w-7 h-7 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M6.938 17h10.124c1.054 0 1.918-.816 1.995-1.869l.7-9.8A2 2 0 0017.76 3H6.24a2 2 0 00-1.997 2.331l.7 9.8A2 2 0 006.938 17z"
        />
      </svg>
    ),
    confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
    cancelBtn: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  },
  info: {
    icon: (
      <svg
        className="w-7 h-7 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 8v.01"
        />
      </svg>
    ),
    confirmBtn: "bg-blue-600 hover:bg-blue-700 text-white",
    cancelBtn: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  },
  success: {
    icon: (
      <svg
        className="w-7 h-7 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    confirmBtn: "bg-green-600 hover:bg-green-700 text-white",
    cancelBtn: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  },
};

export default function CustomModal({
  open,
  type = "info",
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = true,
  loading = false,
}) {
  if (!open) return null;
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <div className="flex items-center gap-3 mb-2">
          {styles.icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          {showCancel && (
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded transition ${styles.cancelBtn}`}
              disabled={loading}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded transition ${styles.confirmBtn}`}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
