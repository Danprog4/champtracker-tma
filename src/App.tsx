import { usePrefetchQueries } from "./hooks/usePrefetchQuery";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthRetryLoading } from "./hooks/useAuthRetryLoading";
import { useScrollRestoration } from "./hooks/useScrollRestoration";
import { Layout } from "./components/Layout";
import { useUser } from "./hooks/useUser";
import { CarouselDApiDemo } from "./tanstack-pages/CarouselPage/CarouselPage";

function App() {
  usePrefetchQueries();
  useScrollRestoration();
  const { user } = useUser();
  const isOnboarding = user.onBoarding;

  // Access the auth state
  const { isLoading, authError } = useAuthState();
  // Check if we're retrying authentication
  const isRetrying = useAuthRetryLoading();

  // Handle authentication error
  if (authError) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
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

  return <Layout isRetrying={isRetrying} />;
}

export default App;
