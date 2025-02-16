import { updateOnBoarding } from "@/api/challenge";
import AddImg from "../../assets/images/add-svgrepo-com.svg";

export const CreateTaskButton = () => (
  <div
    className="fixed bottom-[10px] z-20 flex h-[45px] w-[90vw] items-center justify-between rounded-lg bg-yellow-300 p-5"
    onClick={() => {
      updateOnBoarding(true);
    }}>
    <img src={AddImg} alt="Add" className="h-[20px] w-[20px] -translate-x-2" />
    <span className="text-sm text-black">СОЗДАЙ НОВОЕ ЗАДАНИЕ</span>
  </div>
);
