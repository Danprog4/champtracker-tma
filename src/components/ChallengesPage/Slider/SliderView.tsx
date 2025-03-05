import React from "react";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { updateOnBoarding } from "@/api/challenge";
import Image from "next/image";

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
  currentSlide: { [key: number]: number };
  onScroll: (categoryIndex: number) => void;
  sliderRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  currentSlide,
  onScroll,
  sliderRefs,
}) => (
  <div className="flex flex-col ">
    {categories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-8 pl-3">
        <div className="flex justify-between pr-3 items-start mb-3">
          <div className="">{category.title}</div>
          <div className="text-neutral-400 text-sm mt-1"></div>
        </div>
        <div
          className={`flex snap-x snap-mandatory space-x-4 overflow-auto overflow-y-hidden scroll-smooth gap-2 pb-4 w-screen `}>
          {category.items.map((card, cardIndex) => (
            <Link
              key={cardIndex}
              to="/card/$id"
              params={{ id: String(card.id) }}
              className={`relative flex-shrink-0 bg-cover ${category.color} h-[250px] w-[250px]`}
              style={{ transform: "t" }}>
              <div className="z-50 text-outline font-druk absolute inset-x-0 top-0 p-3 text-start text-lg leading-7 text-black">
                {card.title}
              </div>
              <img
                src={card.imageUrl}
                alt={card.title}
                className="absolute bottom-0 right-0 w-[180px] h-[180px] object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default DumpSlider;
