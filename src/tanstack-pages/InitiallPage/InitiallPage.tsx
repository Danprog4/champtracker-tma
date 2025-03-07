import EmptyState from "@/components/InitiallPage/EmpyState";
import Header from "@/components/InitiallPage/Header";
import { CarouselDApiDemo } from "../CarouselPage/CarouselPage";
import { useUser } from "@/hooks/useUser";

const InitiallPage = () => {
  const { user } = useUser();
  const isOnboarding = user.onBoarding;
  console.log(isOnboarding === false, "trueornot");
  return (
    <div className="flex h-screen flex-col">
      {isOnboarding === false ? (
        <CarouselDApiDemo />
      ) : (
        <>
          <Header />
          <EmptyState />
        </>
      )}
    </div>
  );
};

export default InitiallPage;
