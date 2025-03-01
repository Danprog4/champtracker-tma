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

// import { Bot, webhookCallback } from "grammy";
// import { updatePremium } from "@/db/repo"; // Проверь правильность пути
// import dayjs from "dayjs";
// import { Hono } from "hono";

// const app = new Hono();

// const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// // Обработчик команды /start
// bot.command("start", async (ctx) => {
//   console.log("Received /start command from:", ctx.from);
//   try {
//     await ctx.reply(
//       "Привет! Начинай прокачивать свою дисциплину и выполнять задания прямо сейчас!"
//     );
//     console.log("Reply sent successfully!");
//   } catch (err) {
//     console.error("Failed to send reply:", err);
//   }
// });

// // Обработчик успешных платежей
// bot.on("message:successful_payment", async (ctx) => {
//   console.log(
//     "message:successful_payment",
//     JSON.stringify(ctx.update.message.successful_payment, null, 2)
//   );
//   const payment = ctx.update.message.successful_payment;
//   const payload = JSON.parse(payment.invoice_payload) as { userId: number };
//   const premiumUntil = dayjs().add(1, "month").toISOString();
//   await updatePremium(payload.userId, premiumUntil);
// });

// // Обработчик pre_checkout_query
// bot.on("pre_checkout_query", async (ctx) => {
//   console.log("pre_checkout_query", ctx);
//   return ctx.answerPreCheckoutQuery(true);
// });

// // Обработка ошибок
// bot.catch((err) => {
//   console.error("Bot error:", err);
// });

// // Маршрут для вебхука
// app.post("/telegram-webhook", async (c) => {
//   try {
//     return await webhookCallback(bot, "hono")(c);
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return c.text("Error processing webhook", 500);
//   }
// });

// // Экспортируем для Vercel
// export default app;
