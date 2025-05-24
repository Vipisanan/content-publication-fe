import React from "react";

const ContentCard = ({ content, onSeeMore }) => (
  <div className="bg-white rounded-lg shadow flex flex-col h-full border border-gray-100 hover:shadow-lg transition">
    <div className="flex-1 p-5 flex flex-col">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 truncate">
        {content.title}
      </h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {content.categoryNames?.map((cat, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded"
          >
            {cat}
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-4 flex-1">
        {content.details.slice(0, 120)}
        {content.details.length > 120 && "..."}
      </p>
      <button
        onClick={() => onSeeMore(content.id)}
        className="mt-auto self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        See More
      </button>
    </div>
    <div className="px-5 py-2 border-t text-xs text-gray-400 bg-gray-50 rounded-b-lg">
      {content.datePublished && (
        <span>
          Published: {new Date(content.datePublished).toLocaleDateString()}
        </span>
      )}
    </div>
  </div>
);

export default ContentCard;
