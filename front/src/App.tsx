import { Suspense } from 'react';
import { Route, Routes, useRouteError } from 'react-router';
import { Toaster } from 'sonner';
import AboutPage from './pages/AboutPage/AboutPage';
import Challenge from './pages/Challenge/ChallengeView';
import ChallengeInfo from './pages/ChallengeInfo/ChallengeInfo';
import Challenges from './pages/ChallengesPage/ChallengesPageView';
import CreateSmart from './pages/CreatePage./CreatPage';
import HintsAndTipsPage from './pages/HintsPage/HintsPage';
import InitiallPageView from './pages/InitiallPage/InitiallPageView';
import UpdatePageContainer from './pages/UpdatePage/UpdatePage';
import { FullPageSpinner } from './components/shared/FullPageSpinner';

const paths = [
  { path: '/', element: InitiallPageView },
  { path: '/new', element: Challenges },
  { path: '/card/:id', element: Challenge },
  { path: '/card/:id/create', element: CreateSmart },
  { path: '/card/create', element: CreateSmart },
  { path: '/about', element: AboutPage },
  { path: '/hints', element: HintsAndTipsPage },
  { path: '/challenge/:taskId', element: ChallengeInfo },
  { path: '/update/:taskId', element: UpdatePageContainer },
];

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>Dang!</div>;
}

function App() {
  return (
    <div className="relative h-screen overflow-y-scroll rounded-lg bg-black text-white shadow-lg">
      <Routes>
        {paths.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              errorElement={<ErrorBoundary />}
              ErrorBoundary={() => <ErrorBoundary />}
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <route.element />
                </Suspense>
              }
            ></Route>
          );
        })}
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
