import axios from "axios";
const axiosNotification = axios.create({
  baseURL: "http://http://52.90.134.179:8083", // Content service port
});
export default axiosNotification;
