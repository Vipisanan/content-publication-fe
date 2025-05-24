import React from "react";

export default function MultiSelect({
  categories = [],
  value = [],
  onChange,
  error,
  label = "Categories",
}) {
  // Handle multi-select change
  const handleSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    onChange && onChange(selected);
  };

  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        multiple
        className="border px-2 py-1 w-full"
        value={value}
        onChange={handleSelectChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <small className="text-gray-500">
        Hold Ctrl (Windows) or Cmd (Mac) to select multiple
      </small>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
