import { CreateChallengeReq, UpdateChallenge } from '@back-types';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';

export const getChallenges = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get('http://localhost:3000/getChallenges', {
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

  const response = await axios.post(
    'http://localhost:3000/createChallenge',
    body,
    {
      headers: {
        'x-init-data': initDataRaw,
      },
    },
  );

  return response.data;
};

export const updateChallenge = async (body: UpdateChallenge, id: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.put(
    `http://localhost:3000/updateChallenge/${id}`,
    body,
    {
      headers: {
        'x-init-data': initDataRaw,
      },
    },
  );

  return response.data;
};

export const deleteChallenge = async (challengeId: number) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.delete(
    `http://localhost:3000/deleteChallenge/${challengeId}`,
    {
      headers: {
        'x-init-data': initDataRaw,
      },
    },
  );

  return response.data;
};
