import React, { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
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

interface SingleSliderProps {
  category: Category;
}

const SingleSlider: React.FC<SingleSliderProps> = ({ category }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = 250 + 16; // card width + margin
    const scrollPosition = slider.scrollLeft;
    const currentIndex = Math.round(scrollPosition / cardWidth) + 1;
    setCurrentSlide(currentIndex);
  };

  return (
    <div className="pl-3">
      <div className="flex justify-between pr-3 items-start mb-3">
        <div className="text-xl font-bold">{category.title}</div>
        <div className="text-neutral-400 text-sm mt-1">
          {currentSlide}/{category.items.length}
        </div>
      </div>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory space-x-4 overflow-auto scroll-smooth">
        {category.items.map((card, cardIndex) => (
          <Link
            onClick={() => {
              updateOnBoarding(true);
            }}
            to="/card/$id"
            params={{ id: String(card.id) }}
            key={cardIndex}
            className={`relative flex-shrink-0 bg-cover rounded-lg`}
            style={{ transform: "translate3d(0,0,0)" }}>
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
  );
};

export default SingleSlider;
