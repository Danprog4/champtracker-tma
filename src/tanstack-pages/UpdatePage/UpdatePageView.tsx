import React from "react";
import { Link } from "@tanstack/react-router";
import RegularityModal from "@/components/RegularityModal/RegularityModal";
import DurationModal from "@/components/DurationModal/DurationModal";
import StartModal from "@/components/StartModal/StartModal";
import Notifications from "@/components/Notifications/Notifications";
import Title from "@/components/Tittle/Tittle";
import ColorsSchema from "@/components/Colors/ColorsSchema";
import { CrossIcon } from "@/icons/Cross";
import { DrawerAlert } from "@/components/ui/alert";
import { Colors } from "@/configs/bgColors.config";
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
    <div className="flex h-full flex-col mb-28 overflow-x-hidden">
      <div className="flex flex-col w-full relative">
        <div
          className={`fixed top-0 h-[fit] pt-24  pl-3 flex w-full pb-3 items-end ${color}`}>
          <Link
            to={`/challenge/$taskId`}
            params={{
              taskId: task.id.toString(),
            }}
            className="absolute text-black">
            <CrossIcon />
          </Link>
          <span className=" w-full text-center font-medium text-black">
            Редактировать
          </span>
        </div>
        <div className={`${color} min-h-[fit] pb-1 pt-24`}>
          <Title title={title} setTitle={setTitle} />
        </div>
      </div>
      <div className="flex flex-col mt-7">
        <div className=" flex flex-col pl-3  text-start">
          <span className="mb-2 text-neutral-300">Условия</span>
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

        <div className="flex items-center justify-center ">
          <DrawerAlert
            bgColor={"bg-red-500"}
            desc={`После нажатия кнопки продолжить вы навсегда удалите задание без возможности к восстановлению`}
            question={
              "Вы уверены,  что хотите удалить это задание? Весь прогресс будет утерян."
            }
            title={"УДАЛИТЬ ЗАДАНИЕ"}
            handleFunc={() => {
              deleteChallengeMutation(task.id);
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center pl-0  mb-10">
        <button
          onClick={handleSave}
          className={`fixed bottom-7 shadow-xl  shadow-black  flex h-[45px] w-[94vw] font-druk text-xs items-center justify-center rounded-lg ${
            checkIfChanged ? Colors[color] : "bg-neutral-600"
          } p-5`}
          disabled={!checkIfChanged}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
