import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getValidatedUser } from './auth';
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  type NewChallenge,
  type UpdateChallenge,
} from './db/repo/challenges';
import { CreateChallenge } from '../types';

const app = new Hono();

app.use(
  '/*',
  cors({
    origin: ['http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'x-init-data'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);

app.get('/getChallenges', async (c) => {
  const user = await getValidatedUser(c.req);

  const challenges = await getChallenges(user.id);

  return c.json(challenges);
});

app.post('/createChallenge', async (c) => {
  const user = await getValidatedUser(c.req);
  const body = await c.req.json<CreateChallenge>();

  const challenge = await createChallenge({
    ...body,
    createdAt: new Date(body.createdAt),
    userId: user.id,
  });

  console.log('created new challenge with id', challenge.id);

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

export default app;
