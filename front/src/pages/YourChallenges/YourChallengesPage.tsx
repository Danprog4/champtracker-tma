import { BuyPremium } from "@/components/BuyPremium";
import ChallengeList from "@/components/InitiallPage/ChallengeList";
import Header from "@/components/InitiallPage/Header";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { Button } from "@/components/ui/button";
import { useChallenges } from "@/hooks/useChallenges";
import { usePremium } from "@/hooks/usePremium";

const YourChallengesPage = () => {
  const { challenges } = useChallenges();
  const { isPremium } = usePremium();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ChallengeList challenges={challenges} />
      {!isPremium ? (
        <BuyPremium>
          <Button
            variant="ghost"
            className="fixed left-4 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
            <TelegramStar />
            <span>Премиум</span>
          </Button>
        </BuyPremium>
      ) : (
        <div className="fixed flex flex-nowrap left-4 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
          У вас есть премиум! <TelegramStar className="translate-y-0.5" />
        </div>
      )}
    </div>
  );
};

export default YourChallengesPage;
