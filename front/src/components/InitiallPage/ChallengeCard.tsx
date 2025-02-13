import { useChallenges } from "@/hooks/useChallenges";
import { calculateDaysSinceStart } from "@/lib/dateUtils";
import { Months } from "@/configs/Months.config";
import { Challenge } from "@back-types";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import CheckImg from "../../assets/images/icons8-галочка.svg";
import { DateInfo } from "./DateInfo";

type ChallengeCardProps = {
  challenge: Challenge;
  isLast: boolean;
};

const ChallengeCard = ({ challenge, isLast }: ChallengeCardProps) => {
  const {
    id,
    title,
    challengeStartAt,
    color,
    duration,
    regularity,
    taskDates,
    userCheckedDates,
  } = challenge;
  const { checkDay } = useChallenges();

  const startDate = dayjs(challengeStartAt).startOf("day");
  const daysSinceStart = calculateDaysSinceStart(taskDates);
  const isDayChecked = userCheckedDates?.some((date) =>
    dayjs(date).isSame(dayjs(), "day")
  );

  const handleDayClick = (challengeId: string, dayCount: number) => {
    checkDay(challengeId, dayCount);
  };

  const formattedStartDate = `${startDate.date()} ${Months[startDate.month()]}`;
  const firstTaskDate = taskDates?.[0] ? dayjs(taskDates[0]) : null;

  return (
    <Link
      to={`/challenge/$taskId`}
      params={{ taskId: id.toString() }}
      className={`${color} flex h-[16vh] w-[90vw] items-center justify-between rounded-lg p-3 pr-0 ${isLast ? "mb-10" : ""}`}>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold text-black">{title}</span>
        <div className="mt-5 flex">
          <span className="text-5xl font-extrabold text-black">
            {Math.max(0, daysSinceStart)}
          </span>
          <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
            <div className="mb-[-7px]">{formattedStartDate}</div>
            <div>
              /
              {regularity === "everyday"
                ? `${duration} дн.`
                : `${duration / 7} нед.`}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="relative flex aspect-square h-[16vh] items-center justify-center gap-2 rounded-full bg-black"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleDayClick(id.toString(), daysSinceStart - 1);
          }}>
          <div className="text-md font-extrabold text-white">
            {isDayChecked ? (
              <img src={CheckImg} alt="check_image" className="w-[30px]" />
            ) : daysSinceStart <= 0 ? (
              <DateInfo label="НАЧАЛО" date={formattedStartDate} />
            ) : regularity !== "everyday" &&
              !startDate.isSame(dayjs().startOf("day")) &&
              firstTaskDate ? (
              <DateInfo
                label="ПЕРВЫЙ ДЕНЬ"
                date={`${firstTaskDate.date()} ${Months[firstTaskDate.month()]}`}
              />
            ) : (
              <span>ГОТОВО</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
