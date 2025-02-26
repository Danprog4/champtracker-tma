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

const Header = () => {
  const { user } = useUser();

  return (
    <div className="fixed z-10 flex w-full justify-between h-[12vh] bg-black p-3 pt-14">
      <Link to="/about">
        <BarsIcon />
      </Link>
      <div className="flex items-center gap-2">
        {isPremium(user) ? (
          <PremiumFeatures>
            <div className="flex text-sm items-center gap-2 -translate-y-1.5 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-1 px-2 font-medium hover:opacity-90">
              <div className="flex items-center gap-1 font-druk">
                <span>{user.tokens}</span>
                <TokenIcon />
              </div>
            </div>
          </PremiumFeatures>
        ) : (
          <BuyPremium>
            <div className="flex text-sm  -translate-y-2 items-center gap-2 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-2 px-4 font-medium hover:opacity-90">
              <div className="flex items-center gap-1 font-druk text-[10px]">
                <span>ПРЕМИУМ</span>
                <TelegramStar />
              </div>
            </div>
          </BuyPremium>
        )}
      </div>
    </div>
  );
};

export default Header;
