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
        <Drawer.Content className="fixed bottom-0 h-fit left-0 pt-4 right-0 mt-24 flex flex-col rounded-t-[10px]">
          <div className="flex-1 rounded-t-[10px] bg-zinc-900 p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-600" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className=" text-3xl font-medium text-white flex flex-col">
                <span>Ваш премиум</span>
                <span className="text-sm mb-6">
                  Действует до {formattedPremiumUntil}
                </span>
              </Drawer.Title>
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Без ограничений
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Создавай и участвуй в любом количестве вызовов
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Подробные статистики
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Получай подробные отчеты о своем прогрессе и достижениях
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Приоритетная поддержка
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Получай быстрые ответы от нашей поддержки
                  </p>
                </div>
                <Button
                  className="w-full h-10 rounded-lg bg-gradient-to-r from-yellow-600 to-red-900 text-lg font-medium text-white flex items-center justify-center"
                  onClick={() => setIsOpen(false)}>
                  <span>Закрыть</span>
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
