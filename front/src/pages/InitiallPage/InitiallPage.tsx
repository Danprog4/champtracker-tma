import EmptyState from "@/components/InitiallPage/EmpyState";
import Header from "@/components/InitiallPage/Header";

const InitiallPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <EmptyState />
    </div>
  );
};

export default InitiallPage;
