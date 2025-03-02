import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUserOnBoarding, getChallenges, getPremium } from "@/api/challenge";

export const usePrefetchQueries = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [getUserOnBoarding.name],
      queryFn: getUserOnBoarding,
    });

    queryClient.prefetchQuery({
      queryKey: [getChallenges.name],
      queryFn: getChallenges,
    });

    // queryClient.prefetchQuery({
    //   queryKey: [getPremium.name],
    //   queryFn: getPremium,
    // });
  }, [queryClient]);
};
