import axiosUser from "./axios/axiosInstance";
// import axiosUser from "./axios/axiosUser";

export const login = (data) => axiosUser.post("/auth/login", data);
export const signup = (data) => axiosUser.post("/auth/signup", data);

// Get user by userId
export const getUserById = (userId) => axiosUser.get(`/users/${userId}`);

// Add profile for user
export const addProfile = (userId, data) =>
  axiosUser.put(`/users/${userId}/profile`, data);

//Get users by ids
export const fetchUsersByIds = (userIds) =>
  axiosUser.post(`/users/bulk`, userIds);
