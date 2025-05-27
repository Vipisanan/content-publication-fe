import axios from "axios";
const axiosContent = axios.create({
  baseURL: "http://http://52.90.134.179:8082", // Content service port
});
export default axiosContent;
