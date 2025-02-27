import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";

function App() {
  usePrefetchQueries();

  return (
    <div className="relative h-screen rounded-lg bg-black text-white shadow-lg">
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
