import { Hono } from 'hono';
import { getValidatedUser } from './auth';
import { getInitDataFromHeaders } from './utils';
import { getChallenges } from './db/repo';

const app = new Hono();

app.get('/getChallenges', async (c) => {
  const initData = getInitDataFromHeaders(c.req);

  const user = await getValidatedUser(initData);

  const challenges = await getChallenges(user.id);

  return c.json(challenges);
});

app.get('/test', async (c) => {
  return c.json({ hello: 'test' });
});

export default app;
