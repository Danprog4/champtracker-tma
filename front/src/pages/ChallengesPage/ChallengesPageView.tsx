import Slider from "@/components/ChallengesPage/Slider/Slider";
import React from "react";
import { Link } from "@tanstack/react-router";
import BackImg from "../../assets/images/back-svgrepo-com (2).svg";
import { usePremium } from "@/hooks/usePremium";
import { BuyPremium } from "@/components/BuyPremium";
import { CreateTaskButton } from "./TaskButton";

const Challenges: React.FC = () => {
  const { isPremium } = usePremium();

  return (
    <div className="relative flex flex-col items-start">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-black pb-2 pl-[16px] pr-5 pt-10">
        <Link to="/">
          <img
            src={BackImg}
            className="h-[30px] w-[30px] object-contain"
            alt="Back"
          />
        </Link>
      </div>

      <div className="mt-20 flex flex-col px-5">
        <h1 className="mb-3 mt-2 text-4xl font-extrabold">НОВОЕ ЗАДАНИЕ</h1>
        <p className="mb-8 text-start text-sm text-gray-400">
          Выбери одно из десяти заданий <br /> или создай свое
        </p>
      </div>

      <Slider />

      {isPremium ? (
        <Link
          to="/card/create"
          className="flex w-full items-center justify-center pl-0 font-extrabold"
        >
          <CreateTaskButton />
        </Link>
      ) : (
        <BuyPremium>
          <div className="flex w-full items-center justify-center pl-0 font-extrabold z-0">
            <CreateTaskButton />
          </div>
        </BuyPremium>
      )}
    </div>
  );
};

export default Challenges;
