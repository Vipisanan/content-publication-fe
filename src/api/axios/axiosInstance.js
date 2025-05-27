import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://52.90.134.179/:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (e.g., for auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token from localStorage (or context, etc)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., for error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    if (error.response && error.response.status === 401) {
      // For example, redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
