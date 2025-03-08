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

export const useChallenges = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateLastActiveDate } = useLastActiveDate();
  const { user } = useUser();
  const { updateTokens } = useTokens();

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
      // We don't need to update the cache here as we've already done so optimistically
      // This just ensures server sync and handles success states
      queryClient.setQueryData([getUserOnBoarding.name], true);
    },
    onError: (error) => {
      // On error, refresh data from server to ensure UI is in sync
      toast.error("Не удалось обновить задание. Пожалуйста, попробуйте снова.");
      queryClient.invalidateQueries({ queryKey: [getChallenges.name] });
    },
  });

  // Wrapper for updateChallengeMutation that provides immediate UI updates
  const fastUpdateChallenge = ({
    id,
    body,
  }: {
    id: number;
    body: UpdateChallenge;
  }) => {
    // IMMEDIATE UI UPDATE: Update the local cache immediately for fast UI response
    queryClient.setQueryData([getChallenges.name], (old: Challenge[] = []) => {
      return old.map((ch) =>
        ch.id === id ? ({ ...ch, ...body } as Challenge) : ch
      );
    });

    // Send the update to the server in the background
    updateChallengeMutation({
      id,
      body,
    });
  };

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
    // Найдем нужное задание, сразу выходим если не найдено
    const task = challenges?.find((task) => task.id === Number(taskId));
    if (!task) return;

    // Получим целевую дату на основе dayCount, выходим если нет даты
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

    if (isChallengeCompleted) {
      if (user.completedChallengesCount === 0) {
        updateCompletedChallengesCount(1);
        updateTokens(user.tokens + 10);
        toast.success("Вы успешно выполнили задание и получили 10 токенов");
      } else if (user.completedChallengesCount === 9) {
        updateCompletedChallengesCount(10);
        updateTokens(user.tokens + 100);
        toast.success("Вы успешно выполнили 10 заданий и получили 100 токенов");
      }
    }

    // Создаем обновленное задание
    const updatedTask = {
      ...task,
      userCheckedDates: updatedCheckedDays,
    };

    // Send the update with immediate UI response
    fastUpdateChallenge({
      id: task.id,
      body: updatedTask,
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

    // Return both the original and fast update functions
    updateChallengeMutation,
    fastUpdateChallenge,
    isUpdateChallengePending,

    deleteChallengeMutation,
    isDeleteChallengePending,

    checkDay,

    getOneChallege,
  };
};
