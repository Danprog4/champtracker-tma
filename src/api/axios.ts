import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token or initData to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    // If we have a token, add it to the request headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If no token, add initData as fallback
    else if (config.headers && !config.headers["x-init-data"]) {
      try {
        const { initDataRaw } = retrieveLaunchParams();
        if (initDataRaw) {
          config.headers["x-init-data"] = initDataRaw;
        }
      } catch (error) {
        console.error("Error retrieving launch params:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If server responds with 401 Unauthorized, could handle token refresh here
    if (error.response && error.response.status === 401) {
      console.error("Authentication error:", error.response.data);
      // Optional: could redirect to login or refresh token here
    }

    return Promise.reject(error);
  }
);

export default api;
