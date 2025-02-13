import { Colors } from "@/configs/bgColors.config";
import React from "react";

type ColorsProps = {
  color: string;
  setColor: (color: string) => void;
};

const ColorsSchema: React.FC<ColorsProps> = ({ color, setColor }) => {
  return (
    <>
      <div className="mt-2 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Цвет</span>
      </div>
      <div className="mb-10 grid grid-cols-5 gap-0">
        {Colors.map((classColor: string) => (
          <div
            key={classColor}
            className={`h-[78px] w-[78px] cursor-pointer rounded-full ${classColor} ${
              color === classColor ? "border-4 border-white" : ""
            }`}
            onClick={() => setColor(classColor)}></div>
        ))}
      </div>
    </>
  );
};

export default ColorsSchema;
