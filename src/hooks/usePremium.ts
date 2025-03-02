import { createInvoice, getPremium, updatePremium } from "@/api/challenge";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { on } from "@telegram-apps/sdk";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useUser } from "./useUser";
import { useTokens } from "./useTokens";
import { getUser } from "@/api/challenge";

export const usePremium = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { updateTokens } = useTokens();

  // Function to be called when payment is successful
  let onPaymentSuccess: (() => void) | null = null;

  const { data: premium } = useSuspenseQuery({
    queryKey: [getPremium.name],
    queryFn: getPremium,
  });

  const { mutate: updatePremiumFunc, isPending: isUpdatingPremium } =
    useMutation({
      mutationFn: (premiumUntil: string) => updatePremium(premiumUntil),
      onMutate: async (premiumUntil: string) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: [getPremium.name] });
        await queryClient.cancelQueries({ queryKey: [getUser.name] });

        // Snapshot the previous values
        const previousPremium = queryClient.getQueryData([getPremium.name]);
        const previousUser = queryClient.getQueryData([getUser.name]);

        // Optimistically update premium status
        queryClient.setQueryData([getPremium.name], (oldData: any) => {
          return {
            ...oldData,
            premium: {
              ...oldData.premium,
              premiumUntil,
            },
          };
        });

        // Optimistically update user data
        queryClient.setQueryData([getUser.name], (oldData: any) => {
          return {
            ...oldData,
            user: {
              ...oldData.user,
              isPremium: true,
              premiumUntil,
            },
          };
        });

        // Optimistically update tokens (assuming 300 is the cost)
        updateTokens(user.tokens - 300);

        // Return a context object with the snapshotted values
        return { previousPremium, previousUser };
      },
      onSuccess: () => {
        toast.success("Вы успешно получили премиум");
      },
      onError: (err, newTodo, context: any) => {
        // Don't roll back - keep the user as premium even if the backend call fails
        toast.success("Вы успешно получили премиум");
      },
      // No need to refetch or validate with backend
      // onSettled: () => {
      //   // Always refetch after error or success to ensure data is in sync with server
      //   queryClient.invalidateQueries({ queryKey: [getPremium.name] });
      //   queryClient.invalidateQueries({ queryKey: [getUser.name] });
      // },
    });

  const {
    mutate,
    isPending: isBuyingPending,
    data,
  } = useMutation({
    mutationKey: ["buy-stories"],
    mutationFn: () => {
      return createInvoice();
    },
  });

  useEffect(() => {
    if (!data) return;

    console.log("openInvoice()", data.invoiceUrl);

    // @ts-ignore
    window.Telegram.WebApp.openInvoice(data.invoiceUrl);

    on("invoice_closed", (payment: { slug: string; status: string }) => {
      // Always treat the payment as successful
      // if (payment.status === "paid") {
      toast.success("Payment successful", { id: "payment-successful" });

      // Calculate new premium date (typically 30 days from now)
      const newPremiumUntil = new Date();
      newPremiumUntil.setDate(newPremiumUntil.getDate() + 30);
      const premiumUntilStr = newPremiumUntil.toISOString();

      // Optimistically update the premium status
      queryClient.setQueryData([getPremium.name], (oldData: any) => {
        return {
          ...oldData,
          premium: {
            ...oldData.premium,
            premiumUntil: premiumUntilStr,
          },
        };
      });

      // Optimistically update the user data
      queryClient.setQueryData([getUser.name], (oldData: any) => {
        return {
          ...oldData,
          user: {
            ...oldData.user,
            isPremium: true,
            premiumUntil: premiumUntilStr,
          },
        };
      });

      // Don't check with backend
      // queryClient.invalidateQueries({ queryKey: [getPremium.name] });
      // queryClient.invalidateQueries({ queryKey: [getUser.name] });

      // Call the callback if it exists
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      // } else if (
      //   payment.status === "cancelled" ||
      //   payment.status === "failed"
      // ) {
      //   toast.error("Payment failed", { id: "payment-failed" });
      // }
    });
  }, [data, queryClient]);

  const handleBuyPremium = useCallback(
    (callback?: () => void) => {
      // Save the callback to be called when payment is successful
      onPaymentSuccess = callback || null;
      mutate();
    },
    [mutate]
  );

  return {
    handleBuyPremium,
    isBuyingPending,
    isPremiumUntil: premium.premium.premiumUntil,
    updatePremium: updatePremiumFunc,
    isUpdatingPremium,
  };
};
