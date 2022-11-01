import axios from "axios";

const token = localStorage.getItem("token");
const axiosHttp = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosHttp;
