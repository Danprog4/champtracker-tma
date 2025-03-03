import React from "react";
import { categories } from "@/configs/cards.config";
import SingleSlider from "../SingleSlider";

const LifestyleSlider: React.FC = () => {
  // Get the lifestyle category (third category)
  const lifestyleCategory = categories[2];
  return <SingleSlider category={lifestyleCategory} />;
};

export default LifestyleSlider;
