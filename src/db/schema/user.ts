import { bigint, boolean, pgTable, varchar } from 'drizzle-orm/pg-core';

import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: bigint({ mode: 'number' }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }),
  isPremium: boolean().notNull(),
  language: varchar({ length: 255 }).notNull(),
  photoUrl: varchar({ length: 255 }),
});

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;
