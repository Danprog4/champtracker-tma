import { Hono } from "hono";
import { handle } from "hono/vercel";
import app from "@/server";

// Create a single handler that will handle all HTTP methods
const handler = handle(app);

// Export the handler for each HTTP method
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
