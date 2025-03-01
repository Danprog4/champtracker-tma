import { Context } from "grammy";

// api/telegram-webhook.ts
const { Bot, webhookCallback } = require("hono/grammy");
const { updatePremium } = require("../src/db/repo"); // Проверь путь
const dayjs = require("dayjs");
const { Hono } = require("hono");

const app = new Hono();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик команды /start
bot.command("start", async (ctx: Context) => {
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
bot.on("message:successful_payment", async (ctx: Context) => {
  console.log(
    "message:successful_payment",
    JSON.stringify(ctx.update.message?.successful_payment, null, 2)
  );
  const payment = ctx.update.message?.successful_payment;
  if (!payment) {
    console.error("No payment found in message");
    return;
  }
  const payload = JSON.parse(payment.invoice_payload);
  const premiumUntil = dayjs().add(1, "month").toISOString();
  await updatePremium(payload.userId, premiumUntil);
});

// Обработчик pre_checkout_query
bot.on("pre_checkout_query", async (ctx: Context) => {
  console.log("pre_checkout_query", ctx);
  return ctx.answerPreCheckoutQuery(true);
});

// Обработка ошибок
bot.catch((err: Error) => {
  console.error("Bot error:", err);
});

// Маршрут для вебхука (должен принимать POST-запросы)
app.post("/telegram-webhook", async (c: any) => {
  console.log("Received webhook POST request");
  try {
    return await webhookCallback(bot, "hono")(c);
  } catch (err) {
    console.error("Webhook error:", err);
    return c.text("Error processing webhook", 500);
  }
});

// Для отладки: добавим GET, чтобы Vercel не ругался на неподдерживаемые методы
app.get("/telegram-webhook", (c: any) => {
  return c.text(
    "This endpoint only accepts POST requests for Telegram webhooks"
  );
});

// Экспортируем для Vercel
module.exports = app;
