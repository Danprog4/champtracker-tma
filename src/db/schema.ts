import {
  pgTable,
  serial,
  bigint,
  varchar,
  integer,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

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

export const regularityEnum = pgEnum('regularity_enum', [
  'everyday',
  'fewTimesAWeek',
]);

export const challengesTable = pgTable('challenges', {
  id: serial('id').primaryKey(),

  userId: bigint({ mode: 'number' })
    .references(() => usersTable.id)
    .notNull(),

  title: varchar({ length: 255 }).notNull(),

  duration: integer('duration').notNull(),

  color: varchar({ length: 255 }).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),

  regularity: regularityEnum('regularity').notNull(),

  // null if regularity is set to everyday
  daysOfWeek: integer('days_of_week').array(),

  taskDates: timestamp('task_dates').array().notNull(),

  userCheckedDates: timestamp('user_checked_dates').array(),
});

export type Challenge = InferSelectModel<typeof challengesTable>;
export type NewChallenge = InferInsertModel<typeof challengesTable>;
