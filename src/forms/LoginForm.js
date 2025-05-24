import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema for login
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ handleLoginSubmit, msg }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleLoginSubmit({ email: data.email, password: data.password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.email ? "border-red-400" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.password ? "border-red-400" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Login
        </button>
        {msg && <p className="text-center mt-4 text-sm text-gray-600">{msg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
