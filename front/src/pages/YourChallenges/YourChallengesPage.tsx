import { BuyPremium } from "@/components/BuyPremium";
import ChallengeList from "@/components/InitiallPage/ChallengeList";
import EmptyState from "@/components/InitiallPage/EmpyState";
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
            <span>Premium</span>
          </Button>
        </BuyPremium>
      ) : (
        <div className="fixed left-4 bottom-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 font-medium">
          You have Premium! 🌟
        </div>
      )}
    </div>
  );
};

export default YourChallengesPage;
