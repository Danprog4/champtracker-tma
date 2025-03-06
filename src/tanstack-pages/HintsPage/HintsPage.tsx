import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accordionData } from "./accordion.config";
import { BackIcon } from "@/icons/Back";
import { BuyPremium } from "@/components/BuyPremium";
import { Button } from "@/components/ui/button";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
import PremiumFeatures from "@/components/ui/PremiumFeatures";

const HintsAndTipsPage: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="flex h-screen flex-col bg-yellow-400">
      <div className="fixed z-1 flex w-[100vw] text-black justify-between bg-yellow-400 items-center h-[fit] pt-9  pl-3 ">
        <Link to="/about" className="">
          <BackIcon />
        </Link>
      </div>
      <div className="mb-8 mt-20 pl-3">
        <span className="text-2xl leading-6  text-black font-druk">
          ПОДСКАЗКИ <br /> И СОВЕТЫ
        </span>
      </div>
      <div className="w-[100vw] px-0">
        <Accordion type="single" collapsible className="space-y-1">
          {accordionData.map((item) => (
            <AccordionItem value={`item ${item.id}`} key={item.id}>
              <AccordionTrigger className="font-medium px-3">
                {item.answer}
              </AccordionTrigger>
              <AccordionContent className="font-medium px-3">
                {item.question}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {!isPremium(user) ? (
        <BuyPremium>
          <div className="fixed flex font-druk text-sm flex-nowrap left-3 bottom-7 items-center gap-2 rounded-full   bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500  py-2 px-4  text-black hover:opacity-90">
            <div className="flex items-center gap-1 font-druk text-[10px]">
              ПРЕМИУМ
              <TelegramStar />
            </div>
          </div>
        </BuyPremium>
      ) : (
        <PremiumFeatures>
          <div className="fixed flex font-druk text-sm flex-nowrap left-3 bottom-7 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2  text-black hover:opacity-90">
            Ваш премиум
          </div>
        </PremiumFeatures>
      )}
    </div>
  );
};

export default HintsAndTipsPage;
