import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { mockTelegramEnv, init } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AuthProvider } from "./hooks/useAuthState";
import { UnifiedLoadingState } from "./router";

// Create a query client with default options for Suspense
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TypeScript doesn't know about suspense option but it's valid
      // @ts-ignore
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

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

// All components can now access auth state
export const App = () => {
  // Initialize when this component mounts
  useEffect(() => {
    init();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};
