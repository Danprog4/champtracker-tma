import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";
import { useAuthState } from "./hooks/useAuthState";
import { UnifiedLoadingState } from "./router";

function App() {
  usePrefetchQueries();

  // Access the auth state
  const { isLoading, authError } = useAuthState();

  // Handle authentication error
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <p className="text-red-500">{authError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-h-screen overflow-auto antialiased bg-black overscroll-contain text-white">
      <Outlet />
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
