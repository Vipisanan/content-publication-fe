import React, { useState } from "react";

export default function ProfileForm({
  onSubmit,
  initialData = {},
  loading = false,
}) {
  const [form, setForm] = useState({
    displayName: initialData.displayName || "",
    bio: initialData.bio || "",
    country: initialData.country || "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.displayName.trim()) errs.displayName = "Display name is required";
    if (!form.country.trim()) errs.country = "Country is required";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit(form);
  }

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData.displayName ? "Edit Profile" : "Add Profile"}
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Display Name</label>
        <input
          className={`w-full border rounded px-3 py-2 ${
            errors.displayName ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Country</label>
        <input
          className={`w-full border rounded px-3 py-2 ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : initialData.displayName
          ? "Update Profile"
          : "Add Profile"}
      </button>
    </form>
  );
}
