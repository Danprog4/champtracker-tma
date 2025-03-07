import EmptyState from "@/components/InitiallPage/EmpyState";
import Header from "@/components/InitiallPage/Header";
import { CarouselDApiDemo } from "../CarouselPage/CarouselPage";
import { useUser } from "@/hooks/useUser";
import { Suspense } from "react";

const InitialPageContent = () => {
  const { user } = useUser();
  const isOnboarding = user.onBoarding;

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

const InitiallPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }>
      <InitialPageContent />
    </Suspense>
  );
};

export default InitiallPage;
