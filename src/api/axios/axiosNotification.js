import axios from "axios";
const axiosNotification = axios.create({
  baseURL: "http://localhost:8083", // Content service port
});
export default axiosNotification;
