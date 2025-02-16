"use client";
import { useState } from "react";
import RegularityModalView from "./RegularityModalView";

interface RegProps {
  regularity: "everyday" | "fewTimesAWeek";
  setRegularity: (value: "everyday" | "fewTimesAWeek") => void;
  daysOfWeek: number[];
  setDaysOfWeek: (value: number[]) => void;
  setDuration?: (value: number) => void;
}

const daysOfWeekMap: { [key: number]: string } = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

export default function RegularityModal({
  regularity,
  setRegularity,
  daysOfWeek,
  setDaysOfWeek,
  setDuration,
}: RegProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [outputDays, setOutputDays] = useState<string[]>(
    daysOfWeek.map((day) => daysOfWeekMap[day])
  );
  const [tempOutputDays, setTempOutputDays] = useState<string[]>(outputDays);
  const [tempRegularity, setTempRegularity] = useState(regularity);
  const [tempDaysOfWeek, setTempDaysOfWeek] = useState(daysOfWeek);

  const handleChangeRegularity = (option: "everyday" | "fewTimesAWeek") => {
    if (setDuration) {
      setDuration(option === "everyday" ? 30 : 84);
    }
    setTempRegularity(option);
    if (option === "everyday") {
      setTempDaysOfWeek([]);
      setTempOutputDays([]);
    }
  };

  const handleClose = () => {
    setTempRegularity(regularity);
    setTempDaysOfWeek(daysOfWeek);
    setTempOutputDays(outputDays);
  };

  const handleToggleDay = (day: number, dayName: string) => {
    if (tempDaysOfWeek.includes(day)) {
      setTempDaysOfWeek(tempDaysOfWeek.filter((item) => item !== day));
      setTempOutputDays(tempOutputDays.filter((item) => item !== dayName));
    } else {
      setTempDaysOfWeek([...tempDaysOfWeek, day]);
      setTempOutputDays([...tempOutputDays, dayName]);
    }
  };

  const handleSaveChanges = () => {
    const finalRegularity =
      tempDaysOfWeek.length === 0 && tempRegularity !== "everyday"
        ? "everyday"
        : tempRegularity;

    setRegularity(finalRegularity);
    setTempRegularity(finalRegularity);
    setDaysOfWeek(tempDaysOfWeek);
    setOutputDays(tempOutputDays);
  };

  console.log(tempDaysOfWeek.length, "tempDaysOfWeek.length");
  console.log(regularity, "regularity");
  console.log(tempRegularity, "tempRegularity");
  return (
    <RegularityModalView
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      tempRegularity={tempRegularity}
      tempDaysOfWeek={tempDaysOfWeek}
      tempOutputDays={tempOutputDays}
      handleChangeRegularity={handleChangeRegularity}
      handleToggleDay={handleToggleDay}
      handleSaveChanges={handleSaveChanges}
      handleClose={handleClose}
    />
  );
}
