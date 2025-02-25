import { BuyPremium } from "@/components/BuyPremium";
import ChallengeList from "@/components/InitiallPage/ChallengeList";
import Header from "@/components/InitiallPage/Header";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { Button } from "@/components/ui/button";
import { PremiumFeatures } from "@/components/ui/PremiumFeatures";
import { useChallenges } from "@/hooks/useChallenges";
import { usePremium } from "@/hooks/usePremium";
import { Navbar } from "./Navbar";
import { Modal } from "@/components/Modal";

const YourChallengesPage = () => {
  const { challenges } = useChallenges();
  const { isPremium } = usePremium();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Modal />
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
        <PremiumFeatures>
          <div className="fixed flex flex-nowrap left-3 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
            У вас есть премиум!
          </div>
        </PremiumFeatures>
      )}
      <Navbar />
    </div>
  );
};

export default YourChallengesPage;
