import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getValidatedUser } from './auth';
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from './db/repo';
import { NewChallenge, UpdateChallenge } from './db/schema';
import { CreateChallengeReq } from './types';
import dayjs = require('dayjs');

const app = new Hono();

app.use('*', cors());

app.get('/getChallenges', async (c) => {
  const user = await getValidatedUser(c.req);

  const challenges = await getChallenges(user.id);

  return c.json(challenges);
});

app.post('/createChallenge', async (c) => {
  const user = await getValidatedUser(c.req);
  const body = await c.req.json<CreateChallengeReq>();

  const challenge = await createChallenge({
    ...body,
    userId: user.id,
    createdAt: dayjs().format('YYYY-MM-DD'),
  });

  return c.json(challenge);
});

app.put('/updateChallenge/:id', async (c) => {
  const user = await getValidatedUser(c.req);
  const id = Number(c.req.param('id'));

  const body = await c.req.json<UpdateChallenge>();

  const challenge = await updateChallenge(id, user.id, body);

  if (!challenge) {
    return c.json({ error: 'Challenge not found' }, 404);
  }

  return c.json(challenge);
});

app.delete('/deleteChallenge/:id', async (c) => {
  const user = await getValidatedUser(c.req);
  const id = Number(c.req.param('id'));

  const deletedChallenge = await deleteChallenge(id, user.id);

  if (!deletedChallenge) {
    return c.json({ error: 'Challenge not found or already deleted' }, 404);
  }

  return c.json({ message: 'Challenge deleted successfully' });
});

export default app;
