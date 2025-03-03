import React from "react";
import { categories } from "@/configs/cards.config";
import SingleSlider from "../SingleSlider";

const EducationSlider: React.FC = () => {
  // Get the education category (first category)
  const educationCategory = categories[0];
  return <SingleSlider category={educationCategory} />;
};

export default EducationSlider;
