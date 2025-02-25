import * as React from "react";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
import { isDateUpdate } from "@/lib/dateUtils";
import { useActiveStore } from "@/stores/activeStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import infoImg from "@/assets/images/info.png";

export const Modal = () => {
  const { active, setActive } = useActiveStore();
  const { user } = useUser();
  const isAvailableDate = isDateUpdate(user.lastActiveDate);

  if (!active) return null;

  if (isAvailableDate && isPremium(user))
    return (
      <div className="fixed inset-0 z-50 bg-red-400 flex items-center justify-center h-screen w-screen">
        <div className="flex w-full h-full items-center flex-col justify-end bottom-28 p-0 relative text-white">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={infoImg}
              alt="info"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[300px]"
            />
          </div>
          <div className="w-full max-w-md px-4 z-10">
            <h2 className="text-2xl font-semibold pb-2 text-center font-druk">
              Приветствую!
            </h2>
            <p className="text-sm text-center mb-6">
              Отмечай день хотя бы в одном твоем задании и получай ежедневные
              токены!
            </p>
            <button
              onClick={() => {
                setActive(false);
              }}
              className="bg-yellow-400 font-druk text-xs text-white px-4 py-2 rounded w-[250px] h-[30px] mx-auto block mb-16">
              Продолжить
            </button>
          </div>
        </div>
      </div>
    );

  return null;
};
