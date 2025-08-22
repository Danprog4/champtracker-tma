import { Challenge, CreateChallengeReq, UpdateChallenge, User } from "../types";
import api from "./axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const createInvoice = async () => {
  const response = await api.get("/createInvoice");
  return response.data;
};

export const getUserOnBoarding = async () => {
  const response = await api.get("/getOnBoarding");
  return response.data;
};

export const updateCompletedChallengesCount = async (count: number) => {
  const response = await api.put("/updateCompletedChallengesCount", { count });
  return response.data;
};

export const updateOnBoarding = async (onBoarding: boolean) => {
  const response = await api.put("/updateOnBoarding", { onBoarding });
  return response.data as boolean;
};

export const updatePremium = async (premiumUntil: string) => {
  const response = await api.put("/updatePremium", { premiumUntil });
  return response.data;
};

export const getPremium = async () => {
  const response = await api.get("/getPremium");
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/getUser");
  console.log("getUser api", response.data);
  return response.data;
};

export const updateLastActiveDate = async () => {
  const response = await api.put("/updateLastActiveDate", {});
  return response.data;
};

export const updateTokens = async (tokens: number) => {
  const response = await api.put("/updateTokens", { tokens });
  return response.data;
};

export const updateTotalActiveDays = async (totalActiveDays: number) => {
  const response = await api.put("/updateTotalActiveDays", { totalActiveDays });
  return response.data;
};

export const getChallenges = async () => {
  console.log("API_URL", API_URL);
  const response = await api.get("/getChallenges");
  console.log("/getChallenges api", response.data);
  return response.data;
};

export const createNewChallenge = async (body: CreateChallengeReq) => {
  console.log("POST /createChallenge", body);
  const response = await api.post("/createChallenge", body);
  return response.data as Challenge;
};

export const updateChallenge = async (body: UpdateChallenge, id: number) => {
  const response = await api.put(`/updateChallenge/${id}`, body);
  return response.data;
};

export const deleteChallenge = async (challengeId: number) => {
  const response = await api.delete(`/deleteChallenge/${challengeId}`);
  return response.data;
};
