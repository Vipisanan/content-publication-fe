import axiosUser from "./axios/axiosUser";
export const login = (data) => axiosUser.post("/api/auth/login", data);
export const signup = (data) => axiosUser.post("/api/auth/signup", data);
// ...other auth functions
