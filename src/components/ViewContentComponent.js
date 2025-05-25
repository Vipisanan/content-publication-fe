import React from "react";

export default function ViewContentComponent({ content, user }) {
  // content should have: id, writerId, title, details, categoryNames, etc.
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
      <div className="mb-2 text-gray-600">
        <span>Writer: {user?.profile?.displayName}</span>
      </div>
      {content.categoryNames && (
        <div className="mb-3">
          Categories:{" "}
          {content.categoryNames.map((cat) => (
            <span
              key={cat}
              className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2 text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      )}
      <div className="prose max-w-none">{content.details}</div>
    </div>
  );
}
