"use client";

import { App } from "@/main";
import { init, mockTelegramEnv } from "@telegram-apps/sdk";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { login } from "@/api/auth";

const DynamicApp = dynamic(() => import("@/main").then((mod) => mod.App), {
  ssr: false,
});

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialize Telegram app
        init();

        // Login and get JWT token
        await login();

        // Set loading to false when done
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to initialize app:", err);
        setError("Failed to initialize the application. Please try again.");
        setIsLoading(false);
      }
    };

    // if (process.env.NODE_ENV === "development") {
    //   if (typeof window !== "undefined") {
    //     mockTelegramEnv({
    //       // important part
    //       initDataRaw: process.env.NEXT_PUBLIC_MOCK_INIT_DATA,

    //       // do not care about this part
    //       themeParams: {},
    //       version: "7.2",
    //       platform: "tdesktop",
    //     });
    //   }
    // }

    initApp();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading app...</p>
        </div>
      </div>
    );
  }

  // Show error if there was a problem
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show the app when ready
  return (
    <div>
      <DynamicApp />
    </div>
  );
}
