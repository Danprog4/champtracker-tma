import React from "react";
import { Link } from "@tanstack/react-router";
import DurationModal from "@/components/DurationModal/DurationModal";
import RegularityModal from "@/components/RegularityModal/RegularityModal";
import StartModal from "@/components/StartModal/StartModal";
import { CrossIcon } from "@/icons/Cross";
import { Dayjs } from "dayjs";
import { BuyPremium } from "@/components/BuyPremium";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { Challenge } from "@/types";
import Notifications from "@/components/Notifications/Notifications";
import Title from "@/components/Tittle/Tittle";
import ColorsSchema from "@/components/Colors/ColorsSchema";
import { Colors } from "@/configs/bgColors.config";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
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
  challenges: Challenge[];
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
  challenges,
}) => {
  const { user } = useUser();
  const getNavigationPath = () => (card ? `/card/${card.id}` : "/new");

  return (
    <div className="flex min-h-screen flex-col mb-12">
      <div className={`fixed top-0  h-[5vh]  pt-4 pl-3 flex w-full ${color}`}>
        <Link to={getNavigationPath()} className="absolute text-black ">
          <CrossIcon />
        </Link>
        <span className="w-full text-center text-black">Новое задание</span>
      </div>
      <div className={`${color} min-h-[18vh] pb-2 pt-20`}>
        <Title title={title} setTitle={setTitle} />
      </div>
      <div className="mt-3 flex flex-col pl-3 pt-4 text-start">
        <span className="mb-2 text-gray-300">Условия</span>
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
      <Notifications
        notifications={notifications}
        isNotifications={isNotifications}
        setIsNotifications={setIsNotifications}
        setNotifications={setNotifications}
      />
      <ColorsSchema color={color} setColor={setColor} />
      <div className="flex items-center justify-center pl-0  mb-10">
        {isPremium(user) || challenges.length < 1 ? (
          <button
            onClick={handleSave}
            className={`fixed bottom-7 ${Colors[color]} shadow-xl shadow-black z-0 flex h-[45px] w-[94vw] font-druk text-xs items-center justify-center rounded-lg  p-5 ${
              title.length === 0 ? "bg-gray-600" : ""
            }`}>
            СОХРАНИТЬ
          </button>
        ) : (
          <BuyPremium>
            <button
              className={`fixed hover:opacity-90 bottom-7 flex h-[45px] w-[94vw] items-center gap-1 justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 p-5 ${
                title.length === 0 ? "bg-gray-600" : ""
              }`}>
              <span>ПРЕМИУМ</span>
              <TelegramStar className="-translate-y-0.5" />
            </button>
          </BuyPremium>
        )}
      </div>
    </div>
  );
};

export default CreateDump;
