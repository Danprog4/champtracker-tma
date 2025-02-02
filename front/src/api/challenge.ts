import { retrieveLaunchParams } from '@telegram-apps/sdk';
import axios from 'axios';

type Challenge = {
  id: number;
  userId: number;
  title: string;
  duration: number;
  color: string;
  createdAt: string;
  regularity: 'everyday' | 'fewTimesAWeek';
  daysOfWeek: number[] | null;
  taskDates: Date[];
  userCheckedDates: Date[] | null;
};

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
