import { NewChallenge } from './src/db/schema';

export type CreateChallenge = Omit<NewChallenge, 'createdAt'> & {
  createdAt: string;
};
