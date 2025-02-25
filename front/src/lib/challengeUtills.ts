import { Challenge } from "@back-types";
import dayjs from "dayjs";

export const completedChallengesCount = (challenges: Challenge[]) => {
  return challenges.filter((challenge) => {
    const lastTaskDate = dayjs(
      challenge.taskDates[challenge.taskDates.length - 1]
    ).startOf("day");
    const today = dayjs().startOf("day");

    return lastTaskDate <= today;
  }).length;
};
