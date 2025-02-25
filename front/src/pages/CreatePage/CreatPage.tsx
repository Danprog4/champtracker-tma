import { categories } from "@/configs/cards.config";
import { useChallenges } from "@/hooks/useChallenges";
import { getDatesForDaysOfWeek } from "@/lib/dateUtils";
import { useNavigate, useParams } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CreateDump from "./CreatePageView";
import { FullPageSpinner } from "@/components/shared/FullPageSpinner";
import { Colors } from "@/configs/bgColors.config";
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateSmart: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const { createChallenge, isCreateChallengePending } = useChallenges();
  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id))
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  const [title, setTitle] = useState(card?.title || "");
  const [isNotifications, setIsNotifications] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [color, setColor] = useState(category?.color || Object.keys(Colors)[0]);
  const [regularity, setRegularity] = useState<"everyday" | "fewTimesAWeek">(
    "everyday"
  );
  const [duration, setDuration] = useState(regularity === "everyday" ? 30 : 84);
  const [date, setDate] = useState<Dayjs | undefined>(undefined);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const { challenges } = useChallenges();

  useEffect(() => {
    setDuration(regularity === "everyday" ? 30 : 84);
  }, [regularity]);

  const handleSave = async () => {
    if (!title || title === "НАЗВАНИЕ ЗАДАНИЯ") {
      toast.error("Напишите название задания");
      return;
    }

    const startDate = date ? dayjs(date) : dayjs();

    if (startDate.startOf("day") < dayjs().startOf("day")) {
      toast.error("Напишите возможное время");
      return;
    }

    const taskDates = getDatesForDaysOfWeek(
      startDate,
      duration,
      daysOfWeek,
      regularity
    );

    try {
      await createChallenge({
        title,
        duration,
        color,
        regularity,
        daysOfWeek,
        taskDates,
        challengeStartAt: dayjs(startDate).toISOString(),
      });
      navigate({ to: "/" });
      toast.success("Задание успешно сохранено!");
    } catch (error) {
      toast.error("Ошибка при сохранении задания");
    }
  };

  return (
    <>
      {isCreateChallengePending && <FullPageSpinner />}
      <CreateDump
        card={card}
        title={title}
        setTitle={setTitle}
        color={color}
        setColor={setColor}
        regularity={regularity}
        setRegularity={setRegularity}
        duration={duration}
        setDuration={setDuration}
        date={date}
        setDate={setDate}
        isNotifications={isNotifications}
        setIsNotifications={setIsNotifications}
        notifications={notifications}
        setNotifications={setNotifications}
        daysOfWeek={daysOfWeek}
        setDaysOfWeek={setDaysOfWeek}
        handleSave={handleSave}
        challenges={challenges}
      />
    </>
  );
};

export default CreateSmart;
