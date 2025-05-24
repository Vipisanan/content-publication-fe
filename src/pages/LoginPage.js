import React from "react";
import LoginForm from "../forms/LoginForm";
import { login } from "../api/AuthService";

const LoginPage = () => {
  const [message, setMessage] = React.useState("");

  const handleFormSubmit = (data) => {
    login(data)
      .then((response) => {
        console.log("Login successful", response);
        const token = response.data.accessToken;
        localStorage.setItem("authToken", token);
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
