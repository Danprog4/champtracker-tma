import { Challenge } from '@back-types';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Подключаем плагины
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateWithTimezone = (date: string | Date | Dayjs): string => {
  const formattedDate = dayjs(date)
    .tz(dayjs.tz.guess())
    .format('YYYY-MM-DD HH:mm:ssZ');
  return formattedDate;
};

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
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
};

export const getDatesForDaysOfWeek = (
  startDate: Dayjs,
  duration: number,
  selectedDays: number[] | null,
  regularity: string,
): string[] => {
  const taskDays: string[] = [];

  // if (regularity !== 'everyday') {
  //   for (let i = 0; i < duration; i++) {
  //     if (selectedDays && selectedDays.includes(currentDate.day())) {
  //       taskDays.push(formatDateWithTimezone(currentDate.toISOString())); // Без времени
  //     }
  //     currentDate = currentDate.add(1, 'day');
  //   }
  // } else {
  //   for (let i = 0; i < duration; i++) {
  //     taskDays.push(formatDateWithTimezone(currentDate.toISOString())); // Без времени
  //     currentDate = currentDate.add(1, 'day');
  //   }
  // }

  if (regularity === 'everyday') {
    for (let i = 0; i < duration; i++) {
      const currentDate = dayjs(startDate).add(i, 'day');
      taskDays.push(formatDateWithTimezone(currentDate));
    }
  } else {
    for (let i = 0; i < duration; i++) {
      const currentDate = dayjs(startDate).add(i, 'day');
      if (selectedDays && selectedDays.includes(currentDate.day())) {
        taskDays.push(formatDateWithTimezone(currentDate));
      }
    }
  }

  console.log('getDatesForDaysOfWeek()', taskDays);

  return taskDays;
};

export const dayBeforeToday = (date: string): boolean => {
  const dateToCompare = new Date(date);
  return dateToCompare < new Date();
};

export const calculateWeeks = (
  challenge: Challenge,
): {
  week: number;
  days: string[];
}[] => {
  const weeks = [];
  let currentWeek = [];

  if (!challenge.daysOfWeek || challenge.daysOfWeek.length === 0) {
    console.error('challenge.daysOfWeek is null or empty');
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
