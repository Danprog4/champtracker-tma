import { updateOnBoarding } from "@/api/challenge";
import { PlusIcon } from "@/icons/Plus";

export const CreateTaskButton = () => (
  <div
    className="fixed bottom-[10px] z-20 flex h-[45px] w-[90vw] items-center justify-between rounded-lg bg-yellow-300 p-5 text-black"
    onClick={() => {
      updateOnBoarding(true);
    }}>
    <PlusIcon />
    <span className="text-sm text-black">СОЗДАЙ НОВОЕ ЗАДАНИЕ</span>
  </div>
);
