import axios from "axios";
const axiosNotification = axios.create({
  baseURL: "http://52.90.134.179:8083/api", // Content service port
});
export default axiosNotification;
