import { Link } from "@tanstack/react-router";
import { BarsIcon } from "@/icons/Bars";
import PremiumFeatures from "../ui/PremiumFeatures";
import TokenIcon from "@/icons/TokenIcon";
import { useTokens } from "@/hooks/useTokens";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="fixed z-10 flex w-full justify-between h-[11vh] bg-black p-3 pt-14">
      <Link to="/about">
        <BarsIcon />
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex font-druk text-sm items-center gap-2 text-black rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 py-1 px-2 font-medium hover:opacity-90">
          <PremiumFeatures>
            <div className="flex items-center gap-1">
              <span>{user.tokens}</span>
              <TokenIcon />
            </div>
          </PremiumFeatures>
        </div>
      </div>
    </div>
  );
};

export default Header;
