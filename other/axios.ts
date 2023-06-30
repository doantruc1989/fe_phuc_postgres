import axios from "axios";

// const BASE_URL = "http://localhost:3009";
const BASE_URL = "https://phucpsql.webproject.click";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosDefault = axios;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true
});
