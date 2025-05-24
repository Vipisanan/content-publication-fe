import axiosNotification from "./axios/axiosNotification";

// Get all subcriptions by user ID
export const fetchUserSubscriptions = (userId) =>
  axiosNotification.get(`/api/subscriptions/user/${userId}`);
