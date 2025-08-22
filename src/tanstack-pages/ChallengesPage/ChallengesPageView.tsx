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
import Image from "next/image";
import { useIsMobile } from "@/hooks/usePlatform";

const Challenges: React.FC = () => {
  const { challenges } = useChallenges();
  const { user } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-start  overflow-x-hidden pb-20 ">
      <div
        data-mobile={isMobile}
        className="fixed z-50 flex w-[100vw] justify-between bg-black h-[fit] data-[mobile=true]:pt-[100px] pt-4 pb-4 items-center pl-4 top-0">
        <button
          onClick={() => {
            if (challenges.length === 0) {
              navigate({ to: "/initiall" });
            }
            if (challenges.length > 0) {
              navigate({ to: "/" });
            }
          }}>
          <BackIcon />
        </button>
      </div>

      <div
        data-mobile={isMobile}
        className="data-[mobile=true]:pt-[105px] mt-16  flex flex-col px-3">
        <h1 className="mb-2 text-2xl   font-druk ">НОВОЕ ЗАДАНИЕ</h1>
        <p className="mb-12 text-start text-sm text-neutral-400">
          Выбери одно из 10 готовых заданий <br /> или создай свое
        </p>
      </div>

      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 pl-3">
          <div className="flex justify-between pr-3 items-start mb-3">
            <div className="">{category.title}</div>
          </div>
          <div
            className={`flex scroll-smooth gap-4 pb-4 w-screen overflow-x-auto`}>
            {category.items.map((card, cardIndex) => (
              <Link
                to="/card/$id"
                params={{ id: String(card.id) }}
                key={cardIndex}
                className={`relative flex-shrink-0 bg-cover ${category.color} h-[250px] w-[250px]`}
                style={{ transform: "t" }}>
                <div className="text-outline z-10 font-druk absolute inset-x-0 top-0 p-3 text-start text-lg leading-7 text-black">
                  {card.title}
                </div>
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  className={`absolute bottom-0 right-0 w-[200px] h-[200px] bg-cover object-cover rounded-lg ${category.color} ${card.id === 3 && "h-[170px]"}`}
                  loading="eager"
                  priority={cardIndex < 4}
                  width={200}
                  height={200}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}

      <Link to="/card/create" className="">
        <CreateTaskButton />
      </Link>
    </div>
  );
};

export default Challenges;
