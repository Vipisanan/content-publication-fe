import React from "react";
import { signup } from "../api/AuthService";
import SignupForm from "../forms/SignupForm";

const SignupPage = () => {
  const [message, setMessage] = React.useState("");

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data: ", data);
    signup(data)
      .then((response) => {
        console.log("Login successful", response);
        setMessage("Signup successful!");
      })
      .catch((error) => {
        console.error("Login failed", error);
        setMessage("Signup failed. Please check your credentials.");
      });
  };
  return (
    <>
      <SignupForm
        handleSignupSubmit={(data) => handleFormSubmit(data)}
        msg={message}
      />
    </>
  );
};

export default SignupPage;
