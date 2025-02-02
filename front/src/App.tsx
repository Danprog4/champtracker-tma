import { Challenge } from '@back-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewChallenge, getChallenges } from './api/challenge';

function App() {
  const queryClient = useQueryClient();

  const { data: challenges } = useQuery<Challenge[]>({
    queryKey: ['challenges'],
    queryFn: getChallenges,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createNewChallenge,
    onSuccess: (data) => {
      queryClient.setQueryData(['challenges'], (old: Challenge[]) => {
        return [...old, data];
      });
    },
  });

  if (!challenges) {
    return 'loading...';
  }

  const handleCreateChallenge = () => {
    mutate({
      title: 'Test Challenge',
      duration: 30,
      color: '#FF0000',
      regularity: 'everyday',
      daysOfWeek: null,
      taskDates: [],
      challengeStartAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {!challenges.length && 'no challenges yet, create new '}
        {challenges?.map((ch) => {
          return <ChallengeView challenge={ch} />;
        })}
      </div>

      {isPending && 'loading...'}

      <button
        onClick={handleCreateChallenge}
        className="bg-amber-300 text-black p-2 rounded"
      >
        Create new challenge
      </button>
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
    regularity: 'everyday' | 'fewTimesAWeek';
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
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <h3>{challenge.title}</h3>
      <div>Duration: {challenge.duration} days</div>
      <div>Regularity: {challenge.regularity}</div>
      {challenge.daysOfWeek && (
        <div>Days of week: {challenge.daysOfWeek.join(', ')}</div>
      )}
      <div>Created: {new Date(challenge.createdAt).toLocaleDateString()}</div>
      <div>
        Progress: {challenge.userCheckedDates?.length || 0} /{' '}
        {challenge.taskDates.length} days completed
      </div>
    </div>
  );
};
