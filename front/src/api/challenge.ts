import { CreateChallengeReq } from '@back-types';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';

export const getChallenges = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get('http://localhost:3000/getChallenges', {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

  return response.data;
};

export const createNewChallenge = async (body: CreateChallengeReq) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.post(
    'http://localhost:3000/createChallenge',
    body,
    {
      headers: {
        'x-init-data': initDataRaw,
      },
    }
  );

  return response.data;
};
