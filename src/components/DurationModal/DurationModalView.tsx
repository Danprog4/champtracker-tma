import React from "react";
import { Drawer } from "vaul";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { NumericInput } from "@/components/ui/input";

export interface DurProps {
  duration: number;
  setDuration: (value: number) => void;
  id?: string;
  regularity: "everyday" | "fewTimesAWeek";
  isCustomDuration: boolean;
  setIsCustomDuration: (value: boolean) => void;
  inputDuration: string;
  setInputDuration: (value: string) => void;
  tempDuration: number;
  setTempDuration: (value: number) => void;
  isLong: boolean;
  setIsLong: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  presetDurations: number[];
  handleDurationChange: (value: string) => void;
  handleSave: () => void;
  handleClose: () => void;
  isButtonDisabled: () => boolean;
  handleRadioChange: (value: string) => void;
  isEveryday: boolean;
}

const DurationModalView: React.FC<DurProps> = ({
  duration,
  isCustomDuration,
  inputDuration,
  tempDuration,
  isLong,
  isOpen,
  setIsOpen,
  presetDurations,
  handleDurationChange,
  handleSave,
  handleClose,
  isButtonDisabled,
  handleRadioChange,
  isEveryday,
}) => {
  return (
    <Drawer.Root onClose={handleSave} onOpenChange={setIsOpen} open={isOpen}>
      <Drawer.Trigger className="mt-2 flex w-[94vw] h-[45px] items-center justify-between rounded-md bg-gray-800 p-[10px]">
        <span>Длительность</span>
        <span className="text-gray-400">{`${Math.floor(
          Number(inputDuration) || duration / (isEveryday ? 1 : 7)
        )} ${isEveryday ? "дней" : "недель"} >`}</span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-800 text-white">
              Длительность
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                value={isCustomDuration ? "Own duration" : String(tempDuration)}
                onValueChange={handleRadioChange}>
                {presetDurations.map((dur, index) => (
                  <RadioGroupItem
                    key={index}
                    value={String(dur)}
                    className={cn(
                      "border-b-1 max-h-[40px] w-[90vw] rounded-b-none border border-gray-600 bg-gray-800 p-[10px]",
                      index + 1 === presetDurations.length &&
                        "border-b-none rounded-b-none rounded-t-none",
                      index !== 0 &&
                        index + 1 !== presetDurations.length &&
                        "rounded-none"
                    )}>
                    {isEveryday ? `${dur} дней` : `${dur / 7} недель`}
                  </RadioGroupItem>
                ))}
                <RadioGroupItem
                  value="Own duration"
                  className="max-h-[40px] w-[90vw] rounded-t-none border border-gray-600 bg-gray-800 p-[10px]">
                  Своя длительность
                </RadioGroupItem>
              </RadioGroup>

              {isCustomDuration && (
                <div
                  className={cn(
                    "mt-2 flex w-[90vw] flex-col items-start justify-center rounded-md border-2 border-gray-600 bg-gray-800 text-start text-sm font-medium text-white",
                    isLong ? "h-[60px]" : "h-[40px]"
                  )}>
                  <NumericInput
                    amountValue={inputDuration}
                    onAmountChange={handleDurationChange}
                    unit={isEveryday ? "дн." : "нед."}
                    placeholder="Длительность"
                  />
                  {isLong && (
                    <div className="pl-2 text-sm text-red-600">
                      {isEveryday ? "Максимум 300 дней" : "Максимум 40 недель"}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center pl-0 ">
              <button
                className="fixed bottom-7 flex h-[47px] w-[95vw] font-druk text-xs items-center justify-center rounded-lg bg-yellow-300 p-5"
                onClick={handleSave}>
                <span
                  className={
                    isButtonDisabled() ? "text-gray-500" : "text-black"
                  }>
                  ГОТОВО
                </span>
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DurationModalView;
