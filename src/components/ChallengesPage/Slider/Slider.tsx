import React, { useRef, useState, useCallback } from "react";
import { categories } from "@/configs/cards.config";
import DumpSlider from "./SliderView";

const SmartSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<{ [key: number]: number }>(
    {}
  );
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback((categoryIndex: number) => {
    const slider = sliderRefs.current[categoryIndex];
    if (!slider) return;

    const cardWidth = 250 + 16; // card width + gap
    const scrollPosition = slider.scrollLeft;
    const currentIndex = Math.floor(scrollPosition / cardWidth) + 1;

    setCurrentSlide((prev) => ({
      ...prev,
      [categoryIndex]: Math.min(
        currentIndex,
        categories[categoryIndex]?.items.length || 1
      ),
    }));
  }, []);

  return (
    <DumpSlider
      categories={categories}
      currentSlide={currentSlide}
      onScroll={handleScroll}
      sliderRefs={sliderRefs}
    />
  );
};

export default SmartSlider;
