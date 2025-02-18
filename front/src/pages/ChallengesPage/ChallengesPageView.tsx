import Slider from "@/components/ChallengesPage/Slider/Slider";
import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CreateTaskButton } from "../../components/ui/TaskButton";
import { useChallenges } from "@/hooks/useChallenges";
import { useOnBoarding } from "@/hooks/useOnBoarding";
import { BackIcon } from "@/icons/Back";

const Challenges: React.FC = () => {
  const { challenges } = useChallenges();
  const { isOnBoarding } = useOnBoarding();
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-start">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-black h-[11vh] p-3 pt-14 top-0">
        <button
          onClick={() => {
            if (!isOnBoarding) {
              navigate({ to: "/welcome" });
            }
            if (isOnBoarding && challenges.length === 0) {
              navigate({ to: "/initiall" });
            }
            if (isOnBoarding && challenges.length > 0) {
              navigate({ to: "/" });
            }
          }}>
          <BackIcon />
        </button>
      </div>

      <div className="mt-[106px] flex flex-col px-3">
        <h1 className="mb-2 text-2xl font-extrabold font-druk ">
          НОВОЕ ЗАДАНИЕ
        </h1>
        <p className="mb-12 text-start text-sm text-gray-400">
          Выберите одно из 10 готовых заданий <br /> или создайте свое
        </p>
      </div>

      <Slider />

      <Link
        to="/card/create"
        className="flex w-full items-center justify-center pl-0 font-extrabold">
        <CreateTaskButton />
      </Link>
    </div>
  );
};

export default Challenges;
