import { cn } from "@/lib/utils";
import React from "react";

type TitileProps = {
  title: string;
  setTitle: (title: string) => void;
};

const Title: React.FC<TitileProps> = ({ title, setTitle }) => {
  return (
    <div className="flex flex-col pl-5 text-start text-black">
      <span className="mt-4 text-sm">Название</span>
      <div
        className={cn(
          "mr-[5%] mt-3 text-2xl font-extrabold uppercase",
          title === "НАЗВАНИЕ ЗАДАНИЯ" && "opacity-[0.3]"
        )}>
        <input
          type="text"
          className="w-full border-none bg-transparent text-black placeholder:text-gray-500 focus:outline-none"
          value={title}
          onChange={(e) => {
            const inputValue = e.target.value.toUpperCase();
            const filteredValue = inputValue.replace(/[^a-zA-Zа-яА-Я\s]/g, "");
            setTitle(filteredValue);
          }}
          placeholder="НАЗВАНИЕ ЗАДАНИЯ"
        />
      </div>
    </div>
  );
};

export default Title;
