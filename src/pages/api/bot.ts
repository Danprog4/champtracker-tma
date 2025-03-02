import { Bot, InlineKeyboard, webhookCallback } from "grammy";
import { updatePremium } from "@/db/repo";
import dayjs from "dayjs";
import { de } from "date-fns/locale";

export const runtime = "nodejs";
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const inlineKeyboard = new InlineKeyboard().webApp(
  "Прокачай дисциплину!",
  "https://t.me/ChampTracker_bot/app"
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
  await ctx.reply(
    `*🏆 ChampTracker: Ваш личный помощник в формировании привычек и саморазвитии! 📊*

С ChampTracker вы сможете:
✅ Создавать свои или готовые задания для выработки новых привычек и укрепления дисциплины
🎯 Следить за ежедневным прогрессом с помощью красивого и удобного интерфейса
🔄 Настраивать задания под ваши индивидуальные цели и ритм жизни
💰 Зарабатывать токены за ежедневный вход и выполнение заданий
📈 Получать подробную статистику о вашем прогрессе и достижениях (скоро появится!)

Присоединяйтесь к тысячам пользователей, которые уже строят лучшие привычки и меняют свою жизнь с нами. Начните своё путешествие к успеху СЕГОДНЯ! 💪`,
    {
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
