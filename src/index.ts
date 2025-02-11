import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getValidatedUser } from './auth';
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  getOnBoarding,
  getPremium,
  updateChallenge,
  updateOnBoarding,
} from './db/repo';
import { UpdateChallenge } from './db/schema';
import { CreateChallengeReq } from './types';
import dayjs = require('dayjs');
import { handleCreateInvoice } from './create-invoice';

const app = new Hono();

app.use('*', cors());


app.get('/getPremium', async (c) => {
  const user = await getValidatedUser(c.req);

  const premium = await getPremium(user.id);

  return c.json({ premium });
});


app.get('/getOnBoarding', async (c) => {
  const user = await getValidatedUser(c.req);

  const onBoarding = await getOnBoarding(user.id);
  
  return c.json({ onBoarding });
})

app.put('/updateOnBoarding', async (c) => {
  const user = await getValidatedUser(c.req);

  await updateOnBoarding(user.id, true);

  return c.json({ success: true, message: "OnBoarding status updated" });
})

app.get('/createInvoice', async (c) => {
  const user = await getValidatedUser(c.req);

  const invoice = await handleCreateInvoice(user.id);

  return c.json({ invoiceUrl: invoice.invoiceUrl });
});

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

  return c.json({ id: deletedChallenge.id });
});

export default app;
