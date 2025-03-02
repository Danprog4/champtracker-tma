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
      mutationFn: (premiumUntil: string) => {
        console.log("[Premium] Updating premium with tokens", {
          userId: user.id,
          currentTokens: user.tokens,
          premiumUntil,
        });
        return updatePremium(premiumUntil);
      },
      onSuccess: () => {
        console.log("[Premium] Premium updated successfully with tokens", {
          userId: user.id,
          tokensSpent: 300,
          remainingTokens: user.tokens - 300,
        });
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
      console.log("[Premium] Initiating Telegram Stars invoice creation", {
        userId: user.id,
      });
      return createInvoice();
    },
    onSuccess: (data) => {
      console.log("[Premium] Invoice created successfully", {
        userId: user.id,
        invoiceUrl: data.invoiceUrl,
      });
    },
    onError: (error) => {
      console.error("[Premium] Error creating invoice", {
        userId: user.id,
        error: error,
      });
    },
  });

  useEffect(() => {
    if (!data) return;

    console.log("[Premium] Opening invoice in Telegram", {
      userId: user.id,
      invoiceUrl: data.invoiceUrl,
    });

    // @ts-ignore
    window.Telegram.WebApp.openInvoice(data.invoiceUrl);

    on("invoice_closed", (payment: { slug: string; status: string }) => {
      console.log("[Premium] Invoice closed", {
        userId: user.id,
        paymentStatus: payment.status,
        paymentSlug: payment.slug,
      });

      if (payment.status === "paid") {
        console.log("[Premium] Payment successful", {
          userId: user.id,
          paymentSlug: payment.slug,
        });
        toast.success("Payment successful", { id: "payment-successful" });
        queryClient.invalidateQueries({ queryKey: [getPremium.name] });
        queryClient.invalidateQueries({ queryKey: [getUser.name] });

        // Call the callback if it exists
        if (onPaymentSuccess) {
          console.log("[Premium] Executing success callback");
          onPaymentSuccess();
        }
      } else if (
        payment.status === "cancelled" ||
        payment.status === "failed"
      ) {
        console.log("[Premium] Payment failed or cancelled", {
          userId: user.id,
          paymentStatus: payment.status,
          paymentSlug: payment.slug,
        });
        toast.error("Payment failed", { id: "payment-failed" });
      }
    });
  }, [data, queryClient, user.id]);

  const handleBuyPremium = useCallback(
    (callback?: () => void) => {
      console.log("[Premium] Buy premium initiated", { userId: user.id });
      // Save the callback to be called when payment is successful
      onPaymentSuccess = callback || null;
      mutate();
    },
    [mutate, user.id]
  );

  return {
    handleBuyPremium,
    isBuyingPending,
    isPremiumUntil: premium.premium.premiumUntil,
    updatePremium: updatePremiumFunc,
    isUpdatingPremium,
  };
};
