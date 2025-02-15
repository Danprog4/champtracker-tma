import { Link } from "@tanstack/react-router";
import { DateInfo } from "../DateInfo";
import CheckImg from "../../../assets/images/icons8-галочка.svg";
import { Dayjs } from "dayjs";

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
      className={`${color} flex h-[16vh] w-[90vw] items-center justify-between rounded-lg pr-0 p-3 ${isLast ? "mb-28" : ""}`}>
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col">
          <span className="text-lg font-extrabold text-black">{title}</span>
          <div className="mt-5 flex">
            <span className="text-5xl font-extrabold text-black">
              {regularity === "everyday" && daysSinceStart !== 0
                ? daysSinceStart
                : daysSinceStart !== 0 && weeks}
            </span>
            <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
              <div className="mb-[-7px]">{formattedTodayDate}</div>
              <div>
                {daysSinceStart !== 0 && "/"}
                {regularity === "everyday"
                  ? `${duration} дн.`
                  : `${duration / 7} нед.`}
              </div>
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
        <div className="text-md font-extrabold text-white flex justify-center items-center">
          {isDayChecked ? (
            <img src={CheckImg} alt="check_image" className="w-[30px]" />
          ) : startDateIsAfterToday ? (
            <DateInfo label="НАЧАЛО" date={formattedStartDate} />
          ) : isDayAvailable ? (
            <span>ГОТОВО</span>
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
