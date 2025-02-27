"use client";

import dynamic from "next/dynamic";

const DynamicHome = dynamic(
  () => import("@/components/Home").then((mod) => mod.Home),
  {
    ssr: false,
  }
);

export default DynamicHome;
