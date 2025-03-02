import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { login, getToken } from "@/api/auth";

// Define the authentication state
type AuthState = {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  authError: string | null;
  isLoading: boolean;
  reset: () => void;
};

// Create context
const AuthContext = createContext<AuthState>({
  isAuthReady: false,
  isAuthenticated: false,
  authError: null,
  isLoading: true,
  reset: () => {},
});

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<Omit<AuthState, "reset">>({
    isAuthReady: false,
    isAuthenticated: false,
    authError: null,
    isLoading: true,
  });

  // Function to initialize or reset authentication
  const initAuth = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, authError: null }));

      // Check if already authenticated
      if (getToken()) {
        setAuthState({
          isAuthReady: true,
          isAuthenticated: true,
          authError: null,
          isLoading: false,
        });
        return;
      }

      // Login if not authenticated
      await login();

      setAuthState({
        isAuthReady: true,
        isAuthenticated: true,
        authError: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthState({
        isAuthReady: true,
        isAuthenticated: false,
        authError: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  };

  // Reset function to re-initialize authentication
  const reset = () => {
    initAuth();
  };

  useEffect(() => {
    initAuth();
  }, []);

  // Combine state with reset method
  const contextValue: AuthState = {
    ...authState,
    reset,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Create hook to use the auth context
export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};
