import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useChallenges } from "@/hooks/useChallenges";
import { getDatesForDaysOfWeek } from "@/lib/dateUtils";
import dayjs from "dayjs";
import UpdatePageView from "./UpdatePageView";

const UpdatePage: React.FC = () => {
  const taskId = Number(useParams({ strict: false }).taskId);
  const {
    getOneChallege,
    updateChallengeMutation,
    deleteChallengeMutation,
    fastUpdateChallenge,
  } = useChallenges();
  const task = getOneChallege(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  const [isNotifications, setIsNotifications] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [color, setColor] = useState(task.color);
  const [title, setTitle] = useState(task.title);
  const [regularity, setRegularity] = useState(task.regularity);
  const [duration, setDuration] = useState(task.duration);
  const startedDate = dayjs(task.challengeStartAt);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(task.daysOfWeek || []);

  const taskDays = useMemo(() => {
    return getDatesForDaysOfWeek(startedDate, duration, daysOfWeek, regularity);
  }, [duration, daysOfWeek, regularity]);

  const checkIfChanged = useMemo(() => {
    if (!task) return false;
    return (
      color !== task.color ||
      duration !== task.duration ||
      title !== task.title ||
      regularity !== task.regularity ||
      (daysOfWeek &&
        daysOfWeek.some((day, index) => day !== task.daysOfWeek?.[index]))
    );
  }, [color, duration, title, regularity, daysOfWeek, task]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!taskId || !getOneChallege(Number(taskId))) {
      navigate({ to: "/" });
    }
  }, [taskId, getOneChallege, navigate]);

  const handleSave = () => {
    if (!taskId) return;

    const updatedTask = {
      ...task,
      color,
      duration,
      regularity,
      daysOfWeek,
      title,
      taskDates: taskDays,
      userCheckedDates:
        regularity !== task.regularity ? [] : task.userCheckedDates,
    };

    fastUpdateChallenge({ id: Number(taskId), body: updatedTask });
    navigate({ to: "/" });
  };

  console.log(startedDate, "startedDate5");

  return (
    <UpdatePageView
      task={task}
      color={color}
      setColor={setColor}
      title={title}
      setTitle={setTitle}
      regularity={regularity}
      setRegularity={setRegularity}
      duration={duration}
      setDuration={setDuration}
      startedDate={startedDate}
      daysOfWeek={daysOfWeek}
      setDaysOfWeek={setDaysOfWeek}
      notifications={notifications}
      setNotifications={setNotifications}
      isNotifications={isNotifications}
      setIsNotifications={setIsNotifications}
      handleSave={handleSave}
      checkIfChanged={checkIfChanged}
      deleteChallengeMutation={deleteChallengeMutation}
    />
  );
};

export default UpdatePage;
