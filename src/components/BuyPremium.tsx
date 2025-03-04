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
import { toast } from "sonner";

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
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0  left-0 pt right-0  flex flex-col rounded-t-[10px] pb-7 ">
          <div className="flex-1 rounded-t-[10px] bg-neutral-900 pl-4 pr-4 pt-2">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-600" />
            <div className="mx-auto ">
              <Drawer.Title className="mb-6 font-druk text-2xl text-white">
                Купить премиум
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
                    Получай токены за пройденные дни и продлевай за них свой
                    премиум
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Подробная статистика (в разработке)
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Получай подробные отчеты о своем прогрессе и достижениях
                  </p>
                </div>

                <div className="flex items-center font-normal gap-2 text-white rounded-lg p-2 mb-16 bg-neutral-800">
                  <Switch
                    checked={isForTokens}
                    onCheckedChange={() => setIsForTokens(!isForTokens)}
                  />
                  <span>Купить за токены</span>
                </div>
                {!isForTokens ? (
                  <Button
                    onClick={() => {
                      handleBuyPremium(() => setIsOpen(false));
                    }}
                    disabled={isBuyingPending}
                    className="w-full shadow-xl font-normal shadow-black z-20 flex h-[45px] font-druk text-sm items-center justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 p-5">
                    {isBuyingPending ? (
                      <span>Покупка...</span>
                    ) : (
                      <div className="flex justify-center items-center gap-1">
                        <span>Купить за 49</span> <TelegramStar />
                      </div>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (user.tokens < 300) {
                        toast.error("У вас недостаточно токенов");
                      } else {
                        updatePremium(dayjs().add(1, "month").toISOString());
                        setIsOpen(false); // Close drawer on success
                      }
                    }}
                    disabled={isUpdatingPremium}
                    className="w-full shadow-xl shadow-black font-normal z-20 flex h-[45px] font-druk text-sm items-center justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500">
                    {isBuyingPending ? (
                      <span>Покупка...</span>
                    ) : (
                      <span>Купить за 300 токенов</span>
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
