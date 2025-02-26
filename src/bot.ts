import { Bot } from "grammy";
import { updatePremium } from "./db/repo";
import dayjs = require("dayjs");
import { kebab } from "postgres";

const main = async () => {
  const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

  bot.start();

  bot.on("message:successful_payment", async (ctx) => {
    console.log("message:successful_payment", ctx);
    const payment = ctx.update.message.successful_payment;

    console.log("message:successful_payment", JSON.stringify(payment, null, 2));

    const payload = JSON.parse(payment.invoice_payload) as { userId: number };

    const premiumUntil = dayjs().add(1, "month").toISOString();

    await updatePremium(payload.userId, premiumUntil);
  });

  bot.command("start", async (ctx) => {
    await ctx.reply("Hello! Track your fucking challenges!");
  });

  bot.on("pre_checkout_query", async (ctx) => {
    console.log("pre_checkout_query", ctx);
    return ctx.answerPreCheckoutQuery(true);
  });

  bot.catch((err) => {
    console.error("Bot error:", err);
  });

  // Enable graceful stop
  process.once("SIGINT", () => {
    bot.stop();
    console.log("Bot stopped (SIGINT)");
    process.exit(0);
  });

  process.once("SIGTERM", () => {
    bot.stop();
    console.log("Bot stopped (SIGTERM)");
    process.exit(0);
  });
};

main().catch(console.error);
