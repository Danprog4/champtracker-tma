import React from "react";
import { Link } from "@tanstack/react-router";
import { Colors } from "@/bgColors.config";
import DurationModal from "@/components/DurationModal/DurationModal";
import RegularityModal from "@/components/RegularityModal/RegularityModal";
import StartModal from "@/components/StartModal/StartModal";
import { Switch } from "@/components/ui/switch";
import CrossImg from "../../assets/images/Krestiksvgpng.ru_.svg";
import { Dayjs } from "dayjs";

interface CreateDumpProps {
  card: any;
  title: string;
  setTitle: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  regularity: "everyday" | "fewTimesAWeek";
  setRegularity: (value: "everyday" | "fewTimesAWeek") => void;
  duration: number;
  setDuration: (value: number) => void;
  date: Dayjs | undefined;
  setDate: (value: Dayjs | undefined) => void;
  isNotifications: boolean;
  setIsNotifications: (value: boolean) => void;
  notifications: string;
  setNotifications: (value: string) => void;
  daysOfWeek: number[];
  setDaysOfWeek: (value: number[]) => void;
  handleSave: () => void;
}

const CreateDump: React.FC<CreateDumpProps> = ({
  card,
  title,
  setTitle,
  color,
  setColor,
  regularity,
  setRegularity,
  duration,
  setDuration,
  date,
  setDate,
  isNotifications,
  setIsNotifications,
  notifications,
  setNotifications,
  daysOfWeek,
  setDaysOfWeek,
  handleSave,
}) => {
  const getNavigationPath = () => (card ? `/card/${card.id}` : "/new");

  return (
    <div className="flex h-screen flex-col">
      <div className={`${color} h-[23%]`}>
        <div className="relative mb-2 mt-8 flex w-full">
          <Link to={getNavigationPath()} className="absolute inset-0">
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            Новое задание
          </span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <div className="mr-[5%] mt-4 flex justify-between text-sm">
            <span>Название</span>
            {title !== "" && <span>{title.length}/28</span>}
          </div>
          <div
            className={`mr-[5%] mt-3 text-2xl font-extrabold uppercase ${
              title === "НАЗВАНИЕ ЗАДАНИЯ" ? "opacity-[0.3]" : ""
            }`}
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
          regularity={regularity}
          setRegularity={setRegularity}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
        />
        <DurationModal
          duration={duration}
          setDuration={setDuration}
          id={card?.id}
          regularity={regularity}
        />
        <StartModal date={date} setDate={setDate} disabled={false} />
      </div>
      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Уведомления</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex h-[44px] w-[90vw] items-center justify-between rounded-md bg-gray-700 p-[10px]">
          <span>Включить уведомления</span>
          <Switch onClick={() => setIsNotifications(!isNotifications)} />
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
      <div className="mb-20 grid grid-cols-5 gap-0">
        {Colors.map((classColor: string) => (
          <div
            key={classColor}
            className={`h-[78px] w-[78px] cursor-pointer rounded-full ${classColor} ${
              color === classColor ? "border-4 border-white" : ""
            }`}
            onClick={() => setColor(classColor)}
          ></div>
        ))}
      </div>
      <div className="flex items-center justify-center pl-0 font-extrabold">
        <button
          onClick={handleSave}
          className={`fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-600 p-5 ${
            title.length === 0 ? "bg-gray-600" : ""
          }`}
        >
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default CreateDump;
