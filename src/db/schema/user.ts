import {
  bigint,
  boolean,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: bigint({ mode: 'number' }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }),
  isPremium: boolean().notNull(),
  language: varchar({ length: 255 }).notNull(),
  photoUrl: varchar({ length: 255 }),
  premiumUntil: timestamp('premium_until', {
    withTimezone: true,
    mode: 'string',
  }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
  onBoarding: boolean().notNull().default(false),
});

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;
