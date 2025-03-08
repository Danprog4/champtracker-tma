import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { getToken, login, removeToken } from "./auth";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { getMockInitData } from "../utils/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Track if we're currently refreshing auth
let isRefreshing = false;
// Store pending requests to retry after refresh
let pendingRequests: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// Create a custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Store loading state that components can access
export const loadingState = {
  isLoading: false,
  setLoading: (value: boolean) => {
    loadingState.isLoading = value;
    // Notify listeners about state change
    loadingState.listeners.forEach((listener) => listener(value));
  },
  listeners: [] as Array<(isLoading: boolean) => void>,
  addListener: (callback: (isLoading: boolean) => void) => {
    loadingState.listeners.push(callback);
    return () => {
      loadingState.listeners = loadingState.listeners.filter(
        (cb) => cb !== callback
      );
    };
  },
};

// Process all pending requests
const processQueue = (error: any = null) => {
  pendingRequests.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      // Retry the request
      api(request.config)
        .then((response) => request.resolve(response))
        .catch((err) => request.reject(err));
    }
  });

  pendingRequests = [];
};

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
      let initDataRaw;

      try {
        const params = retrieveLaunchParams();
        initDataRaw = params.initDataRaw;
      } catch (error) {
        console.warn("Error retrieving launch params:", error);

        // In development, use mock data from environment
        if (process.env.NODE_ENV === "development") {
          initDataRaw = getMockInitData();
        }
      }

      // In development mode, provide a fallback mock data if nothing is available
      if (!initDataRaw && process.env.NODE_ENV === "development") {
        console.info(
          "No init data found in interceptor, using default mock data"
        );
        initDataRaw = getMockInitData();
      }

      if (initDataRaw) {
        config.headers["x-init-data"] = initDataRaw;
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
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // If the error is 401 and we haven't tried to refresh yet
    if (
      error.response?.status === 401 &&
      !originalRequest.headers["X-Retry-Count"]
    ) {
      // Set or increment retry count
      const retryCount = parseInt(
        (originalRequest.headers["X-Retry-Count"] as string) || "0"
      );

      // Only retry once to prevent infinite loops
      if (retryCount < 1) {
        // Set retry header
        originalRequest.headers["X-Retry-Count"] = (retryCount + 1).toString();

        // If we're already refreshing, add this request to the queue
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({ resolve, reject, config: originalRequest });
          });
        }

        isRefreshing = true;
        loadingState.setLoading(true);

        try {
          console.log("Attempting to login again after 401 error");

          // Try to login again
          const { token } = await login();

          // Process the queue with the new token
          processQueue();

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh authentication:", refreshError);
          // Process the queue with the error
          processQueue(refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          loadingState.setLoading(false);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
