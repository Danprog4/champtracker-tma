import { updateTotalActiveDays } from "@/api/challenge";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTotalActiveDays = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (totalActiveDays: number) => updateTotalActiveDays(totalActiveDays),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return { updateTotalActiveDays: mutate };
};
