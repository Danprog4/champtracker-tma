import { ChartBar } from "@/icons/ChartBar";
import { MyProfile } from "@/icons/MyProfile";
import { PlusIcon } from "@/icons/Plus";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Navbar = () => {
  return (
    <footer className="w-[100vw] bottom-0 fixed h-20 bg-black flex justify-between pb-7 px-8 ">
      <div
        className="flex flex-col items-center group"
        onClick={() =>
          toast.error("К сожалению, эта страница пока недоступна")
        }>
        <button className="text-white bg-transparent rounded-full aspect-square h-10 flex items-center justify-center border border-transparent">
          <span className="text-white group-hover:text-orange-400 transition-colors duration-200 mt-4">
            <ChartBar />
          </span>
        </button>
        <span className="text-white text-xs font-bold  group-hover:text-orange-400 transition-colors duration-200">
          Статс
        </span>
      </div>

      <Link to={"/new"} className="flex flex-col items-center  group">
        <button className="text-white bg-transparent rounded-full aspect-square h-10 flex items-center justify-center border border-transparent">
          <span className="text-white group-hover:text-orange-400 transition-colors duration-200 mt-4">
            <PlusIcon />
          </span>
        </button>
        <span className="text-white text-xs font-bold  group-hover:text-orange-400 transition-colors duration-200">
          Новый
        </span>
        <span className="text-white text-xs  group-hover:text-orange-400 transition-colors duration-200"></span>
      </Link>
      <Link
        to={"/profile"}
        className="group flex flex-col items-center cursor-pointer">
        <div className="text-white bg-transparent rounded-full aspect-square h-10 flex items-center justify-center border border-transparent">
          <span className="text-white group-hover:text-orange-400 transition-colors duration-200 mt-4">
            <MyProfile />
          </span>
        </div>
        <span className="text-white text-xs font-bold  group-hover:text-orange-400 transition-colors duration-200">
          Профиль
        </span>
      </Link>
    </footer>
  );
};
