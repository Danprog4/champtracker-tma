import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUserOnBoarding, getChallenges, getPremium } from "@/api/challenge";

export const usePrefetchQueries = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["onBoarding"],
      queryFn: getUserOnBoarding,
    });

    queryClient.prefetchQuery({
      queryKey: ["challenges"],
      queryFn: getChallenges,
    });

    queryClient.prefetchQuery({
      queryKey: ["premium"],
      queryFn: getPremium,
    });
  }, [queryClient]);
};
