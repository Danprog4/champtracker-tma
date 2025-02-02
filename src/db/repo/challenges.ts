import { db } from '..';
import { challengesTable } from '../schema';
import { eq, and } from 'drizzle-orm';
import { type InferInsertModel } from 'drizzle-orm';

export type NewChallenge = InferInsertModel<typeof challengesTable>;
export type UpdateChallenge = Partial<
  Omit<NewChallenge, 'id' | 'userId' | 'createdAt'>
>;

export const getChallenges = async (userId: number) => {
  const challenges = await db
    .select()
    .from(challengesTable)
    .where(eq(challengesTable.userId, userId));

  return challenges;
};

export const createChallenge = async (challenge: NewChallenge) => {
  const [newChallenge] = await db
    .insert(challengesTable)
    .values(challenge)
    .returning();

  return newChallenge;
};

export const updateChallenge = async (
  id: number,
  userId: number,
  challenge: UpdateChallenge
) => {
  const [updatedChallenge] = await db
    .update(challengesTable)
    .set(challenge)
    .where(and(eq(challengesTable.id, id), eq(challengesTable.userId, userId)))
    .returning();

  return updatedChallenge;
};
