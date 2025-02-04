import { Challenge } from "@back-types";
import ChallengeCard from "./ChallengeCard";

type ChallengeListProps = {
  challenges: Challenge[];
};

const ChallengeList = ({ challenges }: ChallengeListProps) => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-2">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isLast={index + 1 === challenges.length}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
