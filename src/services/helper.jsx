import { getToken } from "../auth";
import axios from "axios";

// Function to get the theme from local storage

// export const BASE_URL = "http://localhost:8082/";
export const BASE_URL = "https://pmspro.onrender.com/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Initial theme header
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
