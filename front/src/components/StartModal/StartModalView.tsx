"use client";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Months } from "@/configs/months.config";
import dayjs, { Dayjs } from "dayjs";
import { Drawer } from "vaul";

interface StartDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tempStartTime: string;
  setTempStartTime: (value: string) => void;
  tempDate?: Date;
  setTempDate: (value: Date | undefined) => void;
  disabled: boolean;
  startedDate?: string;
  handleSave: () => void;
  startDate: string;
  date?: Dayjs;
  isDisabledFunc: (date: Date) => boolean;
}

export default function StartModalView({
  isOpen,
  onOpenChange,
  tempStartTime,
  setTempStartTime,
  tempDate,
  setTempDate,
  disabled,
  startedDate,
  handleSave,
  isDisabledFunc,
}: StartDrawerProps) {
  const today = dayjs();
  const monthNumber = tempDate ? tempDate.getMonth() + 1 : 1;

  const isValidDate = (date: any): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Trigger
        className={`mt-2 flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px] ${
          disabled && "bg-gray-800"
        }`}
        disabled={disabled}>
        <span>Старт</span>
        <span className="text-gray-400">
          {startedDate ||
            (tempStartTime === "Now" && "Сейчас >") ||
            (tempStartTime === "Tomorrow" && "Завтра >") ||
            (isValidDate(tempDate) &&
              (dayjs(tempDate).isSame(today, "day")
                ? "Сегодня >"
                : dayjs(tempDate).isSame(today.add(1, "day"), "day")
                  ? "Завтра >"
                  : `${dayjs(tempDate).format("DD.MM.YYYY")} >`))}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Старт
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                value={tempStartTime}
                onValueChange={setTempStartTime}>
                <RadioGroupItem
                  value="Now"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]">
                  Сейчас
                </RadioGroupItem>
                <RadioGroupItem
                  value="Tomorrow"
                  className="max-h-[40px] w-[90vw] rounded-none border-b-2 border-gray-600 bg-gray-700 p-[10px]">
                  Завтра
                </RadioGroupItem>
                <RadioGroupItem
                  value="Own date"
                  className="flex max-h-[40px] w-[90vw] justify-between rounded-t-none bg-gray-700 p-[10px]">
                  <span>Своя дата</span>
                  {isValidDate(tempDate) &&
                    !dayjs(tempDate).isSame(today, "day") &&
                    !dayjs(tempDate).isSame(today.add(1, "day"), "day") && (
                      <span>{`${
                        tempDate?.getDate() <= 9
                          ? "0" + tempDate?.getDate()
                          : tempDate?.getDate()
                      } ${Months[monthNumber]}`}</span>
                    )}
                </RadioGroupItem>
              </RadioGroup>
              {tempStartTime === "Own date" && (
                <Calendar
                  mode="single"
                  selected={tempDate}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const now = new Date();
                      selectedDate.setHours(now.getHours());
                      selectedDate.setMinutes(now.getMinutes());
                      setTempDate(selectedDate);
                    }
                  }}
                  disabled={isDisabledFunc}
                  className="mt-2 flex w-[90vw] items-center justify-center rounded-md border bg-gray-700"
                />
              )}
            </div>
            <div
              className="flex items-center justify-center pl-0 font-extrabold"
              onClick={handleSave}>
              <div className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-yellow-300 p-5">
                <span>ГОТОВО</span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
