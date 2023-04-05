import axios from "axios";

//const BASE_URL = "http://localhost:4000/developer";
const BASE_URL="https://project-hub-backend.onrender.com/developer"

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
