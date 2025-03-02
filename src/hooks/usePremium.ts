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
import { getUser } from "@/db/repo";

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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [getPremium.name] });
        updateTokens(user.tokens - 300);
        toast.success("Вы успешно получили премиум");
      },
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
      if (payment.status === "paid") {
        toast.success("Payment successful", { id: "payment-successful" });
        queryClient.invalidateQueries({ queryKey: [getPremium.name] });
        queryClient.invalidateQueries({ queryKey: [getUser.name] });

        // Call the callback if it exists
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      } else if (
        payment.status === "cancelled" ||
        payment.status === "failed"
      ) {
        toast.error("Payment failed", { id: "payment-failed" });
      }
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
