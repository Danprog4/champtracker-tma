import React from "react";
import { Link } from "@tanstack/react-router";
import { Challenge } from "@/types";
import {
  dayBeforeToday,
  formatDate,
  formatDateWithTimezone,
} from "@/lib/dateUtils";
import dayjs from "dayjs";
import { BackIcon } from "@/icons/Back";
import { SettingsIcon } from "@/icons/Settings";
import { Colors } from "@/configs/bgColors.config";
import { CrossIcon } from "@/icons/Cross";
import { Check } from "@/icons/Check";
import { useIsMobile } from "@/hooks/usePlatform";
type ChallengeInfoDisplayProps = {
  challenge: Challenge;
  today: dayjs.Dayjs;
  calculateDaysSinceStart: number;
  weeks: any[];
  displayDuration: number;
  displayRegularity: string;
  checkDay: (taskId: string, dayCount: number) => void;
};

export const ChallengeInfoDisplay: React.FC<ChallengeInfoDisplayProps> = ({
  challenge,
  today,
  calculateDaysSinceStart,
  weeks,
  displayDuration,
  displayRegularity,
  checkDay,
}) => {
  console.log(
    "today",
    dayjs(challenge.taskDates[0]).startOf("day").isSame(today)
  );
  console.log(dayjs(challenge.taskDates[0]).startOf("day"), "taskdate");
  console.log(today, "today");
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col h-full w-full bg-black overflow-y-auto challenge-container">
      <div
        data-mobile={isMobile}
        className={`fixed     top-0 z-10 flex w-full justify-between ${challenge.color} text-black items-center p-3 h-[fit]   data-[mobile=true]:pt-24`}>
        <Link to={"/"}>
          <BackIcon />
        </Link>
        <span>Задание</span>
        <Link
          to={"/update/$taskId"}
          params={{
            taskId: challenge.id.toString(),
          }}>
          <SettingsIcon />
        </Link>
      </div>
      <div
        data-mobile={isMobile}
        className={`${challenge.color} pb-20 p-3  data-[mobile=true]:pt-24 w-full overflow-y-auto flex-1 pt-16`}>
        <div data-mobile={isMobile} className="flex justify-between">
          <div className="max-w-[70vw] text-xl leading-6 text-black font-druk mt-5">
            {challenge.title}
          </div>
          <div className="flex flex-col">
            <div
              className={`relative flex flex-col aspect-square w-[18.77vw] items-center justify-center rounded-full ${Colors[challenge.color]}`}>
              <div className="font-druk text-lg ">{displayDuration}</div>
              <div className="mb-1 mt-[-5px] text-[10px] font-medium">
                {displayRegularity}
              </div>
            </div>
            <div
              className={`relative flex aspect-square flex-col w-[18.77vw] items-center justify-center rounded-full ${Colors[challenge.color]}`}>
              <div className=" text-[10px] text-start font-medium">
                {challenge.regularity === "everyday" ? (
                  <div>
                    ЕЖЕ
                    <br /> ДНЕВ
                    <br /> ВНО
                  </div>
                ) : (
                  <div>
                    {challenge.daysOfWeek?.length} РАЗА В <br />
                    НЕДЕЛЮ
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {challenge.regularity === "everyday" ? (
          <div className="mb-[76px] grid grid-cols-5 gap-0 ">
            {challenge.taskDates.map((day, index) => {
              const hasChecked =
                challenge.userCheckedDates &&
                challenge.userCheckedDates.includes(day);
              const isToday =
                dayjs(day).startOf("day").isSame(today) && !hasChecked;
              const hasFailed = !isToday && !hasChecked && dayBeforeToday(day);

              return isToday ? (
                <button
                  onClick={() => {
                    checkDay(challenge.id.toString(), index);
                  }}
                  key={day}
                  className={`aspect-square ${Colors[challenge.color]} rounded-full font-druk text-sm  text-black`}>
                  <span>{index + 1}</span>
                </button>
              ) : hasFailed ? (
                <button
                  onClick={() => {
                    checkDay(challenge.id.toString(), index);
                  }}
                  key={day}
                  className={`aspect-square flex items-center justify-center bg-neutral-400 rounded-full  font-druk text-sm  text-black`}>
                  <CrossIcon />
                </button>
              ) : hasChecked ? (
                <button
                  onClick={() => {
                    checkDay(challenge.id.toString(), index);
                  }}
                  key={day}
                  className={`aspect-square text-white flex items-center justify-center bg-black rounded-full font-druk text-sm `}>
                  <Check />
                </button>
              ) : (
                <button
                  onClick={() => {
                    checkDay(challenge.id.toString(), index);
                  }}
                  key={day}
                  className={`aspect-square rounded-full border border-black font-druk text-sm  text-black`}>
                  <span>{index + 1}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            {weeks.map((weekGroup, weekIndex) => {
              const previousDaysCount = weeks
                .slice(0, weekIndex)
                .reduce((acc, week) => acc + week.days.length, 0);

              return (
                <div key={weekIndex} className="mb-5">
                  <h2 className="text-xl  text-black">
                    НЕДЕЛЯ {weekGroup.week}
                  </h2>
                  <div className="grid grid-cols-5 gap-0">
                    {weekGroup.days.map((day: string, indexDay: number) => {
                      const globalDayIndex = previousDaysCount + indexDay;
                      const hasChecked =
                        challenge.userCheckedDates &&
                        challenge.userCheckedDates.includes(day);
                      const isToday =
                        dayjs(day).startOf("day").isSame(today) && !hasChecked;
                      const hasFailed =
                        !isToday && !hasChecked && dayBeforeToday(day);

                      return isToday ? (
                        <button
                          onClick={() =>
                            checkDay(challenge.id.toString(), globalDayIndex)
                          }
                          key={day}
                          className={`aspect-square ${Colors[challenge.color]} rounded-full font-druk text-sm  text-black`}>
                          <span>{globalDayIndex + 1}</span>
                        </button>
                      ) : hasFailed ? (
                        <button
                          onClick={() =>
                            checkDay(challenge.id.toString(), globalDayIndex)
                          }
                          key={day}
                          className={`aspect-square flex items-center justify-center bg-neutral-400 rounded-full font-druk text-sm  text-black`}>
                          <CrossIcon />
                        </button>
                      ) : hasChecked ? (
                        <button
                          onClick={() =>
                            checkDay(challenge.id.toString(), globalDayIndex)
                          }
                          key={day}
                          className={`aspect-square text-white flex items-center justify-center bg-black rounded-full font-druk text-sm `}>
                          <Check />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            checkDay(challenge.id.toString(), globalDayIndex)
                          }
                          key={day}
                          className={`aspect-square rounded-full border border-black font-druk text-sm  text-black`}>
                          <span>{globalDayIndex + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {calculateDaysSinceStart < 0 &&
          !dayjs(challenge.challengeStartAt).startOf("day").isSame(today) && (
            <div className="mb-5">
              <div className="mb-1 border border-black"></div>
              <div className="flex justify-between text-black">
                <div className="text-xs font-light">НАЧАЛО ЗАДАНИЯ</div>
                <div className="text-2xl font-druk">
                  {dayjs(challenge.challengeStartAt).format("DD.MM.YYYY")}
                </div>
              </div>
            </div>
          )}

        {(calculateDaysSinceStart > 0 ||
          dayjs(challenge.challengeStartAt).startOf("day").isSame(today)) && (
          <div>
            <div className="mb-5">
              <div className="border border-black"></div>
              <div className="flex justify-between items-center text-black">
                <div className="text-[10px] font-light">ПРОШЛО ДНЕЙ</div>
                <div className="text-xl  font-druk ">
                  {Math.max(0, calculateDaysSinceStart)}
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="border border-black"></div>
              <div className="flex justify-between items-center text-black">
                <div className="text-[10px] font-light">УСПЕШНЫХ ДНЕЙ</div>
                <div className="text-xl  font-druk">
                  {challenge.userCheckedDates
                    ? challenge.userCheckedDates.length
                    : 0}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
