import { Challenge } from "@back-types";
import ChallengeCard from "./ChallengeCard";
import dayjs from "dayjs";

type ChallengeListProps = {
  challenges: Challenge[];
};

const ChallengeList = ({ challenges }: ChallengeListProps) => {
  const sortedChallenges = challenges.sort((a, b) => {
    return dayjs(a.createdAt).diff(dayjs(b.createdAt));
  });

  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-2">
      {sortedChallenges.map((challenge, index) => (
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
