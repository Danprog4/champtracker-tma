import React from "react";

import { useChallenges } from "@/hooks/useChallenges";
import {
  calculateDaysSinceStart,
  calculateWeeks,
  formatDate,
} from "@/lib/dateUtils";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChallengeInfoDisplay } from "./ChallengeInfoView";

const routeApi = getRouteApi("/challenge/$taskId");

const ChallengeInfoContainer: React.FC = () => {
  const { taskId } = routeApi.useParams();
  const { getOneChallege } = useChallenges();
  const challenge = getOneChallege(Number(taskId));
  const { checkDay } = useChallenges();

  if (!challenge) {
    toast.error("Задача не найдена");
    return null;
  }

  const nowDate = new Date();
  const today = formatDate(nowDate);

  const displayDuration =
    challenge.regularity === "everyday"
      ? challenge.duration
      : Math.ceil(challenge.duration / 7);
  const displayRegularity =
    challenge.regularity === "everyday" ? "ДНЕЙ" : "НЕДЕЛЬ";

  const taskData = {
    challenge,
    today,
    calculateDaysSinceStart: calculateDaysSinceStart(challenge.taskDates),
    displayDuration,
    displayRegularity,
    weeks: calculateWeeks(challenge),
    checkDay,
  };

  return <ChallengeInfoDisplay {...taskData} />;
};

export default ChallengeInfoContainer;
