import React from "react";
import { signup } from "../api/AuthService";
import SignupForm from "../forms/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

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
  const handleRedirectLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <SignupForm
        handleSignupSubmit={(data) => handleFormSubmit(data)}
        msg={message}
      />
      <div className="mt-4 text-center">
        <span>have an account? </span>
        <button
          className="text-blue-600 underline"
          onClick={handleRedirectLogin}
          type="button"
        >
          Login here
        </button>
      </div>
    </>
  );
};

export default SignupPage;
