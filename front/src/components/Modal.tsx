import { useUser } from "@/hooks/useUser";
import { isDateUpdate } from "@/lib/dateUtils";
import { useActiveStore } from "@/stores/activeStore";
import { useEffect, useMemo } from "react";

export const Modal = () => {
  const { active, setActive } = useActiveStore();
  const { user } = useUser();
  const isAvailableDate = isDateUpdate(user.lastActiveDate, user.isPremium);

  if (!active || !isAvailableDate) return null;

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[94vw] border-2 border-gray-800 p-6 rounded-lg shadow-lg max-w-md flex flex-col gap-1">
        <h2 className="text-xl font-bold mb-4 font-druk">Приветствую!</h2>
        <p className="mb-6">
          Отмечай день хотя бы в одном твоем задании и получай токены!
        </p>
        <button
          onClick={() => {
            setActive(false);
          }}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 font-druk text-xs text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Продолжить
        </button>
      </div>
    </div>
  );
};
