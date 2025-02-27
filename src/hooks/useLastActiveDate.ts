import { updateLastActiveDate as updateLastActiveDateApi } from "@/api/challenge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/api/challenge";

export const useLastActiveDate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateLastActiveDateApi(),
    onSuccess: () => {
      // Invalidate and refetch user data to get updated lastActiveDate
      queryClient.invalidateQueries({ queryKey: [getUser.name] });
    },
  });

  return {
    updateLastActiveDate: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
