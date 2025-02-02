import { Hono } from 'hono';
import { getValidatedUser } from './auth';
import { getChallenges } from './db/repo';

const app = new Hono();

app.get('/getChallenges', async (c) => {
  const user = await getValidatedUser(c.req);

  const challenges = await getChallenges(user.id);

  return c.json(challenges);
});

export default app;
