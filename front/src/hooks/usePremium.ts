import { createInvoice, getPremium } from '@/api/challenge';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { on, openInvoice } from '@telegram-apps/sdk';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const usePremium = () => {
  const queryClient = useQueryClient();

  const { data: premium } = useSuspenseQuery({
    queryKey: ['hiu'],
    queryFn: getPremium,
  });

  const {
    mutate,
    isPending: isBuyingPending,
    data,
  } = useMutation({
    mutationKey: ['buy-stories'],
    mutationFn: () => {
      return createInvoice();
    },
  });

  useEffect(() => {
    if (!data) return;

    console.log('openInvoice()', data.invoiceUrl);

    // @ts-ignore
    window.Telegram.WebApp.openInvoice(data.invoiceUrl);

    on('invoice_closed', (payment: { slug: string; status: string }) => {
      if (payment.status === 'paid') {
        toast.success('Payment successful', { id: 'payment-successful' });
        queryClient.invalidateQueries({ queryKey: [getPremium.name] });
      } else if (
        payment.status === 'cancelled' ||
        payment.status === 'failed'
      ) {
        toast.error('Payment failed', { id: 'payment-failed' });
      }
    });
  }, [data, queryClient]);

  const handleBuyPremium = () => {
    mutate();
  };

  return { handleBuyPremium, isBuyingPending, isPremium: premium.premium };
};
