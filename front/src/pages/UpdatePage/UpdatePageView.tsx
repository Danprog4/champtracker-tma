import React from "react";
import { Link } from "@tanstack/react-router";
import CrossImg from "../../assets/images/Krestiksvgpng.ru_.svg";
import RegularityModal from "@/components/RegularityModal/RegularityModal";
import DurationModal from "@/components/DurationModal/DurationModal";
import StartModal from "@/components/StartModal/StartModal";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import Notifications from "@/components/Notifications/Notifications";
import Title from "@/components/Tittle/Tittle";
import ColorsSchema from "@/components/Colors/ColorsSchema";

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
  handleSave,
  checkIfChanged,
  deleteChallengeMutation,
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className={`${color} h-[23%] pb-5`}>
        <div className="relative mb-2 mt-8 flex w-full">
          <Link
            to={`/challenge/$taskId`}
            params={{
              taskId: task.id.toString(),
            }}
            className="absolute inset-0">
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            Редактировать
          </span>
        </div>
        <Title title={title} setTitle={setTitle} />
      </div>
      <div className="mt-2 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Условия</span>
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
      <Notifications
        notifications={notifications}
        isNotifications={isNotifications}
        setIsNotifications={setIsNotifications}
        setNotifications={setNotifications}
      />

      <ColorsSchema color={color} setColor={setColor} />
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
          disabled={!checkIfChanged}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
