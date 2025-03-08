import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { init } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AuthProvider } from "./hooks/useAuthState";
import { UnifiedLoadingState } from "./router";
import axios from "axios";
import { fixViewportHeight } from "./scroll";
import {
  setupTelegramEnvForDev,
  safeInitTelegramEnv,
} from "./utils/telegramEnv";

// Initialize viewport height fix for mobile
fixViewportHeight();

// Add event listeners for resize and orientation change
window.addEventListener("resize", fixViewportHeight);
window.addEventListener("orientationchange", fixViewportHeight);

// Make sure the document body fills the entire viewport and has the right background
document.documentElement.style.backgroundColor = "black";
document.body.style.backgroundColor = "black";
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overscrollBehavior = "none";

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

// Set up Telegram WebApp mock in development mode or configure for production
try {
  safeInitTelegramEnv();
} catch (e) {
  console.warn("Error setting up Telegram environment:", e);
}

// Configure Telegram WebApp features if it exists
if (window.Telegram && window.Telegram.WebApp) {
  try {
    window.Telegram.WebApp.expand();
    const telegramVersion = Number(window.Telegram.WebApp.version);

    if (telegramVersion >= 7.7) {
      // We're handling scrolling ourselves, so prevent Telegram's swipe gestures
      window.Telegram.WebApp.disableVerticalSwipes();
    }

    const isMobile =
      window.Telegram.WebApp.platform === "ios" ||
      window.Telegram.WebApp.platform === "android" ||
      window.Telegram.WebApp.platform === "android_x";

    // Enable proper scrolling for mobile devices
    if (isMobile) {
      // Add a class to the body element to indicate we're on mobile
      document.body.classList.add("telegram-mobile");

      // Set up the app container for scrolling
      const rootElement = document.getElementById("root");
      if (rootElement) {
        rootElement.classList.add("telegram-app-container");
        rootElement.style.overflowY = "auto";
        rootElement.style.height = "100%";
        (rootElement.style as any)["-webkit-overflow-scrolling"] = "touch";
      }
    }

    if (telegramVersion >= 8 && isMobile) {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();
    }

    // Enable closing confirmation
    window.Telegram.WebApp.enableClosingConfirmation();
  } catch (e) {
    console.warn("Error configuring Telegram WebApp:", e);
  }
}

// All components can now access auth state
export const App = () => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          // In development mode, ensure the environment is set up
          try {
            setupTelegramEnvForDev();
          } catch (setupError) {
            console.warn("Error setting up Telegram environment:", setupError);
          }
        }

        // Attempt to initialize, which may throw an error outside Telegram
        try {
          await init();
          console.log("Telegram WebApp initialized successfully");
        } catch (initError) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "Telegram WebApp initialization failed in development mode:",
              initError
            );
            console.info(
              "This is expected when running outside of Telegram. The app will continue with mocked data."
            );
          } else {
            console.error("Failed to initialize Telegram WebApp:", initError);
          }
        }
      } catch (error) {
        // Catch any other unexpected errors
        console.error(
          "Unexpected error during Telegram initialization:",
          error
        );
      }
    };

    // Run the initialization
    initTelegram().catch((e) => {
      console.error("Failed to run Telegram initialization:", e);
    });
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};
