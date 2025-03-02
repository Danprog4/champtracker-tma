import { Bot, InlineKeyboard, webhookCallback } from "grammy";
import { updatePremium } from "@/db/repo";
import dayjs from "dayjs";
import { de } from "date-fns/locale";

export const runtime = "nodejs";
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const inlineKeyboard = new InlineKeyboard().webApp(
  "Прокачай дисциплину!",
  "https://champtracker-backend.vercel.app/"
);

bot.on("message:successful_payment", async (ctx) => {
  console.log("message:successful_payment", ctx);
  const payment = ctx.update.message.successful_payment;

  console.log("message:successful_payment", JSON.stringify(payment, null, 2));

  const payload = JSON.parse(payment.invoice_payload) as { userId: number };

  const premiumUntil = dayjs().add(1, "month").toISOString();

  await updatePremium(payload.userId, premiumUntil);
});

bot.command("start", async (ctx) => {
  await ctx.replyWithPhoto(
    "https://champtracker-backend.vercel.app/images/champ.jpg",
    {
      caption: `*🏆 ChampTracker: Ваш личный помощник в формировании привычек и саморазвитии! 🏆*

С ChampTracker вы сможете:
✅ Создавать и настраивать задания для укрепления дисциплины
🎯 Следить за прогрессом и достигать своих целей
💰 Зарабатывать токены за ежедневную активность и выполнение заданий


Нажми кнопку ниже, чтобы начать прокачивать свою дисциплину! 💪`,
      reply_markup: inlineKeyboard,
      parse_mode: "Markdown",
    }
  );
});

bot.on("pre_checkout_query", async (ctx) => {
  console.log("pre_checkout_query", ctx);
  return ctx.answerPreCheckoutQuery(true);
});

export default process.env.NODE_ENV === "development"
  ? bot
  : webhookCallback(bot, "next-js");

export const botInstanceTest = bot;
