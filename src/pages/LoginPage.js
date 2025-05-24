import React from "react";
import LoginForm from "../forms/LoginForm";
import { login } from "../api/AuthService";

const LoginPage = () => {
  const [message, setMessage] = React.useState("");

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data: ", data);
    login(data)
      .then((response) => {
        console.log("Login successful", response);
        setMessage("Login successful!");
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
