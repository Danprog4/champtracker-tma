import { Route, Routes } from "react-router";
import { useChallenges } from "./hooks/useChallenges";
import { Paths } from "./Paths";

function App() {
  const {
    challenges,
    createChallenge,
    isChallengesLoading,
    isCreateChallengePending,
  } = useChallenges();

  if (isChallengesLoading || !challenges) {
    return "loading...";
  }

  const handleCreateChallenge = () => {
    createChallenge({
      title: "Test Challenge",
      duration: 30,
      color: "#FF0000",
      regularity: "everyday",
      daysOfWeek: null,
      taskDates: [],
      challengeStartAt: new Date().toISOString(),
    });
  };

  return (
    <div className="relative h-screen overflow-y-scroll rounded-lg bg-black text-white shadow-lg">
      {/* <div>
        <div className="flex flex-col gap-2">
          {!challenges.length && "no challenges yet, create new "}
          {challenges?.map((ch) => {
            return <ChallengeView challenge={ch} />;
          })}
        </div>

        <button
          onClick={handleCreateChallenge}
          className="bg-amber-300 text-black p-2 rounded"
        >
          {isCreateChallengePending ? "loading..." : "Create new challenge"}
        </button>
      </div> */}

      <Routes>
        {Paths.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;

type ChallengeProps = {
  challenge: {
    id: number;
    userId: number;
    title: string;
    duration: number;
    color: string;
    createdAt: string;
    regularity: "everyday" | "fewTimesAWeek";
    daysOfWeek: number[] | null;
    taskDates: string[];
    userCheckedDates: string[] | null;
  };
};

const ChallengeView = ({ challenge }: ChallengeProps) => {
  return (
    <div
      style={{
        border: `2px solid ${challenge.color}`,
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <h3>{challenge.title}</h3>
      <div>Duration: {challenge.duration} days</div>
      <div>Regularity: {challenge.regularity}</div>
      {challenge.daysOfWeek && (
        <div>Days of week: {challenge.daysOfWeek.join(", ")}</div>
      )}
      <div>Created: {new Date(challenge.createdAt).toLocaleDateString()}</div>
      <div>
        Progress: {challenge.userCheckedDates?.length || 0} /{" "}
        {challenge.taskDates.length} days completed
      </div>
    </div>
  );
};
