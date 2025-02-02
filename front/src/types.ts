export type Challenge = {
  id: number;
  userId: number;
  title: string;
  duration: number;
  color: string;
  createdAt: string;
  regularity: 'everyday' | 'fewTimesAWeek';
  daysOfWeek: number[] | null;
  taskDates: string[];
  userCheckedDates: string[] | null;
};
