import { Challenge, CreateChallengeReq, UpdateChallenge, User } from "../types";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to handle JWT authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage
    const token = sessionStorage.getItem("jwt-token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Fallback to initData if no token
      const { initDataRaw } = retrieveLaunchParams();
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

// Add response interceptor to capture JWT token
apiClient.interceptors.response.use(
  (response) => {
    // Check if server sent a token in the Authorization header
    const authHeader = response.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      // Store token in sessionStorage
      sessionStorage.setItem("jwt-token", token);
    }
    return response;
  },
  (error) => {
    // Handle 401 errors - token expired or invalid
    if (error.response && error.response.status === 401) {
      // Clear token
      sessionStorage.removeItem("jwt-token");
    }
    return Promise.reject(error);
  }
);

// Todo: add onboarding get

export const createInvoice = async () => {
  const response = await apiClient.get("/createInvoice");
  return response.data;
};

export const getUserOnBoarding = async () => {
  const response = await apiClient.get("/getOnBoarding");
  return response.data;
};

export const updateCompletedChallengesCount = async (count: number) => {
  const response = await apiClient.put("/updateCompletedChallengesCount", {
    count,
  });
  return response.data;
};

export const updateOnBoarding = async (onBoarding: boolean) => {
  const response = await apiClient.put("/updateOnBoarding", { onBoarding });
  return response.data;
};

export const updatePremium = async (premiumUntil: string) => {
  const response = await apiClient.put("/updatePremium", { premiumUntil });
  return response.data;
};

export const getPremium = async () => {
  const response = await apiClient.get("/getPremium");
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("/getUser");
  console.log("getUser api", response.data);
  return response.data;
};

export const updateLastActiveDate = async () => {
  const response = await apiClient.put("/updateLastActiveDate", {});
  return response.data;
};

export const updateTokens = async (tokens: number) => {
  const response = await apiClient.put("/updateTokens", { tokens });
  return response.data;
};

export const getChallenges = async () => {
  console.log("API_URL", API_URL);
  const response = await apiClient.get("/getChallenges");
  console.log("/getChallenges api", response.data);
  return response.data;
};

export const createNewChallenge = async (body: CreateChallengeReq) => {
  console.log("POST /createChallenge", body);
  const response = await apiClient.post("/createChallenge", body);
  return response.data as Challenge;
};

export const updateChallenge = async (body: UpdateChallenge, id: number) => {
  const response = await apiClient.put(`/updateChallenge/${id}`, body);
  return response.data;
};

export const deleteChallenge = async (challengeId: number) => {
  const response = await apiClient.delete(`/deleteChallenge/${challengeId}`);
  return response.data;
};
