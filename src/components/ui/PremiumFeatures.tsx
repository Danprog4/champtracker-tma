import { ReactNode } from "@tanstack/react-router";
import { Drawer } from "vaul";
import { Button } from "./button";
import { useState } from "react";
import { usePremium } from "@/hooks/usePremium";
import dayjs from "dayjs";

export const PremiumFeatures = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPremiumUntil } = usePremium();
  const formattedPremiumUntil = dayjs(isPremiumUntil).format("DD.MM.YYYY");

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0  left-0 pt right-0  flex flex-col rounded-t-[10px] pb-7 ">
          <div className="flex-1 rounded-t-[10px] bg-neutral-900 pl-4 pr-4 ">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-600" />
            <div className="mx-auto ">
              <Drawer.Title className=" text-white flex flex-col">
                <span className="font-druk text-2xl">Ваш премиум</span>
                <span className="text-sm mb-6">
                  Действует до {formattedPremiumUntil}
                </span>
              </Drawer.Title>
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Без ограничений
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Создавай и выполняй любое количество своих или готовых
                    заданий
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Токены за задания
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Получай токены за пройденные дни и обменивай их на премиум
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 p-4 ">
                  <h3 className="mb-2 font-medium text-white">
                    Подробная статистика (в разработке)
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Получай подробные отчеты о своем прогрессе и достижениях
                  </p>
                </div>

                <Button
                  className="w-full shadow-xl font-normal shadow-black z-20 flex h-[45px] font-druk text-xs items-center justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 "
                  onClick={() => setIsOpen(false)}>
                  <span>ЗАКРЫТЬ</span>
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default PremiumFeatures;
