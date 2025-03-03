import React from "react";
import EducationSlider from "./sliders/EducationSlider";
import HealthSlider from "./sliders/HealthSlider";
import LifestyleSlider from "./sliders/LifestyleSlider";

const SmartSlider: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8">
      <EducationSlider />
      <HealthSlider />
      <LifestyleSlider />
    </div>
  );
};

export default SmartSlider;
