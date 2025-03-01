"use client";
import React, { useEffect, useState } from "react";
import { categories } from "@/configs/cards.config";
import DurationModalView from "./DurationModalView";

type DurPropsSmart = {
  duration: number;
  setDuration: (duration: number) => void;
  id?: string;
  regularity: "everyday" | "fewTimesAWeek";
};

const DurationModal: React.FC<DurPropsSmart> = ({
  duration,
  setDuration,
  id,
  regularity,
}) => {
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [inputDuration, setInputDuration] = useState("");
  const [tempDuration, setTempDuration] = useState(duration);
  const [isLong, setIsLong] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const card = React.useMemo(
    () =>
      categories
        .flatMap((category) => category.items)
        .find((item) => item.id === Number(id)),
    [categories, id]
  );

  const presetDurations = React.useMemo(
    () =>
      regularity === "everyday"
        ? card?.duration?.length
          ? card.duration
          : [7, 15, 30, 90]
        : [14, 28, 56, 84],
    [regularity, card]
  );

  const isButtonDisabled =
    (isCustomDuration && inputDuration.length === 0) || isLong;

  const isEveryday = regularity === "everyday";

  const handleDurationChange = (value: string) => {
    setInputDuration(value);
    const weeksOrDays = Number(value);

    if (!value) {
      setIsLong(false);
      setTempDuration(0);
      return;
    }

    const durationInDays =
      regularity === "everyday" ? weeksOrDays : weeksOrDays * 7;
    const maxDuration = regularity === "everyday" ? 300 : 280;
    const isExceedingLimit = durationInDays > maxDuration;
    setIsLong(isExceedingLimit);

    if (!isExceedingLimit) {
      setTempDuration(durationInDays);
    }
  };

  const handleRadioChange = (value: string) => {
    if (value === "Own duration") {
      setIsCustomDuration(true);
    } else {
      setTempDuration(Number(value));
      setInputDuration("");
      setIsCustomDuration(false);
    }
  };

  const handleSave = () => {
    const finalDuration = isCustomDuration
      ? Number(inputDuration) * (regularity === "everyday" ? 1 : 7)
      : tempDuration;

    if (!isLong && finalDuration > 0) {
      setDuration(finalDuration);
      setIsOpen(false);
    } else {
      setDuration(regularity === "everyday" ? 30 : 84);
      setIsOpen(false);
      setIsCustomDuration(false);
      setInputDuration("");
      setIsLong(false);
      setTempDuration(regularity === "everyday" ? 30 : 84);
    }
  };
  console.log(
    isCustomDuration
      ? Number(inputDuration) * (regularity === "everyday" ? 1 : 7)
      : tempDuration,
    "finalDuration"
  );

  console.log(duration, "duration");

  const handleClose = () => {
    setTempDuration(duration);
    !presetDurations.includes(duration)
      ? setInputDuration(
          (duration / (regularity === "everyday" ? 1 : 7)).toString()
        )
      : setInputDuration("");
    setIsCustomDuration(!presetDurations.includes(duration));
    setIsLong(false);
    setIsOpen(false);
  };

  return (
    <DurationModalView
      duration={duration}
      setDuration={setDuration}
      id={id}
      regularity={regularity}
      isCustomDuration={isCustomDuration}
      setIsCustomDuration={setIsCustomDuration}
      inputDuration={inputDuration}
      setInputDuration={setInputDuration}
      tempDuration={tempDuration}
      setTempDuration={setTempDuration}
      isLong={isLong}
      setIsLong={setIsLong}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      presetDurations={presetDurations}
      handleDurationChange={handleDurationChange}
      handleSave={handleSave}
      handleClose={handleClose}
      isButtonDisabled={isButtonDisabled}
      handleRadioChange={handleRadioChange}
      isEveryday={isEveryday}
    />
  );
};

export default DurationModal;
