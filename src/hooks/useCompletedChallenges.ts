import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompletedChallengesCount } from "@/api/challenge";

export const useCompletedChallenges = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (count: number) => updateCompletedChallengesCount(count),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [updateCompletedChallengesCount.name],
      });
    },
  });

  return { mutation };
};
