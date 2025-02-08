import { getChallenges, createNewChallenge } from '@/api/challenge';
import { queryKeys } from '@/query-keys';
import { Challenge } from '@back-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

  const getOneChallege = (id: number): Challenge | undefined => {
    return challenges?.find((ch) => ch.id === id);
  };
  return {
    challenges,
    isChallengesLoading,

    createChallenge,
    isCreateChallengePending,

    getOneChallege,
  };
};
