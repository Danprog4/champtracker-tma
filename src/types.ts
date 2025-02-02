export type * from './db/schema';

import { NewChallenge } from './db/schema';

export type CreateChallengeReq = Omit<
  NewChallenge,
  'userId' | 'id' | 'createdAt' | 'userCheckedDates'
>;
