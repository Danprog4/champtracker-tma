import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
// const App = lazy(() => import("./App"));
// const YourChallengesPage = lazy(
//   () => import("./pages/YourChallenges/YourChallengesPage")
// );
// const Challenges = lazy(
//   () => import("./pages/ChallengesPage/ChallengesPageView")
// );
// const Challenge = lazy(() => import("./pages/Challenge/ChallengeView"));
// const CreateSmart = lazy(() => import("./pages/CreatePage./CreatPage"));
// const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
// const HintsAndTipsPage = lazy(() => import("./pages/HintsPage/HintsPage"));
// const ChallengeInfo = lazy(() => import("./pages/ChallengeInfo/ChallengeInfo"));
// const UpdatePageContainer = lazy(() => import("./pages/UpdatePage/UpdatePage"));
// const InitiallPage = lazy(() => import("./pages/InitiallPage/InitiallPage"));
import App from "./App";
import InitiallPage from "./pages/InitiallPage/InitiallPage";
import Challenges from "./pages/ChallengesPage/ChallengesPageView";
import Challenge from "./pages/Challenge/ChallengeView";
import CreateSmart from "./pages/CreatePage/CreatPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import HintsAndTipsPage from "./pages/HintsPage/HintsPage";
import ChallengeInfo from "./pages/ChallengeInfo/ChallengeInfo";
import UpdatePageContainer from "./pages/UpdatePage/UpdatePage";
import { CarouselDApiDemo } from "./pages/CarouselPage/CarouselPage";
import { useOnBoarding } from "./hooks/useOnBoarding";
import { getUserOnBoarding } from "./api/challenge";
import { useChallenges } from "./hooks/useChallenges";
import { lazy, useEffect } from "react";
import YourChallengesPage from "./pages/YourChallenges/YourChallengesPage";

const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r ">
      <div className="mb-4 text-3xl font-bold ">Page not found</div>
      <Link
        to="/"
        className="rounded-lg bg-white px-6 py-2 font-medium text-gray-800 shadow-md transition-all hover:bg-gray-100 hover:shadow-lg">
        Go to home
      </Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const { isOnBoarding } = useOnBoarding();
    const navigate = useNavigate();
    const { challenges } = useChallenges();

    // Redirect to '/welcome' if onBoarding is false
    useEffect(() => {
      if (isOnBoarding === false) {
        navigate({ to: "/welcome" });
      }
    }, [isOnBoarding, navigate]);

    // Show YourChallengesPage if there are challenges, otherwise show InitiallPage
    if (challenges.length > 0) {
      return <YourChallengesPage />;
    }

    return <InitiallPage />;
  },
});

const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "new",
  component: Challenges,
});

const cardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "card/$id",
  component: Challenge,
});

const cardCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "card/create",
  component: CreateSmart,
});

const cardIdCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "card/$id/create",
  component: CreateSmart,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: AboutPage,
});

const hintsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "hints",
  component: HintsAndTipsPage,
});

const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "challenge/$taskId",
  component: ChallengeInfo,
});

const updateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "update/$taskId",
  component: UpdatePageContainer,
  errorComponent: (error) => {
    return <Navigate to="/" />;
  },
});

const carouselPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome",
  component: () => {
    const { isOnBoarding } = useOnBoarding();
    const navigate = useNavigate();

    useEffect(() => {
      if (isOnBoarding === true) {
        navigate({ to: "/" });
      }
    }, [isOnBoarding, navigate]);

    return <CarouselDApiDemo />;
  },
});

// Build the route tree by adding children on the root route
const routeTree = rootRoute.addChildren([
  indexRoute,
  newRoute,
  cardRoute,
  cardCreateRoute,
  cardIdCreateRoute,
  aboutRoute,
  hintsRoute,
  challengeRoute,
  updateRoute,
  carouselPage,
]);

// Create the router
export const router = createRouter({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
