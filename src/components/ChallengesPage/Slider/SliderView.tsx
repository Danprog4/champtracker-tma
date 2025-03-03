import React from "react";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { updateOnBoarding } from "@/api/challenge";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

type Card = {
  id: number;
  imageUrl: string;
  title: string;
};

type Category = {
  title: string;
  color: string;
  items: Card[];
};

interface DumpSliderProps {
  categories: Category[];
  sliderValues: { [key: number]: number };
  onValueChange: (categoryIndex: number, value: number[]) => void;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  sliderValues,
  onValueChange,
}) => (
  <div className="flex flex-col">
    {categories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-8 pl-3">
        <div className="flex justify-between pr-3 items-start mb-3">
          <div className="">{category.title}</div>
          <div className="text-neutral-400 text-sm mt-1">
            {Math.round(sliderValues[categoryIndex] || 0) + 1}/
            {category.items.length}
          </div>
        </div>
        <div className="px-4">
          <Slider
            value={[sliderValues[categoryIndex] || 0]}
            onValueChange={(value) => onValueChange(categoryIndex, value)}
            max={category.items.length - 1}
            step={1}
            className="mb-4"
          />
        </div>
        <div className="flex space-x-4 overflow-hidden">
          {category.items.map((card, cardIndex) => (
            <Link
              onClick={() => {
                updateOnBoarding(true);
              }}
              to="/card/$id"
              params={{ id: String(card.id) }}
              key={cardIndex}
              className={`relative flex-shrink-0 bg-cover rounded-lg transition-transform duration-300`}
              style={{
                transform: `translateX(${-(sliderValues[categoryIndex] || 0) * (250 + 16)}px)`,
              }}>
              <Image
                src={card.imageUrl}
                alt={card.title}
                className="-z-50 h-[250px] w-[250px] object-contain"
                loading="eager"
                priority={cardIndex < 4}
                width={250}
                height={250}
              />
              <div className="text-outline font-druk absolute inset-0 p-3 text-start text-lg leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
                {card.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default DumpSlider;
