import ChallengeList from "@/components/InitiallPage/ChallengeList";
import EmptyState from "@/components/InitiallPage/EmpyState";
import Header from "@/components/InitiallPage/Header";
import { useChallenges } from "@/hooks/useChallenges";

const InitiallPageView = () => {
  const { challenges, isChallengesLoading } = useChallenges();
  console.log(challenges);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      {isChallengesLoading && "Loading..."}
      {!challenges?.length ? (
        <EmptyState />
      ) : (
        <ChallengeList challenges={challenges} />
      )}
    </div>
  );
};

export default InitiallPageView;
