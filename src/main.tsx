import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { mockTelegramEnv, init } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const queryClient = new QueryClient();

// delete this if you using real telegram bot, not the localhost

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
