import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  displayName: yup
    .string()
    .required("Display name is required")
    .min(2, "Display name should be between 2 and 50 characters")
    .max(50, "Display name should be between 2 and 50 characters"),
  bio: yup
    .string()
    .required("Bio is required")
    .min(5, "Bio should be between 5 and 255 characters")
    .max(255, "Bio should be between 5 and 255 characters"),
  country: yup.string().required("Country is required"),
});

export default function ProfileForm({
  onSubmit,
  initialData = {},
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      displayName: initialData.displayName || "",
      bio: initialData.bio || "",
      country: initialData.country || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData.displayName ? "Edit Profile" : "Add Profile"}
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Display Name</label>
        <input
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 ${
            errors.displayName ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          {...register("displayName")}
          disabled={loading}
          maxLength={50}
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.displayName.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 ${
            errors.bio ? "border-red-500" : "border-gray-300"
          }`}
          {...register("bio")}
          rows={3}
          maxLength={255}
          disabled={loading}
        />
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Country</label>
        <input
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          {...register("country")}
          disabled={loading}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full font-semibold py-2 px-4 rounded transition ${
          isValid && !loading
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isValid || loading}
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
