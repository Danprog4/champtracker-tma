import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";

function App() {
  usePrefetchQueries();

  return (
    <div className="min-h-screen max-h-screen overflow-auto antialiased bg-black overscroll-contain text-white">
      <Outlet />
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
