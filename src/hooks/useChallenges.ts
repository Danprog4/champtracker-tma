import {
  createNewChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
  updateCompletedChallengesCount,
  getUserOnBoarding,
} from "@/api/challenge";
import { dayBeforeToday, isDateUpdate } from "@/lib/dateUtils";
import { Challenge, UpdateChallenge } from "@/types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useLastActiveDate } from "./useLastActiveDate";
import { useUser } from "./useUser";
import { useTokens } from "./useTokens";
import { toast } from "sonner";
import dayjs from "dayjs";
import { isPremium } from "@/lib/challengeUtills";
import { useState } from "react";

export const useChallenges = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateLastActiveDate } = useLastActiveDate();
  const { user } = useUser();
  const { updateTokens } = useTokens();
  // State to track which days are currently being updated
  const [updatingDays, setUpdatingDays] = useState<Set<string>>(new Set());

  const { data: challenges } = useSuspenseQuery<Challenge[]>({
    queryKey: [getChallenges.name],
    queryFn: getChallenges,
  });

  const { mutateAsync: createChallenge, isPending: isCreateChallengePending } =
    useMutation({
      mutationFn: createNewChallenge,
      onSuccess: (data) => {
        queryClient.setQueryData(
          [getChallenges.name],
          (old: Challenge[] = []) => {
            return [...old, data];
          }
        );
      },
    });

  const {
    mutate: updateChallengeMutation,
    isPending: isUpdateChallengePending,
  } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateChallenge }) =>
      updateChallenge(body, id),
    onSuccess: (updatedChallenge) => {
      queryClient.setQueryData(
        [getChallenges.name],
        (old: Challenge[] = []) => {
          return old.map((ch) =>
            ch.id === updatedChallenge.id ? updatedChallenge : ch
          );
        }
      );
      queryClient.setQueryData([getUserOnBoarding.name], true);

      // Remove the day from the updating set once completed
      setUpdatingDays((prevState) => {
        const newState = new Set(prevState);
        // We need to remove all potential keys for this challenge since we don't know which day was being updated
        [...newState].forEach((key) => {
          if (key.startsWith(`${updatedChallenge.id}-`)) {
            newState.delete(key);
          }
        });
        return newState;
      });
    },
    onError: (error, { body, id }) => {
      // Revert the optimistic update if the server request fails
      toast.error("Не удалось обновить задание. Пожалуйста, попробуйте снова.");
      // Refresh the data from server to ensure UI is in sync
      queryClient.invalidateQueries({ queryKey: [getChallenges.name] });

      // Remove the day from the updating set on error
      setUpdatingDays((prevState) => {
        const newState = new Set(prevState);
        // We need to remove all potential keys for this challenge since we don't know which day was being updated
        [...newState].forEach((key) => {
          if (key.startsWith(`${id}-`)) {
            newState.delete(key);
          }
        });
        return newState;
      });
    },
  });

  const {
    mutate: deleteChallengeMutation,
    isPending: isDeleteChallengePending,
  } = useMutation({
    mutationFn: (challengeId: number) => deleteChallenge(challengeId),
    onSuccess: (deletedChallenge: { id: number }) => {
      queryClient.setQueryData(
        [getChallenges.name],
        (old: Challenge[] = []) => {
          return old.filter((ch) => ch.id !== deletedChallenge.id);
        }
      );
      navigate({ to: "/" });
    },
  });

  const checkDay = (
    taskId: string,
    dayCount: number // dayCount is now the second argument
  ) => {
    // Найдем нужное задание
    const task = challenges?.find((task) => task.id === Number(taskId));
    if (!task) return;

    // Получим целевую дату на основе dayCount
    const targetDate = task.taskDates[dayCount];

    if (!targetDate) return;

    // Create a unique key for this task day
    const dayKey = `${task.id}-${dayCount}`;

    // If already updating this day, exit to prevent race conditions
    if (updatingDays.has(dayKey)) {
      return;
    }

    // Add this day to the updating set
    setUpdatingDays((prevState) => {
      const newState = new Set(prevState);
      newState.add(dayKey);
      return newState;
    });

    // Проверим, раньше ли сегодняшней даты эта целевая
    const isBeforeToday = dayBeforeToday(targetDate);

    if (!isBeforeToday) {
      // Remove from updating set if we're exiting early
      setUpdatingDays((prevState) => {
        const newState = new Set(prevState);
        newState.delete(dayKey);
        return newState;
      });
      return;
    }

    // Определим, был ли день уже проверен
    const isDateChecked = task.userCheckedDates?.includes(targetDate);

    try {
      // Обновляем состояние дней
      const updatedCheckedDays = isDateChecked
        ? task.userCheckedDates?.filter(
            (checkedDate) => checkedDate !== targetDate
          ) || []
        : isDateUpdate(user.lastActiveDate)
          ? (() => {
              updateLastActiveDate();
              const tokenAmount = isPremium(user) ? 10 : 5;
              updateTokens(user.tokens + tokenAmount);
              toast.success(`Вы успешно получили ${tokenAmount} токенов`);
              return [...(task.userCheckedDates || []), targetDate];
            })()
          : [...(task.userCheckedDates || []), targetDate];

      // Check if challenge is completed using the updatedCheckedDays
      const isChallengeCompleted =
        updatedCheckedDays.length === task.taskDates.length;

      console.log(
        updatedCheckedDays,
        task.taskDates,
        isChallengeCompleted,
        "d"
      );

      if (isChallengeCompleted) {
        if (user.completedChallengesCount === 0) {
          updateCompletedChallengesCount(1);
          updateTokens(user.tokens + 10);
          toast.success("Вы успешно выполнили задание и получили 10 токенов");
        } else if (user.completedChallengesCount === 9) {
          updateCompletedChallengesCount(10);
          updateTokens(user.tokens + 100);
          toast.success(
            "Вы успешно выполнили 10 заданий и получили 100 токенов"
          );
        }
      }

      // Создаем обновленное задание
      const updatedTask = {
        ...task,
        userCheckedDates: updatedCheckedDays,
      };

      // Оптимистично обновляем кэш запроса перед отправкой на сервер
      queryClient.setQueryData(
        [getChallenges.name],
        (old: Challenge[] = []) => {
          return old.map((ch) =>
            ch.id === updatedTask.id ? (updatedTask as Challenge) : ch
          );
        }
      );

      // Вызов мутации для обновления на сервере
      updateChallengeMutation({
        id: task.id,
        body: updatedTask,
      });
    } catch (error) {
      // If anything goes wrong in this function, make sure to clean up the updating state
      setUpdatingDays((prevState) => {
        const newState = new Set(prevState);
        newState.delete(dayKey);
        return newState;
      });
      console.error("Error in checkDay:", error);
      toast.error("Произошла ошибка при обновлении задания");
    }
  };

  const getOneChallege = (id: number): Challenge | null => {
    const found = challenges.find((ch) => ch.id === id);

    if (!found) {
      return null;
    }

    return found;
  };

  return {
    challenges,

    createChallenge,
    isCreateChallengePending,

    updateChallengeMutation,
    isUpdateChallengePending,

    deleteChallengeMutation,
    isDeleteChallengePending,

    checkDay,

    getOneChallege,
  };
};
