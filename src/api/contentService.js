import axiosInstance from "./axios/axiosInstance";

// Get all content
export const fetchContent = (page, size) =>
  axiosInstance.get(`/api/contents?page=${page}&size=${size}`);

// Get content by ID
export const fetchContentById = (id) =>
  axiosInstance.get(`/api/contents/${id}`);

// Create new content
export const createContent = (data) =>
  axiosInstance.post("/api/contents", data);

// Update content
export const updateContent = (id, data) =>
  axiosInstance.put(`/api/content/${id}`, data);

// Delete content
export const deleteContent = (id) =>
  axiosInstance.delete(`/api/contents/${id}`);

// Get all categories
export const fetchAllCategories = () => axiosInstance.get(`/api/categories`);

// Edit content
export const editContent = (id, data) =>
  axiosInstance.put(`/api/contents/${id}`, data);

// Delete content by ID
export const deleteContentById = (id) =>
  axiosInstance.delete(`/api/contents/${id}`);

// Create new category
export const createCategory = (data) =>
  axiosInstance.post("/api/categories", data);
