import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:5000/api/v1";
  }
  return "/api/v1";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default axiosInstance;
