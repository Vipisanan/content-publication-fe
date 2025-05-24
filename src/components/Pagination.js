import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxNumbers = 5;
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages, start + maxNumbers);
    if (end - start < maxNumbers) start = Math.max(0, end - maxNumbers);

    return Array.from({ length: end - start }, (_, idx) => start + idx);
  };

  return (
    <nav className="flex justify-center mt-6">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            className={`px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 text-gray-800 ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((num) => (
          <li key={num}>
            <button
              className={`px-3 py-1 rounded ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => onPageChange(num)}
              aria-current={currentPage === num ? "page" : undefined}
            >
              {num + 1}
            </button>
          </li>
        ))}
        {totalPages > 5 && getPageNumbers().pop() < totalPages - 1 && (
          <li>
            <span className="px-2 text-gray-500">...</span>
          </li>
        )}
        <li>
          <button
            className={`px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300 text-gray-800 ${
              currentPage === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
