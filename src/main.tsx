import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { mockTelegramEnv, init } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AuthProvider } from "./hooks/useAuthState";
import { UnifiedLoadingState } from "./router";
import axios from "axios";

// Create a query client with default options for Suspense
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TypeScript doesn't know about suspense option but it's valid
      // @ts-ignore
      suspense: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 401 errors as they will be handled by our axios interceptor
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return false;
        }
        // Default retry behavior for other errors (3 times)
        return failureCount < 3;
      },
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
        disableVerticalSwipes: () => void;
        requestFullscreen: () => void;
        lockOrientation: () => void;
        platform: string;
        version: string;

        // Add other Telegram WebApp properties you might use here
      };
    };
  }
}
window.Telegram.WebApp.expand();
const telegramVersion = Number(window.Telegram.WebApp.version);

if (telegramVersion >= 7.7) {
  window.Telegram.WebApp.disableVerticalSwipes();
}

const isMobile =
  window.Telegram.WebApp.platform === "ios" ||
  window.Telegram.WebApp.platform === "android" ||
  window.Telegram.WebApp.platform === "android_x";

if (telegramVersion >= 8 && isMobile) {
  window.Telegram.WebApp.requestFullscreen();
  window.Telegram.WebApp.lockOrientation();
}

// Enable closing confirmation
window.Telegram.WebApp.enableClosingConfirmation();

// Inform Telegram that the WebApp is ready to be displayed

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
