import axiosInstance from "./axios/axiosInstance";

// Get all content
export const fetchAllContent = () => axiosInstance.get("/api/content");

// Get content by ID
export const fetchContentById = (id) => axiosInstance.get(`/api/content/${id}`);

// Create new content
export const createContent = (data) => axiosInstance.post("/api/content", data);

// Update content
export const updateContent = (id, data) =>
  axiosInstance.put(`/api/content/${id}`, data);

// Delete content
export const deleteContent = (id) => axiosInstance.delete(`/api/content/${id}`);
