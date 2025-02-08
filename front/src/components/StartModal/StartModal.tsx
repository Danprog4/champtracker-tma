"use client";
import { useEffect, useState } from "react";
import StartModalView from "./StartModalView";
import dayjs, { Dayjs } from "dayjs";

interface StartModalViewProps {
  date?: Dayjs;
  setDate?: (value: Dayjs | undefined) => void;
  disabled: boolean;
  startedDate?: string;
}

export default function StartModal({
  date,
  setDate,
  disabled,
  startedDate,
}: StartModalViewProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState("Now");
  const [tempStartTime, setTempStartTime] = useState(startDate);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    if (tempStartTime === "Now") {
      setTempDate(today);
    } else if (tempStartTime === "Tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setTempDate(tomorrow);
    } else if (tempStartTime === "Own date") {
      setTempDate(today);
    }
  }, [tempStartTime]);

  const handleSave = () => {
    if (setDate && tempDate) {
      setDate(dayjs(tempDate));
    }
    setStartDate(tempStartTime);
    setIsOpen(false);
  };

  console.log(tempDate, "temp");
  console.log(date, "date");

  return (
    <StartModalView
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      tempStartTime={tempStartTime}
      setTempStartTime={setTempStartTime}
      tempDate={tempDate}
      setTempDate={setTempDate}
      disabled={disabled}
      startedDate={startedDate}
      handleSave={handleSave}
      startDate={startDate}
      date={date}
    />
  );
}
