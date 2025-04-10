import EmptyState from "@/components/InitiallPage/EmpyState";
import Header from "@/components/InitiallPage/Header";
import { CarouselDApiDemo } from "../CarouselPage/CarouselPage";
import { useUser } from "@/hooks/useUser";

const InitiallPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <EmptyState />
    </div>
  );
};

export default InitiallPage;
