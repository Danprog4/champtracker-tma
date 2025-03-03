import React, { useState } from "react";
import { categories } from "@/configs/cards.config";
import DumpSlider from "./SliderView";

const SmartSlider: React.FC = () => {
  const [sliderValues, setSliderValues] = useState<{ [key: number]: number }>(
    Object.fromEntries(categories.map((_, i) => [i, 0]))
  );

  const handleValueChange = (categoryIndex: number, value: number[]) => {
    setSliderValues((prev) => ({
      ...prev,
      [categoryIndex]: value[0],
    }));
  };

  return (
    <DumpSlider
      categories={categories}
      sliderValues={sliderValues}
      onValueChange={handleValueChange}
    />
  );
};

export default SmartSlider;
