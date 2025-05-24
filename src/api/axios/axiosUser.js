import axios from "axios";
const axiosUser = axios.create({
  baseURL: "http://localhost:8081", // Auth service port
});
export default axiosUser;
