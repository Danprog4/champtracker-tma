import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { User } from "../types";
import { getMockInitData } from "../utils/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Token storage keys
const TOKEN_KEY = "auth_token";

// Save token to sessionStorage
export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

// Get token from sessionStorage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  return null;
};

// Remove token from sessionStorage
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Login user with Telegram init data
export const login = async (): Promise<{ token: string; user: User }> => {
  let initDataRaw;

  try {
    // Try to get init data from Telegram
    const params = retrieveLaunchParams();
    initDataRaw = params.initDataRaw;
  } catch (error) {
    console.warn("Error retrieving launch params:", error);

    // In development, fall back to environment variable
    if (process.env.NODE_ENV === "development") {
      console.info("Using mock init data from environment variable");
      initDataRaw = getMockInitData();
    } else {
      // In production, rethrow the error
      throw error;
    }
  }

  // In development mode, provide a fallback mock data if nothing is available
  if (!initDataRaw && process.env.NODE_ENV === "development") {
    console.info("No init data found, using default mock data for development");
    initDataRaw = getMockInitData();
  }

  // Ensure we have init data
  if (!initDataRaw) {
    throw new Error("No init data available for authentication");
  }

  const response = await axios.post(
    `${API_URL}/login`,
    {},
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  const { token, user } = response.data;

  // Save token to sessionStorage
  saveToken(token);

  return { token, user };
};
