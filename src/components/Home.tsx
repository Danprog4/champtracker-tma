"use client";

import { App } from "@/main";
import dynamic from "next/dynamic";

const DynamicApp = dynamic(() => import("@/main").then((mod) => mod.App), {
  ssr: false,
});

export function Home() {
  // App component now handles authentication and initialization
  return <DynamicApp />;
}
