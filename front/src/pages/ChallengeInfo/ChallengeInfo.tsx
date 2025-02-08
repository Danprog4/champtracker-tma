import React from 'react';

import { toast } from 'sonner';
import { useChallenges } from '@/hooks/useChallenges';
import { ChallengeInfoDisplay } from './ChallengeInfoView';
import {
  formatDate,
  calculateDaysSinceStart,
  calculateWeeks,
} from '@/lib/dateUtils';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/challenge/$taskId');

const ChallengeInfoContainer: React.FC = () => {
  const { taskId } = routeApi.useParams();
  const { getOneChallege } = useChallenges();
  const challenge = getOneChallege(Number(taskId));

  if (!challenge) {
    toast('Задача не найдена');
    return null;
  }

  const nowDate = new Date();
  const today = formatDate(nowDate);

  const formatToDDMMYYYY = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const taskData = {
    challenge,
    today,
    calculateDaysSinceStart: calculateDaysSinceStart(challenge.taskDates),

    weeks: calculateWeeks(challenge),
    formatToDDMMYYYY,
  };
  return <ChallengeInfoDisplay {...taskData} />;
};

export default ChallengeInfoContainer;
