import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import { TelegramStar } from "./shared/TelegramStar";
import { usePremium } from "@/hooks/usePremium";
import { ReactNode } from "@tanstack/react-router";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { useTokens } from "@/hooks/useTokens";
import dayjs from "dayjs";
import { useUser } from "@/hooks/useUser";

interface BuyPremiumProps {
  children: ReactNode;
}

export const BuyPremium: React.FC<BuyPremiumProps> = ({ children }) => {
  const {
    handleBuyPremium,
    isBuyingPending,
    updatePremium,
    isUpdatingPremium,
  } = usePremium();

  const [isForTokens, setIsForTokens] = useState(false);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 h-fit left-0 pt-4 right-0 mt-24 flex flex-col rounded-t-[10px]">
          <div className="flex-1 rounded-t-[10px] bg-zinc-900 p-4 pb-7">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-600" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-6 text-3xl font-medium text-white">
                Купить премиум
              </Drawer.Title>
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Без ограничений
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Создавай и выполняй любое количество заданий
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Подробная статистика (в разработке)
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Получай подробные отчеты о своем прогрессе и достижениях
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Токены за задания (в разработке)
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Получай токены за пройденные дни и обменивай их на премиум
                  </p>
                </div>

                <div className="flex items-center gap-2 text-white w-[94vw] bg-zinc-800 rounded-lg p-2">
                  <Switch
                    checked={isForTokens}
                    onCheckedChange={() => setIsForTokens(!isForTokens)}
                  />
                  <span>Купить за токены</span>
                </div>
                {!isForTokens ? (
                  <Button
                    onClick={handleBuyPremium}
                    disabled={isBuyingPending}
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 py-6 text-lg font-medium text-white hover:opacity-90">
                    {isBuyingPending ? (
                      <span>Покупка...</span>
                    ) : (
                      <div className="flex justify-center items-center gap-1">
                        <span>Купить за 10</span> <TelegramStar />
                      </div>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      updatePremium(dayjs().add(1, "month").toISOString())
                    }
                    disabled={isUpdatingPremium}
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 py-6 text-lg font-medium text-white hover:opacity-90">
                    {isBuyingPending ? (
                      <span>Покупка...</span>
                    ) : (
                      <span>Купить за 300 токентов</span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
