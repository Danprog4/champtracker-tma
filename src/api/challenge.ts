import { Challenge, CreateChallengeReq, UpdateChallenge, User } from "../types";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Todo: add onboarding get

export const createInvoice = async () => {
  const { initDataRaw } = retrieveLaunchParams();
  console.log("[Premium][Client] Creating invoice", {
    initDataRawLength: initDataRaw?.length,
  });

  try {
    const response = await axios.get(`${API_URL}/createInvoice`, {
      headers: {
        "x-init-data": initDataRaw,
      },
    });
    console.log("[Premium][Client] Invoice created successfully");

    return response.data;
  } catch (error) {
    console.error("[Premium][Client] Error creating invoice", { error });
    throw error;
  }
};

export const getUserOnBoarding = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/getOnBoarding`, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });

  return response.data;
};

export const updateCompletedChallengesCount = async (count: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `${API_URL}/updateCompletedChallengesCount`,
    { count },
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data;
};

export const updateOnBoarding = async (onBoarding: boolean) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `${API_URL}/updateOnBoarding`,
    { onBoarding },
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data as boolean;
};

export const updatePremium = async (premiumUntil: string) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `${API_URL}/updatePremium`,
    {
      premiumUntil,
    },
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data;
};

export const getPremium = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/getPremium`, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });
  return response.data;
};

export const getUser = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/getUser`, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });
  console.log("getUser api", response.data);

  return response.data;
};

export const updateLastActiveDate = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `${API_URL}/updateLastActiveDate`,
    {},
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data;
};

export const updateTokens = async (tokens: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `${API_URL}/updateTokens`,
    { tokens },
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data;
};

export const getChallenges = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  console.log("API_URL", API_URL);
  const response = await axios.get(`${API_URL}/getChallenges`, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });

  console.log("/getChallenges api", response.data);

  return response.data;
};

export const createNewChallenge = async (body: CreateChallengeReq) => {
  const { initDataRaw } = retrieveLaunchParams();

  console.log("POST /createChallenge", body);

  const response = await axios.post(`${API_URL}/createChallenge`, body, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });

  return response.data as Challenge;
};

export const updateChallenge = async (body: UpdateChallenge, id: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(`${API_URL}/updateChallenge/${id}`, body, {
    headers: {
      "x-init-data": initDataRaw,
    },
  });

  return response.data;
};

export const deleteChallenge = async (challengeId: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.delete(
    `${API_URL}/deleteChallenge/${challengeId}`,
    {
      headers: {
        "x-init-data": initDataRaw,
      },
    }
  );

  return response.data;
};
