import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";
import React from "react";
import { useIsMobile } from "@/hooks/usePlatform";

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

interface LayoutProps {
  isRetrying?: boolean;
}

export function Layout({ isRetrying }: LayoutProps) {
  // Add useEffect to control body overflow when overlay is shown
  React.useEffect(() => {
    if (isRetrying) {
      // Prevent scrolling on the body when overlay is active
      document.body.classList.add("overflow-hidden");
    } else {
      // Re-enable scrolling when overlay is removed
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isRetrying]);

  const isMobile = useIsMobile();

  return (
    <div
      className="bg-black text-white overflow-hidden min-h-screen height-fix flex flex-col w-full"
      style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Outlet />
      <Toaster
        data-mobile={isMobile}
        position="top-center"
        className={`data-[mobile=true]:mt-20 mt-0`}
        theme="dark"
      />

      {/* Show retry overlay when refreshing authentication */}
      {isRetrying && <AuthRetryOverlay />}
    </div>
  );
}
