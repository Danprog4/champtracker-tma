// api/telegram-webhook.ts
import { Bot, webhookCallback } from "grammy";
import { updatePremium } from "../src/db/repo"; // Проверь путь
import dayjs from "dayjs";
import { Hono } from "hono";

const tg = new Hono();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// Обработчик команды /start
bot.command("start", async (ctx) => {
  console.log("Received /start command from:", ctx.from);
  try {
    await ctx.reply(
      "Привет! Начинай прокачивать свою дисциплину и выполнять задания прямо сейчас!"
    );
    console.log("Reply sent successfully!");
  } catch (err) {
    console.error("Failed to send reply:", err);
  }
});

// Обработчик успешных платежей
bot.on("message:successful_payment", async (ctx) => {
  console.log(
    "message:successful_payment",
    JSON.stringify(ctx.update.message.successful_payment, null, 2)
  );
  const payment = ctx.update.message.successful_payment;
  const payload = JSON.parse(payment.invoice_payload) as { userId: number };
  const premiumUntil = dayjs().add(1, "month").toISOString();
  await updatePremium(payload.userId, premiumUntil);
});

// Обработчик pre_checkout_query
bot.on("pre_checkout_query", async (ctx) => {
  console.log("pre_checkout_query", ctx);
  return ctx.answerPreCheckoutQuery(true);
});

// Обработка ошибок
bot.catch((err) => {
  console.error("Bot error:", err);
});

// Маршрут для вебхука (должен принимать POST-запросы)
tg.post("/telegram-webhook", async (c) => {
  console.log("Received webhook POST request");
  try {
    return await webhookCallback(bot, "hono")(c);
  } catch (err) {
    console.error("Webhook error:", err);
    return c.text("Error processing webhook", 500);
  }
});

// Для отладки: добавим GET, чтобы Vercel не ругался на неподдерживаемые методы
tg.get("/telegram-webhook", (c) => {
  return c.text(
    "This endpoint only accepts POST requests for Telegram webhooks"
  );
});

// Экспортируем для Vercel
export default tg;
