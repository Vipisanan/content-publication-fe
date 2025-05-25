import React from "react";
import LoginForm from "../forms/LoginForm";
import { login } from "../api/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

const LoginPage = () => {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    login(data)
      .then((response) => {
        const token = response.data.accessToken;
        const userId = response.data.userId;
        const email = response.data.email;
        const publisher = response.data.publisher;
        dispatch(setAuth({ token, userId, email, publisher }));

        setMessage("Login successful!");
        navigate("/");
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
