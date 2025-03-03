import React, { useRef, useState, useEffect } from "react";
import { categories } from "@/configs/cards.config";
import DumpSlider from "./SliderView";

const SmartSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<{ [key: number]: number }>(
    {}
  );
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (categoryIndex: number) => {
    const slider = sliderRefs.current[categoryIndex];
    if (!slider) return;
    const cardWidth = 250 + 16; // card width + margin
    const scrollPosition = slider.scrollLeft;
    const currentIndex = Math.round(scrollPosition / cardWidth) + 1;
    setCurrentSlide((prev) => ({
      ...prev,
      [categoryIndex]: currentIndex,
    }));
  };

  // Force a rerender when scrolling stops to ensure images load correctly
  useEffect(() => {
    const sliders = sliderRefs.current;
    const handleScrollEnd = (categoryIndex: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          // This will cause a subtle rerender that helps with image loading
          setCurrentSlide((prev) => ({
            ...prev,
            [categoryIndex]: prev[categoryIndex] || 1,
          }));
        }, 150);
      };
    };

    sliders.forEach((slider, index) => {
      if (slider) {
        const scrollEndHandler = handleScrollEnd(index);
        slider.addEventListener("scroll", scrollEndHandler);
        return () => {
          slider.removeEventListener("scroll", scrollEndHandler);
        };
      }
    });
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
