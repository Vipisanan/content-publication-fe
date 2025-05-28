import axios from "axios";
const axiosUser = axios.create({
  baseURL: "http://52.90.134.179:8081/api", // Auth service port
});
export default axiosUser;
