import {
  pgTable,
  bigint,
  varchar,
  boolean,
  foreignKey,
  serial,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const regularityEnum = pgEnum("regularity_enum", [
  "everyday",
  "fewTimesAWeek",
]);

export const users = pgTable("users", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }),
  isPremium: boolean().notNull(),
  language: varchar({ length: 255 }).notNull(),
  photoUrl: varchar({ length: 255 }),
});

export const challenges = pgTable(
  "challenges",
  {
    id: serial().primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint({ mode: "number" }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    duration: integer().notNull(),
    color: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    regularity: regularityEnum().notNull(),
    daysOfWeek: integer("days_of_week").array(),
    taskDates: timestamp({ mode: "string" }).array().notNull(),
    userCheckedDates: timestamp({ mode: "string" }).array(),
    challengeStartAt: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "challenges_userId_users_id_fk",
    }),
  ]
);
