import { useChallenges } from "@/hooks/useChallenges";
import {
  calculateDaysSinceStart,
  getGlobalDayIndex,
  getNextAvailableDay,
} from "@/lib/dateUtils";
import { Months } from "@/configs/months.config";
import { Challenge } from "@back-types";
import dayjs from "dayjs";
import { ChallengeCardUI } from "./ChallengeCardView";

type ChallengeCardProps = {
  challenge: Challenge;
  index: number;
  isLastNonExpired?: boolean;
  isLastExpired?: boolean;
  isExpired: boolean;
  isPremium?: boolean;
};

export const ChallengeCard = ({
  challenge,
  isLastNonExpired,
  isLastExpired,
  isExpired,
  isPremium,
  index,
}: ChallengeCardProps) => {
  const {
    id,
    title,
    challengeStartAt,
    color,
    duration,
    regularity,
    taskDates,
    userCheckedDates,
    daysOfWeek,
  } = challenge;

  const { checkDay } = useChallenges();
  const startDate = dayjs(challengeStartAt).startOf("day");
  const daysSinceStart = calculateDaysSinceStart(taskDates);

  const isDayChecked = userCheckedDates?.some((date) =>
    dayjs(date).isSame(dayjs(), "day")
  );
  const formattedStartDate = `${startDate.date()} ${Months[startDate.month()]}`;

  const formattedTodayDate = `${dayjs().date()} ${Months[dayjs().month()]}`;
  const isDayAvailable = taskDates.some((date) =>
    dayjs(date).startOf("day").isSame(dayjs().startOf("day"))
  );
  const shouldRenderCircle =
    isDayAvailable || startDate.isAfter(dayjs().startOf("day"));

  const todayFormatted = dayjs().startOf("day").format("YYYY-MM-DD");
  const globalDayIndex = getGlobalDayIndex(
    todayFormatted,
    taskDates.map((date) => dayjs(date).format("YYYY-MM-DD"))
  );
  const weeks =
    Math.floor(daysSinceStart / 7) === 0 ? 1 : Math.ceil(daysSinceStart / 7);
  const Days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const maxDaysSinceStart = Math.max(0, daysSinceStart);
  const nextAvailableDay = getNextAvailableDay(challenge);
  const formattedNextAvailableDay = nextAvailableDay
    ? `${nextAvailableDay.date()} ${Months[nextAvailableDay.month()]}`
    : "";

  const handleCheckDay = () => {
    checkDay(id.toString(), globalDayIndex);
  };

  return (
    <ChallengeCardUI
      index={index}
      title={title}
      color={color}
      isLastNonExpired={isLastNonExpired}
      isLastExpired={isLastExpired}
      daysSinceStart={maxDaysSinceStart}
      weeks={weeks}
      formattedStartDate={formattedStartDate}
      formattedTodayDate={formattedTodayDate}
      duration={duration}
      regularity={regularity}
      isDayAvailable={isDayAvailable}
      daysOfWeek={daysOfWeek}
      shouldRenderCircle={shouldRenderCircle}
      isDayChecked={isDayChecked}
      startDateIsAfterToday={startDate.isAfter(dayjs().startOf("day"))}
      onCheckDay={handleCheckDay}
      challengeId={id.toString()}
      Days={Days}
      nextAvailableDay={nextAvailableDay}
      formattedNextAvailableDay={formattedNextAvailableDay}
      isExpired={isExpired}
      isPremium={isPremium}
    />
  );
};
