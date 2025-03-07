import { getUserOnBoarding, updateOnBoarding } from "@/api/challenge";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useOnBoarding = () => {
  const queryClient = useQueryClient();

  const { data: onBoarding } = useSuspenseQuery({
    queryKey: [getUserOnBoarding.name],
    queryFn: getUserOnBoarding,
  });

  const mutation = useMutation({
    mutationFn: (newStatus: boolean) => updateOnBoarding(newStatus),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getUserOnBoarding.name] });
    },
  });

  return {
    isOnBoarding: onBoarding,
    updateOnBoarding: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
