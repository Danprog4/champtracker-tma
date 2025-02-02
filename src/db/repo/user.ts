import { User, usersTable } from '../schema';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { User as TelegramUser } from '@telegram-apps/init-data-node';

export const getUser = async (id: number): Promise<User | null> => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

  return users[0] || null;
};

export const createUser = async (telegramUser: TelegramUser): Promise<User> => {
  const name =
    telegramUser.first_name +
    (telegramUser.last_name ? ` ${telegramUser.last_name}` : '');

  const users = await db
    .insert(usersTable)
    .values({
      id: telegramUser.id,
      name: name,
      username: telegramUser.username || null,
      isPremium: telegramUser.is_premium || false,
      language: telegramUser.language_code || 'en',
      photoUrl: telegramUser.photo_url || null,
    })
    .returning();

  return users[0];
};
