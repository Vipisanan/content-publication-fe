import React from "react";
import LoginForm from "../forms/LoginForm";
import { login } from "../api/AuthService";

const LoginPage = () => {
  const [message, setMessage] = React.useState("");

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
  return (
    <>
      <LoginForm handleLoginSubmit={handleFormSubmit} msg={message} />
    </>
  );
};

export default LoginPage;
