import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";

function App() {
  usePrefetchQueries();

  return (
    <div className="relative h-screen rounded-lg bg-black bg-cover text-white shadow-lg ">
      <Outlet />
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
