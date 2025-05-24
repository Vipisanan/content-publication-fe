import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", form);
      setMsg("Signed up! Now you can log in.");
    } catch {
      setMsg("Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Sign Up
        </button>
        {msg && <p className="text-center mt-4 text-sm text-gray-600">{msg}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
