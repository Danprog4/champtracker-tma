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
};

// Create context
const AuthContext = createContext<AuthState>({
  isAuthReady: false,
  isAuthenticated: false,
  authError: null,
  isLoading: true,
});

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthReady: false,
    isAuthenticated: false,
    authError: null,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
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

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
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
