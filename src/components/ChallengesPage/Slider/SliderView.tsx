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
  <div className="flex flex-col">
    {categories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-8 pl-3">
        <div className="flex justify-between pr-3 items-start mb-3">
          <div className="">{category.title}</div>
          <div className="text-neutral-400 text-sm mt-1">
            {currentSlide[categoryIndex] || 1}/{category.items.length}
          </div>
        </div>
        <div
          ref={(el) => {
            if (el) {
              sliderRefs.current[categoryIndex] = el;
            }
          }}
          onScroll={() => onScroll(categoryIndex)}
          className="flex snap-x snap-mandatory space-x-4 overflow-auto scroll-smooth">
          {category.items.map((card, cardIndex) => (
            <Link
              onClick={() => {
                updateOnBoarding(true);
              }}
              to="/card/$id"
              params={{ id: String(card.id) }}
              key={cardIndex}
              className="relative flex-shrink-0 bg-cover rounded-lg w-[250px] h-[250px]"
              style={{ transform: "translate3d(0,0,0)" }}>
              <div className="relative w-full h-full">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  className="object-cover rounded-lg"
                  loading="eager"
                  priority={cardIndex < 4}
                  fill
                  sizes="250px"
                />
                <div className="text-outline font-druk absolute inset-0 p-3 text-start text-lg leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
                  {card.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default DumpSlider;
