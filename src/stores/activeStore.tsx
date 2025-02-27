import { useUser } from "@/hooks/useUser";
import { isDateUpdate } from "@/lib/dateUtils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ActiveStore {
  active: boolean;
  setActive: (active: boolean) => void;
}

export const useActiveStore = create<ActiveStore>()(
  persist(
    (set) => ({
      active: true,
      setActive: (active) => set({ active }),
    }),
    {
      name: "active-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
