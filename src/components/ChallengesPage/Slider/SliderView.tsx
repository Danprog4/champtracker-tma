import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { updateOnBoarding } from "@/api/challenge";
import Image from "next/image";
import { CreateTaskButton } from "@/components/ui/TaskButton";
import { BackIcon } from "@/icons/Back";
import { challenges } from "../../../../drizzle/schema";
import { useUser } from "@/hooks/useUser";
import { useOnBoarding } from "@/hooks/useOnBoarding";
import { useChallenges } from "@/hooks/useChallenges";

type Card = {
  id: number;
  imageUrl: string;
  title: string;
};

type Category = {
  title: string;
  color: string;
  items: Card[];
};

interface DumpSliderProps {
  categories: Category[];
  currentSlide: { [key: number]: number };
  onScroll: (categoryIndex: number) => void;
  sliderRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  currentSlide,
  onScroll,
  sliderRefs,
}) => {
  const { isOnBoarding } = useOnBoarding();
  const navigate = useNavigate();
  const { user } = useUser();
  const { challenges } = useChallenges();
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-auto">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-black h-[8vh] items-center pl-3 top-0">
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
              <Link
                key={cardIndex}
                to="/card/$id"
                params={{ id: String(card.id) }}
                className={`relative flex-shrink-0 bg-cover ${category.color} h-[250px] w-[250px]`}
                style={{ transform: "t" }}>
                <div className="z-50 text-outline font-druk absolute inset-x-0 top-0 p-3 text-start text-lg leading-7 text-black">
                  {card.title}
                </div>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="absolute bottom-0 right-0 w-[180px] h-[180px] object-cover rounded-lg"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}

      <Link
        to="/card/create"
        className="flex w-full items-center justify-center pl-0 z-50">
        <CreateTaskButton />
      </Link>
    </div>
  );
};

export default DumpSlider;
