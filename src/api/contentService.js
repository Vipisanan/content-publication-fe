import axiosInstance from "./axios/axiosInstance";

// Get all content
export const fetchContent = (page, size) =>
  axiosInstance.get(`/contents?page=${page}&size=${size}`);

// Get content by ID
export const fetchContentById = (id) => axiosInstance.get(`/contents/${id}`);

// Create new content
export const createContent = (data) => axiosInstance.post("/contents", data);

// Update content
export const updateContent = (id, data) =>
  axiosInstance.put(`/content/${id}`, data);

// Delete content
export const deleteContent = (id) => axiosInstance.delete(`/contents/${id}`);

// Get all categories
export const fetchAllCategories = () => axiosInstance.get(`/categories`);

// Edit content
export const editContent = (id, data) =>
  axiosInstance.put(`/contents/${id}`, data);

// Delete content by ID
export const deleteContentById = (id) =>
  axiosInstance.delete(`/contents/${id}`);

// Create new category
export const createCategory = (data) => axiosInstance.post("/categories", data);

// Get all comments for content
export const fetchCommentsByContentId = (contentId) =>
  axiosInstance.get(`/comments/by-content/${contentId}`);

// Create new comment
export const createComment = (data) => axiosInstance.post("/comments", data);
