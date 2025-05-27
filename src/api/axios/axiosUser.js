import axios from "axios";
const axiosUser = axios.create({
  baseURL: "http://http://52.90.134.179:8081", // Auth service port
});
export default axiosUser;
