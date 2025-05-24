import axiosNotification from "./axios/axiosNotification";

// Get all subcriptions by user ID
export const fetchUserSubscriptions = (userId) =>
  axiosNotification.get(`/api/subscriptions/user/${userId}`);

// Subscribe to a category
export const subscribeToCategory = (userId, categoryId) =>
  axiosNotification.post(`/api/subscriptions/subscribe`, {
    userId,
    categoryId,
  });

// Unsubscribe from a category
export const unsubscribeFromCategory = (userId, categoryId) =>
  axiosNotification.post(`/api/subscriptions/unsubscribe`, {
    userId,
    categoryId,
  });
