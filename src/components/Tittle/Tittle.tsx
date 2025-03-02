import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

type TitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

const Title: React.FC<TitleProps> = ({ title, setTitle }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  return (
    <div className="flex flex-col pl-3 text-start text-black">
      <span className="mt-8 text-sm mr-[5%] flex justify-between">
        Название
        {title !== "" && <span>{title.length}/28</span>}
      </span>
      <div
        className={cn(
          "mr-[5%] mt-2 text-2xl  uppercase",
          title === "НАЗВАНИЕ ЗАДАНИЯ" && "opacity-[0.3]"
        )}>
        <textarea
          ref={textareaRef}
          rows={1}
          className="w-full font-druk text-lg border-none bg-transparent text-black placeholder:text-neutral-500 focus:outline-none resize-none overflow-hidden"
          value={title}
          onChange={(e) => {
            const inputValue = e.target.value.toUpperCase();
            const filteredValue = inputValue.replace(/[^a-zA-Zа-яА-Я\s]/g, "");
            setTitle(filteredValue.slice(0, 28));
          }}
          placeholder="НАЗВАНИЕ ЗАДАНИЯ"
        />
      </div>
    </div>
  );
};

export default Title;
