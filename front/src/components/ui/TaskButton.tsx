import { updateOnBoarding } from "@/api/challenge";
import { PlusIcon } from "@/icons/Plus";

export const CreateTaskButton = () => (
  <div
    className="fixed bottom-[30px] shadow-xl  shadow-black z-20 flex h-[48px] w-[94vw] items-center justify-between rounded-lg bg-yellow-400 p-5 text-black"
    onClick={() => {
      updateOnBoarding(true);
    }}>
    <PlusIcon />
    <span className="text-[10px] text-black font-druk">
      СОЗДАТЬ СВОЕ ЗАДАНИЕ
    </span>
  </div>
);
