import { Bot, webhookCallback } from "grammy";
import { updatePremium } from "@/db/repo";
import dayjs from "dayjs";
import { de } from "date-fns/locale";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.on("message:successful_payment", async (ctx) => {
  console.log("message:successful_payment", ctx);
  const payment = ctx.update.message.successful_payment;

  console.log("message:successful_payment", JSON.stringify(payment, null, 2));

  const payload = JSON.parse(payment.invoice_payload) as { userId: number };

  const premiumUntil = dayjs().add(1, "month").toISOString();

  await updatePremium(payload.userId, premiumUntil);
});

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Привет! Начинай прокачивать свою дисциплину и выполнять задания прямо сейчас!"
  );
});

bot.on("pre_checkout_query", async (ctx) => {
  console.log("pre_checkout_query", ctx);
  return ctx.answerPreCheckoutQuery(true);
});

export default webhookCallback(bot, "next-js");
