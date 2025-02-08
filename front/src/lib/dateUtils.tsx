import { Challenge } from "@back-types";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Подключаем плагины
dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateDaysSinceStart = (taskDates: string[]): number => {
  if (taskDates.length === 0) {
    return 0;
  }

  const startDate = new Date(taskDates[0]); // Преобразуем в Date
  const today = new Date();

  // Обнуляем время у обеих дат, чтобы считать только дни
  startDate.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  // Разница в миллисекундах
  const timeDifference = today.getTime() - startDate.getTime();

  // Вычисляем количество дней
  const daysSinceStart = Math.floor(timeDifference / (1000 * 3600 * 24));

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
  let currentDate = dayjs(startDate);

  if (regularity !== "everyday") {
    for (let i = 0; i < duration; i++) {
      if (selectedDays && selectedDays.includes(currentDate.day())) {
        taskDays.push(currentDate.format("YYYY-MM-DD")); // Без времени
      }
      currentDate = currentDate.add(1, "day");
    }
  } else {
    for (let i = 0; i < duration; i++) {
      taskDays.push(currentDate.format("YYYY-MM-DD")); // Без времени
      currentDate = currentDate.add(1, "day");
    }
  }

  console.log("Текущая дата:", dayjs(new Date()).format("YYYY-MM-DD"));
  console.log("taskDates:", taskDays);
  return taskDays;
};

export const dayBeforeToday = (date: string): boolean => {
  const dateToCompare = new Date(date);
  return dateToCompare < new Date();
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

export const calculateNextDay = (
  currentDate: Date,
  taskDates: string[],
  userCheckedDays: string[] | null
): string => {
  if (taskDates.length === 0) return "Нету";

  const today = formatDate(new Date());
  const formattedCurrentDate = formatDate(currentDate);

  // Найдем ближайшую доступную дату

  const nextAvailableDay = taskDates.find((date) => {
    // If userCheckedDays is not null, check if the date is not already checked
    if (userCheckedDays) {
      return !userCheckedDays.includes(date) && date >= formattedCurrentDate;
    } else {
      // If userCheckedDays is null, just check if the date is today or in the future
      return date >= formattedCurrentDate;
    }
  });

  console.log(nextAvailableDay, "nextDay");
  console.log(today, "today");

  if (!nextAvailableDay) return "Нету";

  // Если ближайший доступный день — сегодня
  if (nextAvailableDay === today) return "Сегодня";

  // Если ближайший доступный день — завтра
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  if (nextAvailableDay === tomorrow) return "Завтра";

  // Рассчитываем разницу в днях
  const daysUntilNext = Math.ceil(
    (Date.parse(nextAvailableDay) - currentDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return `Через ${daysUntilNext} ${daysUntilNext === 1 ? "день" : "дня"}`;
};
