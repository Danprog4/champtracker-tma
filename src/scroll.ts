export const scroll = () => {
  if (typeof window !== "undefined") {
    // Enable browser's native scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }

    // Save scroll position before navigation
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    });

    // Restore scroll position after page load
    window.addEventListener("load", () => {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(scrollPosition),
            behavior: "auto",
          });
          sessionStorage.removeItem("scrollPosition");
        }, 0);
      }
    });

    // Additional handler for SPA navigation
    if (typeof document !== "undefined") {
      document.addEventListener("DOMContentLoaded", () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
          setTimeout(() => {
            window.scrollTo({
              top: parseInt(scrollPosition),
              behavior: "auto",
            });
          }, 0);
        }
      });
    }
  }
};
