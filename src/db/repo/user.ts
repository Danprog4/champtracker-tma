import { User, usersTable } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { User as TelegramUser } from "@telegram-apps/init-data-node";
import dayjs from "dayjs";

export const getUser = async (id: number): Promise<User | null> => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

  return users[0] || null;
};

export const updateLastActiveDate = async (id: number) => {
  await db
    .update(usersTable)
    .set({ lastActiveDate: dayjs().toISOString() })
    .where(eq(usersTable.id, id));
};

export const updateTokens = async (id: number, tokens: number) => {
  await db.update(usersTable).set({ tokens }).where(eq(usersTable.id, id));
};

export const createUser = async (telegramUser: TelegramUser): Promise<User> => {
  const name =
    telegramUser.first_name +
    (telegramUser.last_name ? ` ${telegramUser.last_name}` : "");

  try {
    // Use upsert pattern (insert if not exists, do nothing if exists)
    const users = await db
      .insert(usersTable)
      .values({
        id: telegramUser.id,
        name: name,
        username: telegramUser.username || null,
        isPremium: telegramUser.is_premium || false,
        language: telegramUser.language_code || "en",
        photoUrl: telegramUser.photo_url || null,
        premiumUntil: dayjs().add(1, "year").toISOString(),
      })
      .onConflictDoNothing({ target: usersTable.id })
      .returning();

    // If insert succeeded, return the inserted user
    if (users.length > 0) {
      return users[0];
    }

    // If no user was inserted (because it already existed), fetch and return the existing user
    const existingUser = await getUser(telegramUser.id);
    if (!existingUser) {
      throw new Error("Failed to create or retrieve user");
    }

    return existingUser;
  } catch (error) {
    console.error("Error in createUser:", error);

    // As a fallback, try to fetch the user if they might already exist
    const existingUser = await getUser(telegramUser.id);
    if (!existingUser) {
      throw error; // Re-throw if user still doesn't exist
    }

    return existingUser;
  }
};

export const getPremium = async (
  id: number
): Promise<{ premium: boolean; premiumUntil: string | null }> => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

  return {
    premium: Boolean(users[0].premiumUntil),
    premiumUntil: users[0].premiumUntil,
  };
};

export const updatePremium = async (id: number, premiumUntil: string) => {
  await db
    .update(usersTable)
    .set({ premiumUntil })
    .where(eq(usersTable.id, id));
};

export const getOnBoarding = async (id: number): Promise<boolean> => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

  return Boolean(users[0].onBoarding);
};

export const updateOnBoarding = async (id: number, onBoarding: boolean) => {
  const users = await db
    .update(usersTable)
    .set({ onBoarding })
    .where(eq(usersTable.id, id))
    .returning({ onBoarding: usersTable.onBoarding });

  return users[0].onBoarding;
};

export const updateCompletedChallengesCount = async (
  id: number,
  count: number
) => {
  await db
    .update(usersTable)
    .set({ completedChallengesCount: count })
    .where(eq(usersTable.id, id));
};

export const updateTotalActiveDays = async (id: number, totalActiveDays: number) => {
  await db
    .update(usersTable)
    .set({ totalActiveDays })
    .where(eq(usersTable.id, id));
};
