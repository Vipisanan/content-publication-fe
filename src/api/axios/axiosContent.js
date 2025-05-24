import axios from "axios";
const axiosContent = axios.create({
  baseURL: "http://localhost:8082", // Content service port
});
export default axiosContent;
