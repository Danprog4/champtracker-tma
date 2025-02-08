import AboutPage from "./pages/AboutPage/AboutPage";
import Challenge from "./pages/Challenge/ChallengeView";
import ChallengeInfo from "./pages/ChallengeInfo/ChallengeInfo";
import Challenges from "./pages/ChallengesPage/ChallengesPageView";
import CreateSmart from "./pages/CreatePage./CreatPage";
import HintsAndTipsPage from "./pages/HintsPage/HintsPage";
import InitiallPageView from "./pages/InitiallPage/InitiallPageView";


export const Paths = [
    { path: '/', element: InitiallPageView },
    { path: '/new', element: Challenges },
    { path: "/card/:id", element: Challenge },
    { path: "/card/:id/create", element: CreateSmart },
    { path: "/card/create", element: CreateSmart },
    { path: "/about", element: AboutPage },
    { path: "/hints", element: HintsAndTipsPage },
     { path: "/challenge/:taskId", element: ChallengeInfo },

]