import { User } from "@back-types";
import dayjs from "dayjs";

export const isPremium = (user: User) => {
  return (
    user.premiumUntil &&
    !dayjs(user.premiumUntil).startOf("day").isBefore(dayjs().startOf("day"))
  );
};
