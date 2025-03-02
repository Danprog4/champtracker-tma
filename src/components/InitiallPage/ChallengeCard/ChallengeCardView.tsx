import { Link } from "@tanstack/react-router";
import { DateInfo } from "../DateInfo";
import { Dayjs } from "dayjs";
import { Check } from "@/icons/Check";
import { toast, Toaster } from "sonner";

type ChallengeCardUIProps = {
  title: string;
  color: string;
  isLastNonExpired?: boolean;
  isLastExpired?: boolean;
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
  isExpired: boolean;
  isPremium?: boolean;
  index: number;
};

export const ChallengeCardUI = ({
  title,
  color,
  isLastNonExpired,
  isLastExpired,
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
  isExpired,
  isPremium,
  index,
}: ChallengeCardUIProps) => {
  return (
    <Link
      onClick={() => {
        if (!isPremium && index !== 0) {
          toast.error(
            "К сожалению, ваш премиум закончился. Пожалуйста, продлите его для прохождения этого задания"
          );
        }
      }}
      to={`/challenge/$taskId`}
      disabled={!isPremium && index !== 0}
      params={{ taskId: challengeId }}
      className={`${color} flex w-[94vw]   justify-between rounded-lg pr-0 pl-4 ${isLastNonExpired ? "mb-8" : ""} ${isExpired || (!isPremium && index !== 0) ? "opacity-50" : ""}`}>
      <div className="flex flex-col justify-between pt-4 pb-4">
        <span className="leading-6 text-black font-druk text-sm ">{title}</span>
        <div className="flex">
          <span className="font-druk text-4xl text-stroke-1 text-transparent">
            {regularity === "everyday" && daysSinceStart !== 0
              ? daysSinceStart
              : daysSinceStart !== 0 && weeks}
          </span>
          <div className="flex-col flex-end text-xs font-medium text-black mt-2.5 ml-2">
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
        className="relative flex w-[43%]  aspect-square items-center justify-center gap-2 rounded-full bg-black shrink-0"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onCheckDay();
        }}>
        <div className="text-md text-white flex justify-center items-center text-center max-w-[80%]">
          {isDayChecked && !isExpired ? (
            <Check />
          ) : startDateIsAfterToday && !isExpired ? (
            <DateInfo label="НАЧАЛО" date={formattedStartDate} />
          ) : isDayAvailable && !isExpired ? (
            <span className="font-druk text-xs truncate">ГОТОВО</span>
          ) : isExpired ? (
            <span className="font-druk text-xs truncate">ПРОЙДЕНО</span>
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
