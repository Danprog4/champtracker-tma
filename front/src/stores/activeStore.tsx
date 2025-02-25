import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ActiveStore {
  active: boolean;
  setActive: (active: boolean) => void;
}

export const useActiveStore = create<ActiveStore>()(
  persist(
    (set) => ({
      active: false, // Начальное значение по умолчанию
      setActive: (active) => set({ active }),
    }),
    {
      name: "active-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
