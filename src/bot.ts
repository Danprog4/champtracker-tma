// import { Bot } from "grammy";
// import { updatePremium } from "./db/repo";
// import dayjs from "dayjs";

// const main = async () => {
//   const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

//   bot.start();

//   bot.on("message:successful_payment", async (ctx) => {
//     console.log("message:successful_payment", ctx);
//     const payment = ctx.update.message.successful_payment;

//     console.log("message:successful_payment", JSON.stringify(payment, null, 2));

//     const payload = JSON.parse(payment.invoice_payload) as { userId: number };

//     const premiumUntil = dayjs().add(1, "month").toISOString();

//     await updatePremium(payload.userId, premiumUntil);
//   });

//   bot.command("start", async (ctx) => {
//     await ctx.reply(
//       "Привет! Начинай прокачивать свою дисциплину и выполнять задания прямо сейчас!"
//     );
//   });

//   bot.on("pre_checkout_query", async (ctx) => {
//     console.log("pre_checkout_query", ctx);
//     return ctx.answerPreCheckoutQuery(true);
//   });

//   bot.catch((err) => {
//     console.error("Bot error:", err);
//   });

//   // Enable graceful stop
//   process.once("SIGINT", () => {
//     bot.stop();
//     console.log("Bot stopped (SIGINT)");
//     process.exit(0);
//   });

//   process.once("SIGTERM", () => {
//     bot.stop();
//     console.log("Bot stopped (SIGTERM)");
//     process.exit(0);
//   });
// };

// main().catch(console.error);
import { Bot, webhookCallback } from "grammy";
import { updatePremium } from "./db/repo";
import dayjs from "dayjs";
import { Hono } from "hono";

const main = async () => {
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

  // Создаем Hono приложение
  const app = new Hono();

  // Маршрут для проверки сервера
  app.get("/", (c) => {
    return c.text("Bot server is running!");
  });

  // Маршрут для вебхука Telegram
  const webhookPath = "/telegram-webhook";
  app.post(webhookPath, async (c) => {
    try {
      // Используем webhookCallback для обработки входящих обновлений
      return await webhookCallback(bot, "hono")(c);
    } catch (err) {
      console.error("Webhook error:", err);
      return c.text("Error processing webhook", 500);
    }
  });

  // Запускаем сервер
  const PORT = process.env.PORT || 3000;
  const server = Bun.serve({
    fetch: app.fetch,
    port: PORT,
  });

  console.log(`Server running on port ${PORT}`);

  // Настраиваем вебхук автоматически при запуске
  const webhookUrl = `https://yourdomain.com${webhookPath}`; // Замени на свой домен
  try {
    await bot.api.setWebhook(webhookUrl);
    console.log(`Webhook set to ${webhookUrl}`);
  } catch (err) {
    console.error("Failed to set webhook:", err);
  }

  // Обработка graceful shutdown
  process.once("SIGINT", () => {
    console.log("Bot stopped (SIGINT)");
    server.stop();
    process.exit(0);
  });

  process.once("SIGTERM", () => {
    console.log("Bot stopped (SIGTERM)");
    server.stop();
    process.exit(0);
  });
};

main().catch(console.error);
