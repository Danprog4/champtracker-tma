import Challenge from "./pages/Challenge/ChallengeView";
import Challenges from "./pages/ChallengesPage/ChallengePageView";
import CreateSmart from "./pages/CreatePage./CreatPage";
import InitiallPageView from "./pages/InitiallPage/InitiallPageView";


export const Paths = [
    { path: '/', element: InitiallPageView },
    { path: '/new', element: Challenges },
    { path: "/card/:id", element: Challenge },
    { path: "/card/:id/create", element: CreateSmart },
    { path: "/card/create", element: CreateSmart },
]