import { validate, parse } from "@telegram-apps/init-data-node/web";
import { createUser, getUser } from "./db/repo/user";
import { User } from "./db/schema";
import { HonoRequest } from "hono";
import jwt from "jsonwebtoken";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET || "champtracker-jwt-secret";
const JWT_EXPIRES_IN = "7d"; // Token expiration time

if (!BOT_TOKEN) {
  throw new Error("telegram bot token is not found");
}

// Create JWT token for a user
export const createToken = (user: User): string => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Verify JWT token and return user id
export const verifyToken = (token: string): { id: number } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch (error) {
    return null;
  }
};

// Get user from JWT token
export const getUserFromToken = async (token: string): Promise<User | null> => {
  const payload = verifyToken(token);
  if (!payload) return null;

  return await getUser(payload.id);
};

// Middleware to validate JWT token
export const validateJwtMiddleware = async (
  req: HonoRequest
): Promise<User> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("No authorization token provided");
  }

  const user = await getUserFromToken(token);

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  return user;
};

export const getValidatedUser = async (req: HonoRequest): Promise<User> => {
  // Try JWT first if Authorization header is present
  const authHeader = req.header("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    const user = await getUserFromToken(token);
    if (user) {
      return user;
    }
  }

  // Fall back to init data validation if no valid JWT
  const initData = req.header("x-init-data");

  console.log("getValidatedUser() initdata", initData);

  if (!initData) {
    throw new Error("no x-init-data");
  }

  try {
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

    try {
      // берем user-а из диби (возможно его там нет, если он НОВИЧОК)
      let user = await getUser(telegramUser.id);

      console.log("getValidatedUser() user", user);

      // если он НОВИЧОК, то создаем его в диби и записываем в переменную user
      if (!user) {
        try {
          user = await createUser(telegramUser);
        } catch (createError) {
          console.error(
            "Error creating user, trying to fetch again:",
            createError
          );
          // Try fetching one more time in case it was created by another concurrent request
          user = await getUser(telegramUser.id);
          if (!user) {
            throw new Error("Failed to create or retrieve user");
          }
        }
      }

      return user;
    } catch (dbError) {
      console.error("Database error during user validation:", dbError);
      throw new Error(
        `Database error: ${dbError instanceof Error ? dbError.message : "Unknown error"}`
      );
    }
  } catch (validationError) {
    console.error("Init data validation error:", validationError);
    throw new Error(
      `Authentication failed: ${validationError instanceof Error ? validationError.message : "Unknown error"}`
    );
  }
};
