import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema for comments
const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .min(2, "Comment must be at least 2 characters")
    .max(500, "Comment must be at most 500 characters"),
});

const CommentForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    onSubmit(data.comment);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-8 rounded shadow-md w-full max-w-xl"
      noValidate
    >
      <h2 className="text-xl font-bold mb-4 text-center">Add Comment</h2>
      <div className="mb-6">
        <textarea
          {...register("comment")}
          placeholder="Write your comment..."
          rows={4}
          maxLength={500}
          autoComplete="off"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none ${
            errors.comment ? "border-red-400" : ""
          }`}
        />
        {errors.comment && (
          <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded font-semibold ${
          isValid
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isValid}
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
