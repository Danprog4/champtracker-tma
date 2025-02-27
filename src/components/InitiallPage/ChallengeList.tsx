import { Challenge } from "@/types";
import { ChallengeCard } from "./ChallengeCard/ChallengeCard";
import dayjs from "dayjs";
import { expiredChallenges, isPremium } from "@/lib/challengeUtills";
import { useUser } from "@/hooks/useUser";

type ChallengeListProps = {
  challenges: Challenge[];
};

const ChallengeList = ({ challenges }: ChallengeListProps) => {
  const { user } = useUser();

  const sortedChallenges = challenges.sort((a, b) => {
    return dayjs(a.createdAt).diff(dayjs(b.createdAt));
  });

  const expiredChallengesArray = expiredChallenges(sortedChallenges)?.map(
    (challenge) => ({
      ...challenge,
      isExpired: true,
    })
  );

  const nonExpiredChallenges = sortedChallenges
    .filter(
      (challenge) =>
        !expiredChallengesArray?.some((exp) => exp.id === challenge.id)
    )
    .map((challenge) => ({
      ...challenge,
      isExpired: false,
    }));

  return (
    <div className="mt-28 flex flex-col items-center justify-center gap-2 pb-28">
      {nonExpiredChallenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          isPremium={isPremium(user)}
          challenge={challenge}
          isExpired={challenge.isExpired}
          isLastNonExpired={index + 1 === nonExpiredChallenges.length}
          index={index}
        />
      ))}
      {expiredChallengesArray?.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          isPremium={isPremium(user)}
          challenge={challenge}
          isLastExpired={index + 1 === expiredChallengesArray.length}
          isExpired={challenge.isExpired}
          index={index}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
