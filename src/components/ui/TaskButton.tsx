import { updateOnBoarding } from "@/api/challenge";
import { PlusIcon } from "@/icons/Plus";
import { useUser } from "@/hooks/useUser";
import { Lock } from "@/icons/Lock";
import { isPremium } from "@/lib/challengeUtills";

export const CreateTaskButton = () => {
  const { user } = useUser();

  return (
    <div
      className="fixed bottom-0 shadow-xl shadow-black z-20 flex h-[45px] w-[94vw] items-center justify-between rounded-lg bg-yellow-400 p-5 text-black"
      onClick={() => {
        updateOnBoarding(true);
      }}>
      <PlusIcon />
      <span className="text-[10px] text-black font-druk">
        СОЗДАТЬ СВОЕ ЗАДАНИЕ
      </span>
    </div>
  );
};
