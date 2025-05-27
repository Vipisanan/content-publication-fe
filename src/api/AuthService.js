import axiosUser from "./axios/axiosUser";
export const login = (data) => axiosUser.post("/api/auth/login", data);
export const signup = (data) => axiosUser.post("/api/auth/signup", data);

// Get user by userId
export const getUserById = (userId) => axiosUser.get(`/api/users/${userId}`);

// Add profile for user
export const addProfile = (userId, data) =>
  axiosUser.put(`/api/users/${userId}/profile`, data);

//Get users by ids
export const fetchUsersByIds = (userIds) =>
  axiosUser.post(`/api/users/bulk`, userIds);
