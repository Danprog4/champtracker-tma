import { Hono } from "hono";
import { handle } from "hono/vercel";

import { cors } from "hono/cors";
import { getValidatedUser } from "../../../auth";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  getOnBoarding,
  getPremium,
  getUser,
  updateChallenge,
  updateCompletedChallengesCount,
  updateLastActiveDate,
  updateOnBoarding,
  updatePremium,
  updateTokens,
} from "../../../db/repo";
import { UpdateChallenge } from "../../../db/schema";
import { CreateChallengeReq } from "../../../types";
import dayjs from "dayjs";
import { handleCreateInvoice } from "../../../create-invoice";

const app = new Hono().basePath("/api");

app.use("*", cors());

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/getUser", async (c) => {
  const user = await getValidatedUser(c.req);

  return c.json({ user });
});

app.put("/updateCompletedChallengesCount", async (c) => {
  const user = await getValidatedUser(c.req);

  const body = await c.req.json<{ count: number }>();

  await updateCompletedChallengesCount(user.id, body.count);

  return c.json({ count: user.completedChallengesCount });
});

app.put("/updateLastActiveDate", async (c) => {
  const user = await getValidatedUser(c.req);

  await updateLastActiveDate(user.id);

  return c.json({ lastActiveDate: user.lastActiveDate });
});

app.put("/updateTokens", async (c) => {
  const user = await getValidatedUser(c.req);

  const body = await c.req.json<{ tokens: number }>();

  await updateTokens(user.id, body.tokens);

  return c.json({ tokens: user.tokens });
});

app.get("/getPremium", async (c) => {
  const user = await getValidatedUser(c.req);

  const premium = await getPremium(user.id);

  return c.json({ premium });
});

app.put("/updatePremium", async (c) => {
  const user = await getValidatedUser(c.req);

  const body = await c.req.json<{ premiumUntil: string }>();

  const premium = await updatePremium(user.id, body.premiumUntil);

  return c.json({ premium });
});

app.get("/getOnBoarding", async (c) => {
  const user = await getValidatedUser(c.req);

  const onBoarding = await getOnBoarding(user.id);

  return c.json({ onBoarding });
});

app.put("/updateOnBoarding", async (c) => {
  const user = await getValidatedUser(c.req);

  const status = await updateOnBoarding(user.id, true);

  return c.json(status);
});

app.get("/createInvoice", async (c) => {
  const user = await getValidatedUser(c.req);

  const invoice = await handleCreateInvoice(user.id);

  return c.json({ invoiceUrl: invoice.invoiceUrl });
});

app.get("/getChallenges", async (c) => {
  const user = await getValidatedUser(c.req);

  const challenges = await getChallenges(user.id);

  return c.json(challenges);
});

app.post("/createChallenge", async (c) => {
  const user = await getValidatedUser(c.req);
  const body = await c.req.json<CreateChallengeReq>();

  const challenge = await createChallenge({
    ...body,
    userId: user.id,
  });

  return c.json(challenge);
});

app.put("/updateChallenge/:id", async (c) => {
  const user = await getValidatedUser(c.req);
  const id = Number(c.req.param("id"));

  const body = await c.req.json<UpdateChallenge>();

  const challenge = await updateChallenge(id, user.id, body);

  if (!challenge) {
    return c.json({ error: "Challenge not found" }, 404);
  }

  return c.json(challenge);
});

app.delete("/deleteChallenge/:id", async (c) => {
  const user = await getValidatedUser(c.req);
  const id = Number(c.req.param("id"));

  const deletedChallenge = await deleteChallenge(id, user.id);

  if (!deletedChallenge) {
    return c.json({ error: "Challenge not found or already deleted" }, 404);
  }

  return c.json({ id: deletedChallenge.id });
});

// Create a single handler that will handle all HTTP methods
const handler = handle(app);

// Export the handler for each HTTP method
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
