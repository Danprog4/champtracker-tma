import { updateTokens } from "@/api/challenge";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTokens = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (amount: number) => updateTokens(amount),
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: [updateTokens.name] });
    },
  });

  return { updateTokens: mutate };
};
