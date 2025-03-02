import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { mockTelegramEnv, init } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const queryClient = new QueryClient();

// delete this if you using real telegram bot, not the localhost
// Add type declaration for Telegram WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        enableClosingConfirmation: () => void;
        expand: () => void;
        // Add other Telegram WebApp properties you might use here
      };
    };
  }
}

// Enable closing confirmation
window.Telegram.WebApp.enableClosingConfirmation();

// Expand to full screen
window.Telegram.WebApp.expand();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
