import React, { useState } from "react";
import { categories } from "@/configs/cards.config";
import DumpSlider from "./SliderView";

const SmartSlider: React.FC = () => {
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>(
    Object.fromEntries(categories.map((_, i) => [i, 0]))
  );

  const handleSlideChange = (categoryIndex: number, slideIndex: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [categoryIndex]: slideIndex,
    }));
  };

  return (
    <DumpSlider
      categories={categories}
      currentSlides={currentSlides}
      onSlideChange={handleSlideChange}
    />
  );
};

export default SmartSlider;
