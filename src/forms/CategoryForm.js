import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup
    .string()
    .required("Category is required")
    .min(2, "Category must be at least 2 letters")
    .max(8, "Category must be at most 8 letters"),
});

const CategoryForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    onSubmit(data.category);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
      noValidate
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
      <div className="mb-6">
        <input
          {...register("category")}
          placeholder="Category (2-8 letters)"
          autoComplete="off"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
            errors.category ? "border-red-400" : ""
          }`}
          maxLength={8}
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded font-semibold ${"bg-blue-600 hover:bg-blue-700 text-white"}`}
      >
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
