import Slider from "@/components/ChallengesPage/Slider/Slider";
import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CreateTaskButton } from "../../components/ui/TaskButton";
import { useChallenges } from "@/hooks/useChallenges";
import { useOnBoarding } from "@/hooks/useOnBoarding";
import { BackIcon } from "@/icons/Back";
import { isPremium } from "@/lib/challengeUtills";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { BuyPremium } from "@/components/BuyPremium";
import { categories } from "@/configs/cards.config";
const Challenges: React.FC = () => {
  const { challenges } = useChallenges();
  const { isOnBoarding } = useOnBoarding();
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-auto">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-black h-[8vh] items-center pl-3 top-0">
        <button></button>
      </div>
      <div className="mt-[72px] flex flex-col px-3">
        <h1 className="mb-2 text-2xl   font-druk ">НОВОЕ ЗАДАНИЕ</h1>
        <p className="mb-12 text-start text-sm text-neutral-400">
          Выберите одно из 10 готовых заданий <br /> или создайте свое
        </p>
      </div>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 pl-3">
          <div className="flex justify-between pr-3 items-start mb-3">
            <div className="">{category.title}</div>
            <div className="text-neutral-400 text-sm mt-1"></div>
          </div>
          <div
            className={`flex snap-x snap-mandatory space-x-4 overflow-auto overflow-y-hidden scroll-smooth gap-2 pb-4 w-screen `}>
            {category.items.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className={`relative flex-shrink-0 bg-cover ${category.color} h-[250px] w-[250px]`}
                style={{ transform: "t" }}>
                <div className=" text-outline font-druk absolute inset-x-0 top-0 p-3 text-start text-lg leading-7 text-black">
                  {card.title}
                </div>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="absolute bottom-0 right-0 w-[180px] h-[180px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-7 left-3 shadow-xl shadow-black  z-100 flex h-[45px] w-[94vw] items-center justify-between rounded-lg bg-yellow-400 p-5 text-black">
        <span className="text-[10px] text-black font-druk z-100">
          СОЗДАТЬ СВОЕ ЗАДАНИЕ
        </span>
      </div>
    </div>
  );
};

export default Challenges;
