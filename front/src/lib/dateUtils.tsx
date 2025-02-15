import { Challenge } from "@back-types";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Подключаем плагины
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateWithTimezone = (date: string | Date | Dayjs): string => {
  const formattedDate = dayjs(date)
    .tz(dayjs.tz.guess())
    .format("YYYY-MM-DD HH:mm:ssZ");
  return formattedDate;
};

export const calculateDaysSinceStart = (taskDates: string[]): number => {
  if (taskDates.length === 0) {
    return 0;
  }

  const startDate = dayjs(taskDates[0]).startOf("day"); // Преобразуем в Date
  const today = dayjs().startOf("day");

  const daysSinceStart = today.diff(startDate, "day");

  console.log(daysSinceStart, "daysSinceStart()");

  return daysSinceStart + 1;
};

export const formatDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export const getDatesForDaysOfWeek = (
  startDate: Dayjs,
  duration: number,
  selectedDays: number[] | null,
  regularity: string
): string[] => {
  const taskDays: string[] = [];

  if (regularity === "everyday") {
    for (let i = 0; i < duration; i++) {
      const currentDate = dayjs(startDate).add(i, "day");
      taskDays.push(formatDateWithTimezone(currentDate));
    }
  } else {
    for (let i = 0; i < duration; i++) {
      const currentDate = dayjs(startDate).add(i, "day");
      if (selectedDays && selectedDays.includes(currentDate.day())) {
        taskDays.push(formatDateWithTimezone(currentDate));
      }
    }
  }

  console.log("getDatesForDaysOfWeek()", taskDays);

  return taskDays;
};

export const dayBeforeToday = (date: string): boolean => {
  const dateToCompare = new Date(date);
  const today = new Date();

  // Убираем время, оставляя только дату
  dateToCompare.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return dateToCompare <= today; // Теперь можно нажать в тот же день
};

export const calculateWeeks = (
  challenge: Challenge
): {
  week: number;
  days: string[];
}[] => {
  const weeks = [];
  let currentWeek = [];

  if (!challenge.daysOfWeek || challenge.daysOfWeek.length === 0) {
    console.error("challenge.daysOfWeek is null or empty");
    return [];
  }

  const daysPerWeek = challenge.daysOfWeek.length;

  for (let i = 0; i < challenge?.taskDates.length; i++) {
    if (i > 0 && i % daysPerWeek === 0) {
      weeks.push({ week: weeks.length + 1, days: currentWeek });
      currentWeek = [];
    }

    currentWeek.push(challenge.taskDates[i]);
  }

  if (currentWeek.length > 0) {
    weeks.push({ week: weeks.length + 1, days: currentWeek });
  }

  return weeks;
};
export const getGlobalDayIndex = (
  date: string,
  taskDates: string[]
): number => {
  return taskDates.indexOf(date);
};

export const getNextAvailableDay = (challenge: Challenge): Dayjs | null => {
  // Only process challenges with fewTimesAWeek regularity
  if (challenge.regularity !== "fewTimesAWeek" || !challenge.daysOfWeek) {
    return null;
  }

  const today = dayjs().startOf("day");
  let nextDate = today;

  // Look through the next 7 days to find the next available day
  for (let i = 0; i < 7; i++) {
    const checkDate = today.add(i, "day");
    // In JavaScript, Sunday is 0, but in our data Sunday is 7
    let dayOfWeek = checkDate.day();

    if (challenge.daysOfWeek.includes(dayOfWeek)) {
      nextDate = checkDate;
      break;
    }
  }

  return nextDate;
};
