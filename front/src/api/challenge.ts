import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';
import { Challenge } from '@back-types';

export const getChallenges = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.get('http://localhost:3000/getChallenges', {
    headers: {
      'x-init-data': initDataRaw,
    },
  });

  return response.data;
};

export const createNewChallenge = async (challenge: Challenge) => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await axios.post(
    'http://localhost:3000/createChallenge',
    challenge,
    {
      headers: {
        'x-init-data': initDataRaw,
      },
    }
  );

  return response.data;
};
