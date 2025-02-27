import { Colors } from "@/configs/bgColors.config";
import React from "react";

type ColorsProps = {
  color: string;
  setColor: (color: string) => void;
};

const ColorsSchema: React.FC<ColorsProps> = ({ color, setColor }) => {
  return (
    <>
      <div className="mt-3 flex flex-col pl-3 pt-4 text-start">
        <span className="mb-2 text-gray-300">Цветовая тема</span>
      </div>
      <div className="mb-4 grid grid-cols-5 gap-0">
        {Object.keys(Colors).map((classColor: string) => (
          <div
            key={classColor}
            className={`cursor-pointer w-full aspect-square rounded-full ${classColor} ${
              color === classColor ? "border-4 border-white" : ""
            }`}
            onClick={() => setColor(classColor)}></div>
        ))}
      </div>
    </>
  );
};

export default ColorsSchema;
