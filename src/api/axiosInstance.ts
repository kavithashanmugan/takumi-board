import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://takumi-v2.vercel.app/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
