export const scroll = () => {
  if (typeof window !== "undefined") {
    history.scrollRestoration = "auto";

    // Сохраняем позицию прокрутки перед переходом
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    });

    // Восстанавливаем позицию прокрутки после загрузки
    window.addEventListener("load", () => {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem("scrollPosition");
      }
    });
  }
};
