import React from "react";
import { categories } from "@/configs/cards.config";
import SingleSlider from "../SingleSlider";

const HealthSlider: React.FC = () => {
  // Get the health category (second category)
  const healthCategory = categories[1];
  return <SingleSlider category={healthCategory} />;
};

export default HealthSlider;
