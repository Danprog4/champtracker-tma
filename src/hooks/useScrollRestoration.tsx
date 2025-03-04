import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export const useScrollRestoration = () => {
  const location = useLocation(); // Get the full location object

  useEffect(() => {
    console.log("Scroll triggered for path:", location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

// Usage example:
// function App() {
//   useScrollRestoration();
//   return <YourContent />;
// }
