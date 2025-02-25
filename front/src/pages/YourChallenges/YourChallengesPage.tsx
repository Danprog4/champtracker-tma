import { BuyPremium } from "@/components/BuyPremium";
import ChallengeList from "@/components/InitiallPage/ChallengeList";
import Header from "@/components/InitiallPage/Header";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { Button } from "@/components/ui/button";
import { PremiumFeatures } from "@/components/ui/PremiumFeatures";
import { useChallenges } from "@/hooks/useChallenges";
import { Navbar } from "./Navbar";
import { Modal } from "@/components/Modal";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
import dayjs from "dayjs";
import { isDateUpdate } from "@/lib/dateUtils";

const YourChallengesPage = () => {
  const { challenges } = useChallenges();
  const { user } = useUser();

  console.log(
    dayjs(user.lastActiveDate)
      .startOf("day")
      .isBefore(dayjs().startOf("day")) &&
      !dayjs(user.lastActiveDate).isSame(dayjs().startOf("day")),
    "user.lastActiveDate"
  );

  console.log(isDateUpdate(user.lastActiveDate), "isDateUpdate");

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Modal />
      <ChallengeList challenges={challenges} />
      {!isPremium(user) ? (
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
