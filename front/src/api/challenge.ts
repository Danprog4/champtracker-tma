import { Challenge, CreateChallengeReq, UpdateChallenge } from '@back-types';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Todo: add onboarding get 

export const createInvoice = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/createInvoice`, {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

  return response.data;
};

export const getUserOnBoarding = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/getOnBoarding`, {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

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

export const getPremium = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get(`${API_URL}/getPremium`, {
    headers: {
      'x-init-data': initDataRaw,
    },
  });
  return response.data;
};


export const getChallenges = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  console.log('API_URL', API_URL);
  const response = await axios.get(`${API_URL}/getChallenges`, {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

  console.log('/getChallenges api', response.data);

  return response.data;
};

export const createNewChallenge = async (body: CreateChallengeReq) => {
  const { initDataRaw } = retrieveLaunchParams();

  console.log('POST /createChallenge', body);

  const response = await axios.post(`${API_URL}/createChallenge`, body, {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

  return response.data as Challenge;
};

export const updateChallenge = async (body: UpdateChallenge, id: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(`${API_URL}/updateChallenge/${id}`, body, {
    headers: {
      'x-init-data': initDataRaw,
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
        'x-init-data': initDataRaw,
      },
    },
  );

  return response.data;
};
