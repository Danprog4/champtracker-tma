import React from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

type NotificationsProps = {
  notifications: string;
  setNotifications: (notifications: string) => void;
  isNotifications: boolean;
  setIsNotifications: (isNotifications: boolean) => void;
};

const Notifications: React.FC<NotificationsProps> = ({
  isNotifications,
  setIsNotifications,
  setNotifications,
  notifications,
}) => {
  return (
    <>
      <div className="mt-3 flex  flex-col pl-3 pt-4 text-start">
        <span className="mb-2 text-zinc-300">Уведомления</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex h-[45px] w-[94vw] items-center justify-between rounded-md bg-zinc-800 p-[10px]">
          <span>Включить уведомления</span>
          <Switch
            checked={isNotifications}
            onClick={() => {
              toast.error("К сожалению, уведомления пока не доступны");
            }}
          />
        </div>
        {isNotifications && (
          <div className="flex h-[60px] w-[90vw] flex-col justify-center rounded-md bg-zinc-800 p-[10px]">
            <span>Текст для уведомления</span>
            <input
              value={notifications}
              className="border-none bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:outline-none"
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
    </>
  );
};

export default Notifications;
