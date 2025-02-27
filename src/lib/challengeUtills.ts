import { Challenge, User } from "@/types";
import dayjs from "dayjs";

export const isPremium = (user: User): boolean => {
  if (!user.premiumUntil) {
    return false;
  }
  console.log(
    user.premiumUntil &&
      !dayjs(user.premiumUntil).startOf("day").isBefore(dayjs().startOf("day")),
    "user.premiumUntil"
  );
  return Boolean(
    user.premiumUntil &&
      !dayjs(user.premiumUntil).startOf("day").isBefore(dayjs().startOf("day"))
  );
};

export const expiredChallenges = (
  challenges: Challenge[]
): Challenge[] | null => {
  const expiredChallenges = challenges.filter((ch) => {
    return dayjs()
      .startOf("day")
      .isAfter(dayjs(ch.taskDates[ch.taskDates.length - 1]).startOf("day"));
  });
  return expiredChallenges.length > 0 ? expiredChallenges : null;
};
