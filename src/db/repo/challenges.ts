import { db } from '..';
import { challengesTable } from '../schema';
import { eq } from 'drizzle-orm';

export const getChallenges = async (userId: number) => {
  const challenges = await db
    .select()
    .from(challengesTable)
    .where(eq(challengesTable.userId, userId));

  return challenges;
};
