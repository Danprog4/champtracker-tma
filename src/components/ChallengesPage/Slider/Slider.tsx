import React, { useRef, useState } from "react";
import { categories } from "@/configs/cards.config";
import DumpSlider from "./SliderView";

// Example of how to structure the sliders
const sliders = [
  {
    title: "Popular Challenges",
    categories: categories.slice(0, 2), // First two categories
  },
  {
    title: "New Challenges",
    categories: categories.slice(2, 4), // Next two categories
  },
];

const SmartSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<{ [key: string]: number }>(
    {}
  );
  const sliderRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const handleScroll = (sliderIndex: number, categoryIndex: number) => {
    const slider = sliderRefs.current[sliderIndex]?.[categoryIndex];
    if (!slider) return;
    const cardWidth = 250 + 16; // card width + margin
    const scrollPosition = slider.scrollLeft;
    const currentIndex = Math.round(scrollPosition / cardWidth) + 1;
    setCurrentSlide((prev) => ({
      ...prev,
      [`${sliderIndex}-${categoryIndex}`]: currentIndex,
    }));
  };

  return (
    <DumpSlider
      sliders={sliders}
      currentSlide={currentSlide}
      onScroll={handleScroll}
      sliderRefs={sliderRefs}
    />
  );
};

export default SmartSlider;
