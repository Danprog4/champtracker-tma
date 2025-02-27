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
    if (!setDate || !tempDate) {
      setStartDate(tempStartTime);
      setIsOpen(false);
      return;
    }

    const today = dayjs().startOf("day").startOf("day");
    const tomorrow = today.add(1, "day").startOf("day");
    const selectedDate = dayjs(tempDate);

    if (tempStartTime === "Own date") {
      if (selectedDate.startOf("day").isSame(today, "day")) {
        setStartDate("Now");
        setTempStartTime("Now");
      } else if (selectedDate.startOf("day").isSame(tomorrow, "day")) {
        setStartDate("Tomorrow");
        setTempStartTime("Tomorrow");
      }
    } else {
      setStartDate(tempStartTime);
    }

    setDate(selectedDate);
    setIsOpen(false);
  };

  const isDisabled = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() < today.getDate() &&
      date.getMonth() <= today.getMonth() &&
      date.getFullYear() <= today.getFullYear()
    );
  };
  console.log(tempStartTime);
  console.log(startDate);
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
      isDisabledFunc={isDisabled}
    />
  );
}
