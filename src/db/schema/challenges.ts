import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { usersTable } from '.';
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

  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .defaultNow(),

  challengeStartAt: timestamp('challenge_start_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),

  regularity: regularityEnum('regularity').notNull(),

  // null if regularity is set to everyday
  daysOfWeek: integer('days_of_week').array(),

  taskDates: timestamp('task_dates', {
    withTimezone: true,
    mode: 'string',
  })
    .array()
    .notNull(),

  userCheckedDates: timestamp('user_checked_dates', {
    withTimezone: true,
    mode: 'string',
  }).array(),
});

export type Challenge = InferSelectModel<typeof challengesTable>;
export type NewChallenge = InferInsertModel<typeof challengesTable>;
export type UpdateChallenge = Partial<
  Omit<NewChallenge, 'userId' | 'id' | 'createdAt'>
>;
