import { useState, useEffect } from "react";
import { loadingState } from "@/api/axios";

/**
 * Hook to track the loading state of authentication retries
 * @returns Loading state for auth retries
 */
export const useAuthRetryLoading = (): boolean => {
  const [isRetrying, setIsRetrying] = useState(loadingState.isLoading);

  useEffect(() => {
    // Subscribe to changes in loading state
    const unsubscribe = loadingState.addListener((isLoading) => {
      setIsRetrying(isLoading);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  return isRetrying;
};
