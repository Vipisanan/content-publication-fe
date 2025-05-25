import React, { useEffect, useState } from "react";
import CreateContentForm from "../forms/CreateContentForm";
import { fetchAllCategories } from "../api/contentService";

export default function ViewContentComponent({
  content,
  writer,
  userId,
  handleEditing,
  handleDelete,
}) {
  const [editing, setEditing] = React.useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    editing &&
      categories.length === 0 &&
      fetchAllCategories()
        .then((data) => {
          const names = (Array.isArray(data.data) ? data.data : []).map(
            (cat) => cat.name
          );
          setCategories(names);
        })
        .catch((err) => {
          console.error("Failed to fetch categories", err);
          setCategories([]);
        });
  }, [editing, categories]);

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      {content.writerId.toString() === userId && (
        <>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => handleDelete(content)}
          >
            Delete
          </button>
        </>
      )}
      {editing ? (
        <>
          <CreateContentForm
            onSubmit={handleEditing}
            categories={categories}
            initialValues={content}
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
          <div className="mb-2 text-gray-600">
            <span>Writer: {writer?.profile?.displayName}</span>
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
        </>
      )}
    </div>
  );
}
