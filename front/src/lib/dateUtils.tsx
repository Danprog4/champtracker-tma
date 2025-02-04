import dayjs from "dayjs";

export const calculateDaysSinceStart = (taskDates: string[]): number => {
  if (taskDates.length === 0) {
    return 0;
  }

  const startDate = new Date(taskDates[0]);
  const today = new Date();

  const timeDifference = today.getTime() - startDate.getTime();
  const daysSinceStart = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysSinceStart + 1;
};

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month <= 9 ? "0" + month : month}-${
    day <= 9 ? "0" + day : day
  }`;
};

export const getDatesForDaysOfWeek = (
  startDate: Date,
  duration: number,
  selectedDays: number[],
  regularity: string
): string[] => {
  const taskDays: string[] = [];
  let currentDate = dayjs(startDate);

  if (regularity !== "Everyday") {
    for (let i = 0; i < duration; i++) {
      if (selectedDays.includes(currentDate.day())) {
        taskDays.push(currentDate.format("YYYY-MM-DD"));
      }
      currentDate = currentDate.add(1, "day");
    }
  } else {
    for (let i = 0; i < duration; i++) {
      taskDays.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
  }

  return taskDays;
};
