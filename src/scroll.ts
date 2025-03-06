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

// Fix for mobile viewport height issues
export function fixViewportHeight() {
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Fix for mobile browsers by setting explicit heights
  document.documentElement.style.height = `${window.innerHeight}px`;
  document.body.style.height = `${window.innerHeight}px`;

  // Ensure the background color is black everywhere
  document.documentElement.style.backgroundColor = "black";
  document.body.style.backgroundColor = "black";

  // Add fixes for iOS Safari
  if (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    document.documentElement.style.height = "-webkit-fill-available";
    document.body.style.height = "-webkit-fill-available";
  }

  // Set minimum heights
  document.documentElement.style.minHeight = "100vh";
  document.body.style.minHeight = "100vh";

  // Prevent overscroll behavior
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.overscrollBehavior = "none";
}
