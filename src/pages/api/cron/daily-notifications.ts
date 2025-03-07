import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { isDateUpdate } from "@/lib/dateUtils";
import { Bot, InlineKeyboard } from "grammy";

// This endpoint should be called by a cron job service (like Vercel Cron Jobs)
// to send daily notifications to users who haven't been active today

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify the request is authorized (you can add a secret token check here)
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.CRON_SECRET;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Initialize the bot
    const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
    const inlineKeyboard = new InlineKeyboard().webApp(
      "Прокачай дисциплину!",
      "https://champtracker-backend.vercel.app/"
    );

    // Get all users
    const users = await db.select().from(usersTable);
    let notificationsSent = 0;
    let notificationsSkipped = 0;

    // Send notifications to users who haven't been active today
    for (const user of users) {
      if (isDateUpdate(user.lastActiveDate)) {
        try {
          await bot.api.sendMessage(
            user.id,
            `*🔔 Новый день - новые возможности! 🔔*

Не забудь отметить выполнение своих заданий сегодня и заработать токены!

Продолжай развивать свою дисциплину с Champtracker! 💪`,
            {
              parse_mode: "Markdown",
              reply_markup: inlineKeyboard,
            }
          );
          notificationsSent++;
        } catch (error) {
          console.error(
            `Failed to send notification to user ${user.id}:`,
            error
          );
        }
      } else {
        notificationsSkipped++;
      }
    }

    return res.status(200).json({
      success: true,
      notificationsSent,
      notificationsSkipped,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error("Error sending daily notifications:", error);
    return res.status(500).json({ error: "Failed to send notifications" });
  }
}
