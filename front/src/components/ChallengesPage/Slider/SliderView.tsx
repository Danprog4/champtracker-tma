import React from "react";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";

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
  isPremium: boolean;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  currentSlide,
  onScroll,
  isPremium,
}) => (
  <div className="flex flex-col">
    {categories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-8 pl-5">
        <div className="flex justify-between pr-5">
          <div className="mb-4">{category.title}</div>
          <div className="text-gray-400">
            {currentSlide[categoryIndex] || 1}/{category.items.length}
          </div>
        </div>
        <div
          onScroll={() => onScroll(categoryIndex)}
          className="flex snap-x snap-mandatory space-x-4 overflow-auto scroll-smooth"
        >
          {category.items.map((card, cardIndex) =>
            isPremium ? (
              <Link
                to="/card/$id"
                params={{ id: String(card.id) }}
                key={cardIndex}
                className={`relative flex-shrink-0 bg-cover ${category.color} rounded-lg`}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="-z-50 h-[250px] w-[250px] object-contain"
                />
                <div className="text-outline absolute inset-0 p-3 text-start text-[24px] font-bold leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
                  {card.title}
                </div>
              </Link>
            ) : (
              <BuyPremium key={cardIndex}>
                <div
                  className={`relative flex-shrink-0 bg-cover ${category.color} rounded-lg`}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="-z-50 h-[250px] w-[250px] object-contain"
                  />

                  <div className="text-outline absolute inset-0 p-3 text-start text-[24px] font-bold leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
                    {card.title}
                  </div>
                </div>
              </BuyPremium>
            )
          )}
        </div>
      </div>
    ))}
  </div>
);

export default DumpSlider;
