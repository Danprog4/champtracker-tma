import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import { TelegramStar } from "./shared/TelegramStar";
import { usePremium } from "@/hooks/usePremium";
import { ReactNode } from "@tanstack/react-router";

interface BuyPremiumProps {
  children: ReactNode;
}

export const BuyPremium: React.FC<BuyPremiumProps> = ({ children }) => {
  const { handleBuyPremium, isBuyingPending } = usePremium();

  return (
    <Drawer.Root>
      {/* <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          className="fixed left-4 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90"
        >
          <TelegramStar />
          <span>Premium</span>
        </Button>
      </Drawer.Trigger> */}
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 h-fit left-0 pt-4 right-0 mt-24 flex flex-col rounded-t-[10px]">
          <div className="flex-1 rounded-t-[10px] bg-zinc-900 p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-600" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-6 text-3xl font-medium text-white">
                Upgrade to Premium
              </Drawer.Title>
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Unlimited Challenges
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Create and participate in as many challenges as you want
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Advanced Statistics
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Get detailed insights about your progress and achievements
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    Priority Support
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Get faster responses from our support team
                  </p>
                </div>
                <Button
                  onClick={handleBuyPremium}
                  disabled={isBuyingPending}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 py-6 text-lg font-medium text-white hover:opacity-90">
                  {isBuyingPending ? (
                    <span>Buying...</span>
                  ) : (
                    <div className="flex justify-center items-center gap-1">
                      <span>Upgrade for 10</span> <TelegramStar />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
