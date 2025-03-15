import {
  createNewChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from '@/api/challenge';
import { dayBeforeToday } from '@/lib/dateUtils';
import { queryKeys } from '@/query-keys';
import { Challenge, UpdateChallenge } from '@back-types';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useChallenges = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: challenges } = useSuspenseQuery<Challenge[]>({
    queryKey: [queryKeys.challenges],
    queryFn: getChallenges,
  });

  const { mutate: createChallenge, isPending: isCreateChallengePending } =
    useMutation({
      mutationFn: createNewChallenge,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.challenges] });
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
            ch.id === updatedChallenge.id ? updatedChallenge : ch,
          );
        },
      );
    },
  });

  const {
    mutate: deleteChallengeMutation,
    isPending: isDeleteChallengePending,
  } = useMutation({
    mutationFn: (challengeId: number) => deleteChallenge(challengeId),
    onSuccess: (deletedChallenge: { id: number }) => {
      queryClient.setQueryData(
        [queryKeys.challenges],
        (old: Challenge[] = []) => {
          return old.filter((ch) => ch.id !== deletedChallenge.id);
        },
      );
      navigate({ to: '/' });
    },
  });

  const checkDay = (
    taskId: string,
    dayCount: number, // dayCount is now the second argument
  ) => {
    // Найдем нужное задание
    const task = challenges?.find((task) => task.id === Number(taskId));
    if (!task) return;

    // Получим целевую дату на основе dayCount
    const targetDate = task.taskDates[dayCount];

    if (!targetDate) return;

    // Проверим, раньше ли сегодняшней даты эта целевая
    const isBeforeToday = dayBeforeToday(targetDate);

    if (!isBeforeToday) return;

    // Определим, был ли день уже проверен
    const isDateChecked = task.userCheckedDates?.includes(targetDate);

    // Обновляем состояние дней
    const updatedCheckedDays = isDateChecked
      ? task.userCheckedDates?.filter(
          (checkedDate) => checkedDate !== targetDate,
        ) || [] // Убираем дату из списка
      : [...(task.userCheckedDates || []), targetDate]; 
     // Добавляем дату в список

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
