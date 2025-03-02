"use client";

import { App } from "@/main";
import { init, mockTelegramEnv } from "@telegram-apps/sdk";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicApp = dynamic(() => import("@/main").then((mod) => mod.App), {
  ssr: false,
});

export function Home() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (typeof window !== "undefined") {
        mockTelegramEnv({
          // important part
          initDataRaw: process.env.NEXT_PUBLIC_MOCK_INIT_DATA,

          // do not care about this part
          themeParams: {},
          version: "7.2",
          platform: "tdesktop",
        });
      }
    }

    init();

    // Expand the Telegram WebApp to full screen after initialization
    if (typeof window !== "undefined" && window.Telegram?.WebApp?.expand) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div>
      <DynamicApp />
    </div>
  );
}
