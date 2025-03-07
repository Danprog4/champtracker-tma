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
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 font-druk border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg">Загрузка...</p>
          </div>
        </div>
      }>
      <InitialPageContent />
    </Suspense>
  );
};

export default InitiallPage;
