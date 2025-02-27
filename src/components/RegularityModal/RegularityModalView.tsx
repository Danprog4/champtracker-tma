"use client";
import { Drawer } from "vaul";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RegularityModalViewProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  tempRegularity: "everyday" | "fewTimesAWeek";
  tempDaysOfWeek: number[];
  tempOutputDays: string[];
  handleChangeRegularity: (value: "everyday" | "fewTimesAWeek") => void;
  handleToggleDay: (day: number, dayName: string) => void;
  handleSaveChanges: () => void;
  handleClose: () => void;
}

export default function RegularityModalView({
  isOpen,
  setIsOpen,
  tempRegularity,
  tempDaysOfWeek,
  tempOutputDays,
  handleChangeRegularity,
  handleToggleDay,
  handleSaveChanges,
  handleClose,
}: RegularityModalViewProps) {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      onClose={handleSaveChanges}>
      <Drawer.Trigger className="flex w-[94vw] h-[45px] items-center justify-between rounded-md bg-gray-800 p-[10px]">
        <span>Регулярность</span>
        <span className="text-gray-400">
          {tempRegularity === "fewTimesAWeek"
            ? `${tempDaysOfWeek.length} раз в неделю >`
            : `Каждый день >`}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-800 text-white">
              Регулярность
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                defaultValue={tempRegularity}
                onValueChange={handleChangeRegularity}>
                <RadioGroupItem
                  value="everyday"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-800 p-[10px]">
                  Каждый день
                </RadioGroupItem>
                <RadioGroupItem
                  value="fewTimesAWeek"
                  className="max-h-[40px] w-[90vw] rounded-t-none bg-gray-800 p-[10px]">
                  Несколько раз в неделю
                </RadioGroupItem>
              </RadioGroup>
              {tempRegularity === "fewTimesAWeek" && (
                <div className="mt-2 flex flex-col items-start text-start">
                  {[
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                    "Воскресенье",
                  ].map((dayName, index) => {
                    const day = index === 6 ? 0 : index + 1;
                    return (
                      <div
                        key={day}
                        className="flex h-[40px] w-[90vw] items-center border-b-2 border-gray-600 bg-gray-800 p-[10px] text-sm font-medium">
                        <div
                          className={cn(
                            "text-gray-300",
                            tempDaysOfWeek.includes(day) && "text-yellow-500"
                          )}
                          onClick={() => handleToggleDay(day, dayName)}>
                          {dayName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {tempDaysOfWeek.length > 0 && tempDaysOfWeek.length <= 6 && (
                <div className="mt-3 w-[90vw] text-wrap text-start text-sm font-light">
                  Задание будет повторяться в следующие <br /> дни:
                  {tempOutputDays.join(", ").toLocaleLowerCase("ru")}
                </div>
              )}
            </div>
            <div
              className="flex items-center justify-center pl-0 "
              onClick={handleSaveChanges}>
              <div className="fixed bottom-7 flex h-[47px] w-[95vw] font-druk text-xs items-center justify-center rounded-lg bg-yellow-300 p-5">
                <span
                  className={`${
                    tempDaysOfWeek.length === 0 &&
                    tempRegularity !== "everyday" &&
                    "text-gray-500"
                  }`}>
                  ГОТОВО
                </span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
