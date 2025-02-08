import { categories } from '@/cards.config';
import { useChallenges } from '@/hooks/useChallenges';
import { getDatesForDaysOfWeek } from '@/lib/dateUtils';
import { useNavigate, useParams } from '@tanstack/react-router';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CreateDump from './CreatePageView';
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateSmart: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const { createChallenge } = useChallenges();
  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id)),
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  const [title, setTitle] = useState(card?.title || '');
  const [isNotifications, setIsNotifications] = useState(false);
  const [notifications, setNotifications] = useState('');
  const [color, setColor] = useState(category?.color || 'bg-pink-200');
  const [regularity, setRegularity] = useState<'everyday' | 'fewTimesAWeek'>(
    'everyday',
  );
  const [duration, setDuration] = useState(regularity === 'everyday' ? 30 : 84);
  const [date, setDate] = useState<Dayjs | undefined>(undefined);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  useEffect(() => {
    setDuration(regularity === 'everyday' ? 30 : 84);
  }, [regularity]);

  const handleSave = async () => {
    if (!title || title === 'НАЗВАНИЕ ЗАДАНИЯ') {
      toast('Напишите название задания');
      return;
    }

    // Получаем startDate
    const startDate = date ? dayjs(date) : dayjs();
    if (startDate < dayjs()) {
      toast('Напишите возможное время (не в прошлом)');
      return;
    }

    // Получаем taskDays
    const taskDates = getDatesForDaysOfWeek(
      startDate,
      duration,
      daysOfWeek,
      regularity,
    );

    try {
      // Создаем задание
      createChallenge({
        title,
        duration,
        color,
        regularity,
        daysOfWeek,
        taskDates,
        challengeStartAt: dayjs(startDate).toISOString(),
      });
      toast('Задание успешно сохранено!');
      navigate({ to: '/' });
    } catch (error) {
      toast('Ошибка при сохранении задания');
    }
  };

  return (
    <CreateDump
      card={card}
      title={title}
      setTitle={setTitle}
      color={color}
      setColor={setColor}
      regularity={regularity}
      setRegularity={setRegularity}
      duration={duration}
      setDuration={setDuration}
      date={date}
      setDate={setDate}
      isNotifications={isNotifications}
      setIsNotifications={setIsNotifications}
      notifications={notifications}
      setNotifications={setNotifications}
      daysOfWeek={daysOfWeek}
      setDaysOfWeek={setDaysOfWeek}
      handleSave={handleSave}
    />
  );
};

export default CreateSmart;
