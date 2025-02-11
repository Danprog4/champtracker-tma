import React from "react";
import { Link } from "@tanstack/react-router";
import SettingImg from "../../assets/images/settings-svgrepo-com.svg";
import { Challenge } from "@back-types";
import { dayBeforeToday, formatDate } from "@/lib/dateUtils";
import dayjs from "dayjs";
import { useChallenges } from "@/hooks/useChallenges";

type ChallengeInfoDisplayProps = {
  challenge: Challenge;
  today: string;
  calculateDaysSinceStart: number;
  weeks: any[];
};

export const ChallengeInfoDisplay: React.FC<ChallengeInfoDisplayProps> = ({
  challenge,
  today,
  calculateDaysSinceStart,
  weeks,
}) => {
  const { checkDay } = useChallenges();
  const displayDuration =
    challenge.regularity === "everyday"
      ? challenge.duration
      : Math.ceil(challenge.duration / 7);
  const displayRegularity =
    challenge.regularity === "everyday" ? "ДН." : "НЕД.";

  return (
    <div
      className={`flex min-h-screen flex-col p-[15px] ${challenge.color} pb-20 pt-10`}
    >
      <div className="mb-10 flex items-center justify-between text-black">
        <Link to={"/"} className="w-[30px]">
          ←
        </Link>
        <span>Задание</span>
        <Link
          to={"/update/$taskId"}
          params={{
            taskId: challenge.id.toString(),
          }}
          className="h-[30px]"
        >
          <img src={SettingImg} alt="Настройки" className="w-[30px]" />
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="max-w-[70vw] text-3xl font-extrabold text-black">
          {challenge.title}
        </div>
        <div className="flex flex-col">
          <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
            <div className="text-[22px] font-extrabold">{displayDuration}</div>
            <div className="mb-1 mt-[-5px] text-[10px] font-light">
              {displayRegularity}
            </div>
          </div>
          <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
            <div className="text-wrap text-center text-[10px] font-light">
              {challenge.regularity === "everyday"
                ? "Каждый день"
                : "Несколько раз в неделю"}
            </div>
          </div>
        </div>
      </div>

      {challenge.regularity === "everyday" ? (
        <div className="mb-[75px] grid grid-cols-5 gap-0">
          {challenge.taskDates.map((day, index) => {
            const hasChecked =
              challenge.userCheckedDates &&
              challenge.userCheckedDates.includes(day);
            const isToday = formatDate(new Date(day)) === today && !hasChecked;
            const hasFailed = !isToday && !hasChecked && dayBeforeToday(day);

            return (
              <button
                onClick={() => {
                  checkDay(challenge.id.toString(), index);
                }}
                key={day}
                className={`aspect-square rounded-full border border-black text-lg font-bold text-black ${
                  isToday && "bg-yellow-500"
                } ${hasFailed && "bg-red-500"} ${hasChecked && "bg-green-500"}`}
              >
                <span>{index + 1}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          {weeks.map((weekGroup, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-xl font-bold text-black">
                НЕДЕЛЯ {weekGroup.week}
              </h2>
              <div className="grid grid-cols-5 gap-0">
                {weekGroup.days.map((day: string, indexDay: number) => {
                  const hasChecked =
                    challenge.userCheckedDates &&
                    challenge.userCheckedDates.includes(day);
                  const isToday =
                    formatDate(new Date(day)) === today && !hasChecked;
                  const hasFailed =
                    !isToday && !hasChecked && dayBeforeToday(day);

                  return (
                    <button
                      onClick={() => checkDay(challenge.id.toString(), index)}
                      key={day}
                      className={`aspect-square rounded-full border border-black text-lg font-bold text-black ${
                        isToday && "bg-yellow-500"
                      } ${hasFailed && "bg-red-500"} ${
                        hasChecked && "bg-green-500"
                      }`}
                    >
                      <span>{indexDay + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {calculateDaysSinceStart < 0 &&
        dayjs(challenge.challengeStartAt).startOf("day").toISOString() !==
          dayjs().startOf("day").toISOString() && (
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">НАЧАЛО ЗАДАНИЯ</div>
              <div className="text-3xl font-extrabold">
                {dayjs(challenge.challengeStartAt).format("DD.MM.YYYY")}
              </div>
            </div>
          </div>
        )}

      {(calculateDaysSinceStart > 0 ||
        dayjs(challenge.challengeStartAt).startOf("day").toISOString() ===
          dayjs().startOf("day").toISOString()) && (
        <div>
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">ПРОЙДЕННЫХ ДНЕЙ</div>
              <div className="text-3xl font-extrabold">
                {Math.max(0, calculateDaysSinceStart)}
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">ВЫПОЛНЕННЫХ ДНЕЙ</div>
              <div className="text-3xl font-extrabold">
                {challenge.userCheckedDates
                  ? challenge.userCheckedDates.length
                  : 0}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center pl-0 font-extrabold">
        <Link
          to={`/`}
          className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-500 p-5"
        >
          <div>ПРОДОЛЖИТЬ</div>
        </Link>
      </div>
    </div>
  );
};
