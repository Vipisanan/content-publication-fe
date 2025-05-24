import React from "react";

export default function CategoryListComponent({
  categories,
  onToggleSubscription,
}) {
  if (!categories || categories.length === 0)
    return <div>No categories found.</div>;

  return (
    <ul className="divide-y border rounded">
      {categories.map((cat) => {
        return (
          <li
            key={cat.id}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="font-medium">{cat.name}</span>
            <button
              className={`px-3 py-1 rounded text-white ${
                cat.subscribed ? "bg-red-600" : "bg-green-600"
              }`}
              onClick={() => onToggleSubscription(cat.id, cat.subscribed)}
            >
              {cat.subscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
