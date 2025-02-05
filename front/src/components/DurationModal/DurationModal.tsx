"use client";
import React, { useEffect, useState } from "react";
import { categories } from "@/cards.config";
import { DurProps } from "./DurationModalView";
import DurationModalView from "./DurationModalView";

type DurPropsSmart = {
  duration: number;
  setDuration: (duration: number) => void;
  id: string;
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

  useEffect(() => {
    const isPreset = presetDurations.includes(duration);
    setTempDuration(duration);
    setInputDuration(
      isPreset ? "" : String(duration / (regularity === "everyday" ? 1 : 7))
    );
    setIsCustomDuration(!isPreset);
  }, [duration, presetDurations]);

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

  const handleSave = () => {
    const finalDuration = isCustomDuration
      ? Number(inputDuration) * (regularity === "everyday" ? 1 : 7)
      : tempDuration;

    if (!isLong && finalDuration > 0) {
      setDuration(finalDuration);
      setIsOpen(false);
    }
  };

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
    />
  );
};

export default DurationModal;
