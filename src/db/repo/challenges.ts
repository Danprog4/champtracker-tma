import { db } from '..';
import {
  Challenge,
  challengesTable,
  NewChallenge,
  UpdateChallenge,
} from '../schema';
import { eq, and } from 'drizzle-orm';

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

export const deleteChallenge = async (challengeId: number, userId: number) => {
  const [deletedChallenge] = await db
    .delete(challengesTable)
    .where(
      and(
        eq(challengesTable.id, challengeId),
        eq(challengesTable.userId, userId)
      )
    )
    .returning();

  return deletedChallenge;
};
