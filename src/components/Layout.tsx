import { Toaster } from "sonner";
import { Outlet } from "@tanstack/react-router";

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
  return (
    <div className=" bg-black text-white overflow-hidden ">
      <Outlet />
      <Toaster position="top-center" className="mt-12" theme="dark" />

      {/* Show retry overlay when refreshing authentication */}
      {isRetrying && <AuthRetryOverlay />}
    </div>
  );
}
