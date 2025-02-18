import { Link } from "@tanstack/react-router";
import { DateInfo } from "../DateInfo";
import { Dayjs } from "dayjs";
import { Check } from "@/icons/Check";

type ChallengeCardUIProps = {
  title: string;
  color: string;
  isLast: boolean;
  daysSinceStart: number;
  weeks: number;
  formattedStartDate: string;
  formattedTodayDate: string;
  duration: number;
  regularity: string;
  isDayAvailable: boolean;
  daysOfWeek?: number[] | null;
  shouldRenderCircle: boolean;
  isDayChecked: boolean | undefined;
  startDateIsAfterToday: boolean;
  onCheckDay: () => void;
  challengeId: string;
  Days: string[];
  nextAvailableDay: Dayjs | null;
  formattedNextAvailableDay: string;
};

export const ChallengeCardUI = ({
  title,
  color,
  isLast,
  daysSinceStart,
  weeks,
  formattedStartDate,
  duration,
  regularity,
  isDayAvailable,
  daysOfWeek,
  shouldRenderCircle,
  isDayChecked,
  startDateIsAfterToday,
  onCheckDay,
  challengeId,
  Days,
  formattedTodayDate,
  nextAvailableDay,
  formattedNextAvailableDay,
}: ChallengeCardUIProps) => {
  console.log(nextAvailableDay, "nextAvailableDay");
  return (
    <Link
      to={`/challenge/$taskId`}
      params={{ taskId: challengeId }}
      className={`${color} flex h-[16vh] w-[95vw] justify-between rounded-lg pr-0 pl-4 ${isLast ? "mb-28" : ""}`}>
      <div className="flex flex-col justify-between pt-4 pb-4">
        <span className="leading-6 text-black font-druk text-md">{title}</span>
        <div className="flex">
          <span className="font-extrabold font-druk text-4xl text-stroke-1 text-transparent">
            {regularity === "everyday" && daysSinceStart !== 0
              ? daysSinceStart
              : daysSinceStart !== 0 && weeks}
          </span>
          <div className="flex-col flex-end text-xs font-medium text-black mt-2.5 ml-1.5  ">
            <div className="mb-[-5px]">{formattedTodayDate}.</div>
            <div>
              {daysSinceStart !== 0 && "/ "}
              {regularity === "everyday"
                ? `${duration} дн.`
                : `${duration / 7} нед.`}
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex aspect-square h-[16vh] items-center justify-center gap-2 rounded-full bg-black"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onCheckDay();
        }}>
        <div className="text-md font-extrabold  text-white flex justify-center items-center">
          {isDayChecked ? (
            <Check />
          ) : startDateIsAfterToday ? (
            <DateInfo label="НАЧАЛО" date={formattedStartDate} />
          ) : isDayAvailable ? (
            <span className="font-druk text-xs">ГОТОВО</span>
          ) : (
            <DateInfo
              label="СЛЕДУЮЩИЙ ДЕНЬ"
              date={formattedNextAvailableDay || ""}
            />
          )}
        </div>
      </div>
    </Link>
  );
};
