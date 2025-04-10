export const useIsMobile = () => {
  return (
    window.Telegram.WebApp.platform === "ios" ||
    window.Telegram.WebApp.platform === "android" ||
    window.Telegram.WebApp.platform === "android-x" ||
    window.Telegram.WebApp.platform === "android_x"
  );
};
