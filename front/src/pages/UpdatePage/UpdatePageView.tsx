import React from "react";
import { Link } from "@tanstack/react-router";
import CrossImg from "../../assets/images/Krestiksvgpng.ru_.svg";
import RegularityModal from "@/components/RegularityModal/RegularityModal";
import DurationModal from "@/components/DurationModal/DurationModal";
import StartModal from "@/components/StartModal/StartModal";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Colors } from "@/bgColors.config";
import { Alert } from "@/components/ui/alert";

type UpdatePageProps = {
  task: any;
  color: string;
  setColor: (color: string) => void;
  title: string;
  setTitle: (title: string) => void;
  regularity: "everyday" | "fewTimesAWeek";
  setRegularity: (regularity: "everyday" | "fewTimesAWeek") => void;
  duration: number;
  setDuration: (duration: number) => void;
  startedDate: any;
  daysOfWeek: number[];
  setDaysOfWeek: (days: number[]) => void;
  notifications: string;
  setNotifications: (notifications: string) => void;
  isNotifications: boolean;
  setIsNotifications: (isNotifications: boolean) => void;
  handleReset: () => void;
  handleSave: () => void;
  checkIfChanged: boolean;
  deleteChallengeMutation: (id: number) => void;
};

const UpdatePage: React.FC<UpdatePageProps> = ({
  task,
  color,
  setColor,
  title,
  setTitle,
  regularity,
  setRegularity,
  duration,
  setDuration,
  startedDate,
  daysOfWeek,
  setDaysOfWeek,
  notifications,
  setNotifications,
  isNotifications,
  setIsNotifications,
  handleReset,
  handleSave,
  checkIfChanged,
  deleteChallengeMutation,
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className={`${color} h-[20vh] pb-5`}>
        <div className="relative mb-2 mt-8 flex w-full">
          <Link
            to={`/challenge/$taskId`}
            params={{
              taskId: task.id.toString(),
            }}
            className="absolute inset-0"
          >
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            Редактировать
          </span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <span className="mt-4 text-sm">Название</span>
          <div
            className={cn(
              "mr-[5%] mt-3 text-2xl font-extrabold uppercase",
              title === "НАЗВАНИЕ ЗАДАНИЯ" && "opacity-[0.3]"
            )}
          >
            <input
              type="text"
              className="w-full border-none bg-transparent text-black placeholder:text-gray-500 focus:outline-none"
              value={title}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                const filteredValue = inputValue.replace(
                  /[^a-zA-Zа-яА-Я\s]/g,
                  ""
                );
                setTitle(filteredValue);
              }}
              placeholder="НАЗВАНИЕ ЗАДАНИЯ"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-5 pt-5 text-start">
        <span className="mb-2 mt-2 text-gray-300">Условия</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <RegularityModal
          {...{
            setDuration,
            regularity,
            setRegularity,
            daysOfWeek,
            setDaysOfWeek,
          }}
        />
        <DurationModal
          {...{ duration: Number(duration), setDuration, regularity }}
        />
        <StartModal
          disabled={true}
          startedDate={startedDate.format("DD.MM.YYYY")}
        />
      </div>

      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Уведомления</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex h-[44px] w-[90vw] items-center justify-between rounded-md bg-gray-700 p-[10px]">
          <span>Включить уведомления</span>
          <Switch
            checked={isNotifications}
            onChange={() => setIsNotifications(!isNotifications)}
          />
        </div>
        {isNotifications && (
          <div className="flex h-[60px] w-[90vw] flex-col justify-center rounded-md bg-gray-700 p-[10px]">
            <span>Текст для уведомления</span>
            <input
              value={notifications}
              className="border-none bg-transparent text-gray-300 placeholder:text-gray-500 focus:outline-none"
              placeholder="Мотивируй себя"
              onChange={(e) => {
                const inputValue = e.target.value;
                const filteredValue = inputValue.replace(
                  /[^a-zA-Zа-яА-Я\s]/g,
                  ""
                );
                setNotifications(filteredValue);
              }}
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Цвет</span>
      </div>

      <div className="mb-5 grid grid-cols-5 gap-0">
        {Colors.map((classColor: string) => (
          <div
            key={classColor}
            className={cn(
              `h-[78px] w-[78px] cursor-pointer rounded-full ${classColor}`,
              color === classColor && "border-4 border-white"
            )}
            onClick={() => setColor(classColor)}
          ></div>
        ))}
      </div>
      <div className="mb-5 flex items-center justify-center">
        <Alert
          bgColor={"bg-gray-500"}
          desc={`После нажатия кнопки продолжить вы потеряете весь прогресс и задание автоматически начнется с сегодняшнего дня`}
          question={"Вы действительно хотите сбросить весь ваш прогресс?"}
          title={"СБРОСИТЬ ЗАДАНИЕ"}
          handleFunc={handleReset}
        />
      </div>
      <div className="flex items-center justify-center pb-24">
        <Alert
          bgColor={"bg-red-500"}
          desc={`После нажатия кнопки продолжить вы навсегда удалите задание без возможности к восстановлению`}
          question={"Вы действительно хотите удалить ваше задание?"}
          title={"УДАЛИТЬ ЗАДАНИЕ"}
          handleFunc={() => {
            deleteChallengeMutation(task.id);
          }}
        />
      </div>

      <div className="flex items-center justify-center pl-0 font-extrabold">
        <button
          onClick={handleSave}
          className={cn(
            "fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-gray-600 p-5",
            checkIfChanged && "bg-pink-600"
          )}
          disabled={!checkIfChanged}
        >
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
