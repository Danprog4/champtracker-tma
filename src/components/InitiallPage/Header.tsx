import { Link } from "@tanstack/react-router";
import { BarsIcon } from "@/icons/Bars";
import PremiumFeatures from "../ui/PremiumFeatures";
import TokenIcon from "@/icons/TokenIcon";
import { useTokens } from "@/hooks/useTokens";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
import { BuyPremium } from "../BuyPremium";
import { Button } from "../ui/button";
import { TelegramStar } from "../shared/TelegramStar";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useIsMobile } from "@/hooks/usePlatform";

const Header = () => {
  const { user } = useUser();
  const isMobile = useIsMobile();

  return (
    <div
      data-mobile={isMobile}
      className="fixed z-10 flex w-full justify-end items-center bg-black p-3 h-[fit] data-[mobile=true]:pt-[92px] pb-3">
      <div className="flex items-center gap-2">
        {isPremium(user) ? (
          <PremiumFeatures>
            <div className="flex text-sm items-center gap-2 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-2 px-2  hover:opacity-90">
              <div className="flex items-center gap-1 font-druk">
                <span>{user.tokens}</span>
                <TokenIcon />
              </div>
            </div>
          </PremiumFeatures>
        ) : (
          <div className="flex items-center gap-2">
            <BuyPremium>
              <div className="flex text-sm items-center gap-2 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-2 px-4 hover:opacity-90">
                <div className="flex items-center gap-1 font-druk text-[10px]">
                  <span>ПРЕМИУМ</span>
                  <TelegramStar />
                </div>
              </div>
            </BuyPremium>
            <div className="flex text-sm items-center gap-2 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-2 px-2">
              <div className="flex items-center gap-1 font-druk">
                <span>{user.tokens}</span>
                <TokenIcon />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
