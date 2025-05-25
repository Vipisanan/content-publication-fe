import React, { useState } from "react";
import MultiSelect from "../components/MultiSelect";

export default function CreateContentForm({
  initialValues,
  onSubmit,
  categories,
}) {
  const [form, setForm] = useState(
    initialValues || {
      title: "",
      details: "",
      categoryNames: [],
    }
  );
  const [errors, setErrors] = useState({});

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.details) {
      newErrors.details = "Details are required";
    } else if (countWords(form.details) < 200) {
      newErrors.details = "Details must be at least 200 words";
    }
    if (!form.categoryNames || form.categoryNames.length === 0)
      newErrors.categoryNames = "Select at least one category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        {errors.title && <div className="text-red-500">{errors.title}</div>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Details</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
          rows={14}
        />
        <div className="text-gray-500 text-xs mb-1">
          Word count: {countWords(form.details)}
        </div>
        {errors.details && <div className="text-red-500">{errors.details}</div>}
      </div>
      <div>
        <MultiSelect
          categories={categories}
          value={form.categoryNames}
          onChange={(selected) =>
            setForm((prev) => ({ ...prev, categoryNames: selected }))
          }
          error={errors.categoryNames}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Publish Content
      </button>
    </form>
  );
}
