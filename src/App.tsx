import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import { usePrefetchQueries } from "./hooks/usePrefetchQuery";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthRetryLoading } from "./hooks/useAuthRetryLoading";
import { UnifiedLoadingState } from "./router";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

// Auth retry loading overlay component
const AuthRetryOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
    <div className="bg-neutral-800 p-6 rounded-lg text-center max-w-md">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-lg text-white">Refreshing authentication...</p>
      <p className="mt-2 text-sm text-gray-400">
        Please wait while we renew your session
      </p>
    </div>
  </div>
);

function App() {
  usePrefetchQueries();
  useScrollRestoration();

  // Access the auth state
  const { isLoading, authError } = useAuthState();
  // Check if we're retrying authentication
  const isRetrying = useAuthRetryLoading();

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Outlet />
      <Toaster position="top-center" theme="dark" />

      {/* Show retry overlay when refreshing authentication */}
      {isRetrying && <AuthRetryOverlay />}
    </div>
  );
}

export default App;
