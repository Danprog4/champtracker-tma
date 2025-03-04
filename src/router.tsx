import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
} from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import App from "./App";
import InitiallPage from "./tanstack-pages/InitiallPage/InitiallPage";
import Challenges from "./tanstack-pages/ChallengesPage/ChallengesPageView";
import Challenge from "./tanstack-pages/Challenge/ChallengeView";
import CreateSmart from "./tanstack-pages/CreatePage/CreatPage";
import AboutPage from "./tanstack-pages/AboutPage/AboutPage";
import HintsAndTipsPage from "./tanstack-pages/HintsPage/HintsPage";
import ChallengeInfo from "./tanstack-pages/ChallengeInfo/ChallengeInfo";
import UpdatePageContainer from "./tanstack-pages/UpdatePage/UpdatePage";
import { CarouselDApiDemo } from "./tanstack-pages/CarouselPage/CarouselPage";
import { useOnBoarding } from "./hooks/useOnBoarding";
import { useChallenges } from "./hooks/useChallenges";
import YourChallengesPage from "./tanstack-pages/YourChallenges/YourChallengesPage";
import { FullPageSpinner } from "./components/shared/FullPageSpinner";
import { ProfilePage } from "./tanstack-pages/ProfilePage/ProfilePage";
import { useAuthState } from "./hooks/useAuthState";
import Slider from "./components/ChallengesPage/Slider/Slider";
// Create a unified loading state component
export const UnifiedLoadingState = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 font-druk border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg">Загрузка...</p>
      </div>
    </div>
  );
};

const rootRoute = createRootRoute({
  component: App,
  pendingComponent: UnifiedLoadingState, // Use the unified loading component for all routes

  notFoundComponent: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r ">
      <div className="mb-4 text-3xl  font-druk text-center">
        Страница не найдена{" "}
      </div>
      <Link
        to="/"
        className="rounded-lg font-druk bg-white px-6 py-2 font-medium text-neutral-800 shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg">
        На главную
      </Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  pendingComponent: UnifiedLoadingState, // Use the same loading component
  component: () => {
    const { challenges } = useChallenges();
    const { isOnBoarding } = useOnBoarding();
    if (!isOnBoarding) {
      return <Navigate to="/welcome" />;
    }
    if (challenges.length === 0) {
      return <Navigate to="/initiall" />;
    }
    return <YourChallengesPage />;
  },
});

const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "new",
  pendingComponent: UnifiedLoadingState,
  component: Challenges,
});

const testSliderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "test-slider",
  component: Slider,
});

const initiallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "initiall",

  component: InitiallPage,
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
  errorComponent: () => {
    return <Navigate to="/" />;
  },
});

const carouselPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome",
  component: CarouselDApiDemo,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
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
  initiallRoute,
  profileRoute,
  testSliderRoute,
]);

// Create the router
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  scrollToTopSelectors: ["#main"],
});

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
