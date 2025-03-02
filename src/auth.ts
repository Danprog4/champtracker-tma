import { validate, parse } from "@telegram-apps/init-data-node/web";
import { createUser, getUser } from "./db/repo/user";
import { User } from "./db/schema";
import { HonoRequest } from "hono";
import { Context } from "hono";
import jwt from "jsonwebtoken";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // It's better to set this in environment variables
const JWT_EXPIRES_IN = "7d"; // Token valid for 7 days

if (!BOT_TOKEN) {
  throw new Error("telegram bot token is not found");
}

export const getValidatedUser = async (req: HonoRequest): Promise<User> => {
  // First check if JWT token exists
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await getUser(decoded.userId);

      if (!user) {
        throw new Error("User not found with the provided token");
      }

      return user;
    } catch (error) {
      console.error("JWT verification failed:", error);
      // If token verification fails, fallback to initData
    }
  }

  // Fallback to initData validation
  const initData = req.header("x-init-data");

  console.log("getValidatedUser() initdata", initData);

  if (!initData) {
    throw new Error("No authorization: neither token nor x-init-data provided");
  }

  // check if user is not a scammer and came from our telegram bot, good!
  validate(initData, BOT_TOKEN, {
    expiresIn: 0,
  });

  // parsing from fucking string to normal good js object, good!
  const parsedInitData = parse(initData);

  const telegramUser = parsedInitData.user;

  // if no user (такого не будет), но проверку добавили
  if (!telegramUser) {
    throw new Error("User is not found in initData");
  }

  // берем user-а из диби (возможно его там нет, если он НОВИЧОК)
  let user = await getUser(telegramUser.id);

  console.log("getValidatedUser() user", user);

  // если он НОВИЧОК, то создаем его в диби и записываем в переменную user
  if (!user) {
    user = await createUser(telegramUser);
  }

  return user;
};

// Generate JWT token
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// JWT auth middleware for Hono
export const jwtAuthMiddleware = async (
  c: Context,
  next: () => Promise<void>
) => {
  try {
    const user = await getValidatedUser(c.req);

    // If user was authenticated via initData, generate a token and set it in the response
    const token = generateToken(user.id);
    c.header("Authorization", `Bearer ${token}`);

    // Add user to the context for later use
    c.set("user", user as any);

    await next();
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ error: "Authentication failed" }, 401);
  }
};
