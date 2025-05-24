import React from "react";
import LoginForm from "../forms/LoginForm";
import { login } from "../api/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    login(data)
      .then((response) => {
        const token = response.data.accessToken;
        const userId = response.data.userId;
        const loggedInEmail = response.data.email;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("loggedInEmail", loggedInEmail);
        setMessage("Login successful!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login failed", error);
        setMessage("Login failed. Please check your credentials.");
      });
  };
  const handleRedirectSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <LoginForm handleLoginSubmit={handleFormSubmit} msg={message} />
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <button
          className="text-blue-600 underline"
          onClick={handleRedirectSignup}
          type="button"
        >
          Sign up here
        </button>
      </div>
    </>
  );
};

export default LoginPage;
