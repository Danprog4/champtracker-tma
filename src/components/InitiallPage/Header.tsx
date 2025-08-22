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
import { MyProfile } from "@/icons/MyProfile";

const Header = () => {
  const { user } = useUser();
  const isMobile = useIsMobile();

  return (
    <header
      data-mobile={isMobile}
      className={`w-full h-16 fixed top-0  bg-black flex justify-between items-center data-[mobile=true]:pt-28 px-2 `}>
      <Link to={"/profile"} className="flex flex-col items-center group">
        <div className="text-white bg-transparent rounded-full aspect-square h-10 flex items-center justify-center border border-transparent">
          <span className="text-white  transition-colors duration-200">
            <MyProfile />
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-2 px-4 text-black font-druk text-md">
        <TokenIcon />
        <span className="font-medium">{user?.tokens || 0}</span>
      </div>

      <Link to={"/new"} className="flex flex-col items-center group">
        <button className="text-white bg-transparent rounded-full aspect-square h-10 flex items-center justify-center border border-transparent">
          <span className="text-white  transition-colors duration-200">
            <PlusIcon className="h-6 w-6" />
          </span>
        </button>
      </Link>
    </header>
  );
};

export default Header;
