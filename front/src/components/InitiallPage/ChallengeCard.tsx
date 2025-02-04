import { calculateDaysSinceStart, formatDate } from "@/lib/dateUtils";
import { Months } from "@/Months.config";
import { Challenge } from "@back-types";
import { Link } from "react-router";

type ChallengeCardProps = {
  challenge: Challenge;
  isLast: boolean;
};

const ChallengeCard = ({ challenge, isLast }: ChallengeCardProps) => {
  const startDate = new Date(challenge.createdAt);
  const daysSinceStart = calculateDaysSinceStart(challenge.taskDates);

  return (
    <Link
      to={`/challenge/${challenge.id}`}
      className={`${
        challenge.color
      } flex h-[16vh] w-[90vw] items-center justify-between rounded-lg p-3 pr-0 ${
        isLast && "mb-10"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-lg font-extrabold text-black">
          {challenge.title}
        </span>
        <div className="mt-5 flex">
          <span className="text-5xl font-extrabold text-black">
            {daysSinceStart < 0 ? 0 : daysSinceStart}
          </span>
          <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
            <div className="mb-[-7px]">
              {`${startDate.getDate()} `}
              {Months[startDate.getMonth() + 1]}
            </div>
            <div>
              /
              {`${
                challenge.regularity === "everyday"
                  ? challenge.duration + " дн."
                  : challenge.duration / 7 + " нед."
              }`}
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
            // handleDayClick(challenge.id, daysSinceStart);
          }}
        >
          <div className="text-md font-extrabold text-white">
            {challenge.userCheckedDates &&
            challenge.userCheckedDates.includes(formatDate(new Date())) ? (
              <img src={""} alt="check_image" className="w-[30px]" />
            ) : (
              <span>
                {startDate > new Date() ? (
                  <div className="flex flex-col text-center">
                    <span className="text-xs font-light leading-3">НАЧАЛО</span>
                    <span>
                      {`${startDate.getDate()} `}
                      {Months[startDate.getMonth()]}
                    </span>
                  </div>
                ) : (
                  <span>ГОТОВО</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
