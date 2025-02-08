import { relations } from "drizzle-orm/relations";
import { users, challenges } from "./schema";

export const challengesRelations = relations(challenges, ({one}) => ({
	user: one(users, {
		fields: [challenges.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	challenges: many(challenges),
}));