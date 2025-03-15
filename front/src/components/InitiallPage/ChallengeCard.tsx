import { useChallenges } from "@/hooks/useChallenges";
import { calculateDaysSinceStart, getGlobalDayIndex } from "@/lib/dateUtils";
import { Months } from "@/configs/Months.config";
import { Challenge } from "@back-types";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import CheckImg from "../../assets/images/icons8-галочка.svg";
import { DateInfo } from "./DateInfo";

// refactor this fucking shit

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
  const Days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const isDayChecked = userCheckedDates?.some((date) =>
    dayjs(date).isSame(dayjs(), "day")
  );

  const formattedStartDate = `${startDate.date()} ${Months[startDate.month()]}`;
  const isDayAvailable = challenge.taskDates.some((date) =>
    dayjs(date).startOf("day").isSame(dayjs().startOf("day"))
  );

  const shouldRenderCircle =
    isDayAvailable || startDate.isAfter(dayjs().startOf("day"));

  // Находим текущую дату в формате, соответствующем taskDates
  const todayFormatted = dayjs().startOf("day").format("YYYY-MM-DD");
  const globalDayIndex = getGlobalDayIndex(
    todayFormatted,
    taskDates.map((date) => dayjs(date).format("YYYY-MM-DD"))
  );

  const weeks = Math.floor(daysSinceStart / 7);

  return (
    <Link
      to={`/challenge/$taskId`}
      params={{ taskId: id.toString() }}
      className={`${color} flex h-[16vh] w-[90vw] items-center justify-between rounded-lg pr-0 p-3 ${isLast ? "mb-10" : ""}`}>
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col">
          <span className="text-lg font-extrabold text-black">{title}</span>
          <div className="mt-5 flex">
            <span className="text-5xl font-extrabold text-black">
              {Math.max(0, daysSinceStart) !== 0 && regularity === "everyday"
                ? Math.max(0, daysSinceStart)
                : Math.floor(Math.max(0, daysSinceStart) / 7)}
            </span>
            <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
              <div className="mb-[-7px]">{formattedStartDate}</div>
              <div>
                {Math.max(0, daysSinceStart) !== 0 && "/"}
                {regularity === "everyday"
                  ? `${duration} дн.`
                  : `${duration / 7} нед.`}
              </div>
            </div>
          </div>
        </div>
        {!isDayAvailable && !startDate.isAfter(dayjs().startOf("day")) && (
          <div className="text-lg font-bold text-black mt-6 pr-4">
            {challenge.daysOfWeek &&
              challenge.daysOfWeek
                .map((dayIndex: number) => Days[dayIndex])
                .join("/")}
          </div>
        )}
      </div>
      {shouldRenderCircle && (
        <div
          className="relative flex aspect-square h-[16vh] items-center justify-center gap-2 rounded-full bg-black"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            checkDay(id.toString(), globalDayIndex);
          }}>
          <div className="text-md font-extrabold text-white">
            {isDayChecked ? (
              <img src={CheckImg} alt="check_image" className="w-[30px]" />
            ) : startDate.isAfter(dayjs().startOf("day")) ? (
              <DateInfo label="НАЧАЛО" date={formattedStartDate} />
            ) : (
              <span>ГОТОВО</span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default ChallengeCard;
