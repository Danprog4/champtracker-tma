import { getUserOnBoarding, updateOnBoarding } from "@/api/challenge";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useOnBoarding = () => {
  const queryClient = useQueryClient();

  // Fetch user onboarding status
  const { data: onBoarding } = useSuspenseQuery({
    queryKey: ["onBoarding"],
    queryFn: getUserOnBoarding,
  });

  const mutation = useMutation({
    mutationFn: (newStatus: boolean) => updateOnBoarding(newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onBoarding"] });
    },
  });

  return {
    isOnBoarding: onBoarding?.onBoarding,
    updateOnBoarding: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
