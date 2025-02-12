import React, { Suspense, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { FullPageSpinner } from "./components/shared/FullPageSpinner";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";
import { useChallenges } from "./hooks/useChallenges";

function App() {
  usePrefetchQueries();

  return (
    <div className="relative h-screen overflow-y-scroll rounded-lg bg-black text-white shadow-lg">
      <Suspense fallback={<FullPageSpinner />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
