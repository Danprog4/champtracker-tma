export type PostCreateInvoiceResponse = {
  invoiceUrl: string;
};

import { Bot } from "grammy";

export const handleCreateInvoice = async (userId: number) => {
  console.log("[Premium][Server] Creating invoice for user", { userId });

  try {
    const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

    const title = "Buy Premium";
    const description = "Buy Premium";
    const payload = JSON.stringify({ userId });
    const currency = "XTR";
    const prices = [{ amount: 1, label: title }];
    const provider_token = "";

    console.log("[Premium][Server] Calling Telegram API to create invoice", {
      userId,
      currency,
      prices,
    });

    const invoiceUrl = await bot.api.createInvoiceLink(
      title,
      description,
      payload,
      provider_token,
      currency,
      prices
    );

    console.log("[Premium][Server] Invoice created successfully", {
      userId,
      invoiceUrl,
    });

    return { invoiceUrl } satisfies PostCreateInvoiceResponse;
  } catch (error) {
    console.error("[Premium][Server] Error creating invoice", {
      userId,
      error,
    });
    throw error;
  }
};
