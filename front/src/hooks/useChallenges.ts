import {
  getChallenges,
  createNewChallenge,
  updateChallenge,
  deleteChallenge,
} from "@/api/challenge";
import { queryKeys } from "@/query-keys";
import { Challenge, UpdateChallenge } from "@back-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChallenges = () => {
  const queryClient = useQueryClient();

  const { data: challenges, isLoading: isChallengesLoading } = useQuery<
    Challenge[]
  >({
    queryKey: [queryKeys.challenges],
    queryFn: getChallenges,
  });

  const { mutate: createChallenge, isPending: isCreateChallengePending } =
    useMutation({
      mutationFn: createNewChallenge,
      onSuccess: (data) => {
        queryClient.setQueryData([queryKeys.challenges], (old: Challenge[]) => {
          return [...old, data];
        });
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
        [queryKeys.challenges],
        (old: Challenge[] = []) => {
          return old.map((ch) =>
            ch.id === updatedChallenge.id ? updatedChallenge : ch
          );
        }
      );
    },
  });

  const {
    mutate: deleteChallengeMutation,
    isPending: isDeleteChallengePending,
  } = useMutation({
    mutationFn: (challengeId: number) =>
      deleteChallenge(challengeId),
    onSuccess: (deletedChallenge) => {
      queryClient.setQueryData(
        [queryKeys.challenges],
        (old: Challenge[] = []) => {
          return old.filter((ch) => ch.id !== deletedChallenge.id);
        }
      );     
    },
  });

  const checkDay = (
    taskId: string,
    dayCount: number, // dayCount is now the second argument
    dayBeforeToday: (date: string) => boolean
  ) => {
    console.log("taskId:", taskId, typeof taskId);
    console.log(
      "Available task IDs:",
      challenges?.map((task) => task.id)
    );

    // Найдем нужное задание
    const task = challenges?.find((task) => task.id === Number(taskId));
    if (!task) return;

    // Получим целевую дату на основе dayCount
    const targetDate = task.taskDates[dayCount];
    console.log("no date", targetDate);
    if (!targetDate) return;

    // Проверим, раньше ли сегодняшней даты эта целевая
    const isBeforeToday = dayBeforeToday(targetDate);
    console.log("day is not before");
    if (!isBeforeToday) return;

    // Определим, был ли день уже проверен
    const isDateChecked = task.userCheckedDates?.includes(targetDate);

    // Обновляем состояние дней
    const updatedCheckedDays = isDateChecked
      ? task.userCheckedDates?.filter(
          (checkedDate) => checkedDate !== targetDate
        ) || [] // Убираем дату из списка
      : [...(task.userCheckedDates || []), targetDate]; // Добавляем дату в список

    // Локальное состояние для хранения обновленных дней
    const updatedTask = {
      ...task, // копируем все свойства задачи
      userCheckedDates: updatedCheckedDays, // обновляем только userCheckedDates
    };

    // Вызов мутации для обновления на сервере
    updateChallengeMutation({
      id: task.id,
      body: updatedTask, // Отправляем обновленную задачу
    });
  };

  const getOneChallege = (id: number): Challenge | undefined => {
    return challenges?.find((ch) => ch.id === id);
  };
  return {
    challenges,
    isChallengesLoading,

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
