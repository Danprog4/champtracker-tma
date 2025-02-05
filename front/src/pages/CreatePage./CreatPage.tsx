import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChallenges } from "@/hooks/useChallenges";
import { toast } from "sonner";
import { formatDate } from "@/lib/dateUtils";
import { getDatesForDaysOfWeek } from "@/lib/dateUtils";
import { categories } from "@/cards.config";
import CreateDump from "./CreatePageView";

const CreateSmart: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { createChallenge } = useChallenges();

  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id))
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  const [title, setTitle] = useState(card?.title || "");
  const [isNotifications, setIsNotifications] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [color, setColor] = useState(category?.color || "bg-pink-200");
  const [regularity, setRegularity] = useState<"everyday" | "fewTimesAWeek">(
    "everyday"
  );
  const [duration, setDuration] = useState(regularity === "everyday" ? 30 : 84);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  useEffect(() => {
    if (regularity === "everyday") {
      setDuration(30);
    } else if (regularity === "fewTimesAWeek") {
      setDuration(84);
    } else {
      setDuration(30);
    }
  }, [regularity]);

  const handleSave = async () => {
    if (!title || title === "НАЗВАНИЕ ЗАДАНИЯ") {
      toast("Напишите название задания");
      return;
    }

    const startDate = new Date(date ? date : Date.now());

    if (formatDate(startDate) < formatDate(new Date(Date.now()))) {
      toast("Напишите возможное время (не в прошлом)");
      return;
    }

    const taskDays = getDatesForDaysOfWeek(
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
        taskDates: taskDays,
        challengeStartAt: startDate.toISOString(),
      });
      toast("Задание успешно сохранено!");
      navigate("/");
    } catch (error) {
      toast("Ошибка при сохранении задания");
    }
  };

  return (
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
    />
  );
};

export default CreateSmart;
