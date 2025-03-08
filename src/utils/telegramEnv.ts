import { mockTelegramEnv } from "@telegram-apps/sdk";
import { getMockInitData } from "./mockData";

/**
 * Sets up the Telegram environment for development
 * This ensures all required properties are properly mocked
 */
export function setupTelegramEnvForDev() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // Try to get the initDataRaw from environment
  const initDataRaw = getMockInitData();

  // Call the SDK's mock function first to set up core functionality
  try {
    mockTelegramEnv({
      initDataRaw,
      themeParams: {
        bg_color: "#212121",
        text_color: "#ffffff",
        hint_color: "#aaaaaa",
        link_color: "#8774e1",
        button_color: "#8774e1",
        button_text_color: "#ffffff",
      } as any,
      version: "7.2",
      platform: "tdesktop",
    });
  } catch (error) {
    console.warn("Error calling mockTelegramEnv:", error);
  }

  // Make sure the Telegram object exists
  if (!window.Telegram) {
    window.Telegram = {} as any;
  }

  // Create a mock WebApp object if needed
  if (!window.Telegram.WebApp) {
    window.Telegram.WebApp = {} as any;
  }

  // Define essential methods and properties
  const essentialProps = {
    platform: "tdesktop",
    version: "7.2",
    colorScheme: "dark",
    isExpanded: true,
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
    headerColor: "#212121",
    backgroundColor: "#212121",
    isClosingConfirmationEnabled: false,
    tgWebAppPlatform: "tdesktop",
    expand: () => {},
    enableClosingConfirmation: () => {},
    disableVerticalSwipes: () => {},
    requestFullscreen: () => {},
    lockOrientation: () => {},
  };

  // Add essential properties to the WebApp object
  for (const [key, value] of Object.entries(essentialProps)) {
    try {
      if (!(key in window.Telegram.WebApp)) {
        (window.Telegram.WebApp as any)[key] = value;
      }
    } catch (e) {
      console.warn(`Cannot set property ${key} on WebApp object`, e);
    }
  }

  // Set tgWebAppPlatform on window
  try {
    (window as any).tgWebAppPlatform = "tdesktop";
  } catch (e) {
    console.warn("Cannot set tgWebAppPlatform on window", e);
  }

  console.log("Telegram environment mocked for development");
}

/**
 * Initialize Telegram environment safely for both dev and production
 */
export function safeInitTelegramEnv() {
  // In development, ensure the mock is set up first
  if (process.env.NODE_ENV === "development") {
    try {
      setupTelegramEnvForDev();
    } catch (e) {
      console.warn("Error setting up Telegram environment for development:", e);
    }
    return true;
  }

  // Otherwise just check if Telegram WebApp exists
  return !!window.Telegram?.WebApp;
}
