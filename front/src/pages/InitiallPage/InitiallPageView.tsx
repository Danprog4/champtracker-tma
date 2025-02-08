import { BuyPremium } from '@/components/BuyPremium';
import ChallengeList from '@/components/InitiallPage/ChallengeList';
import EmptyState from '@/components/InitiallPage/EmpyState';
import Header from '@/components/InitiallPage/Header';
import { useChallenges } from '@/hooks/useChallenges';
import { usePremium } from '@/hooks/usePremium';

const InitiallPageView = () => {
  const { challenges } = useChallenges();
  const { isPremium } = usePremium();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      {!challenges?.length ? (
        <EmptyState />
      ) : (
        <ChallengeList challenges={challenges} />
      )}

      {!isPremium ? (
        <BuyPremium />
      ) : (
        <div className="fixed left-4 bottom-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 font-medium">
          You have Premium! 🌟
        </div>
      )}
    </div>
  );
};

export default InitiallPageView;
