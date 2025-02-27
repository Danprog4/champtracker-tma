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
      <div className="fixed z-1 flex w-[100vw] text-black justify-between bg-yellow-400  pl-3 pr-3 pt-14 ">
        <Link to="/about" className="">
          <BackIcon />
        </Link>
      </div>
      <div className="mb-8 mt-[100px] pl-3">
        <span className="text-2xl leading-6 font-extrabold text-black font-druk">
          ПОДСКАЗКИ <br /> И СОВЕТЫ
        </span>
      </div>
      <div className="w-[100vw] px-0">
        <Accordion type="single" collapsible className="space-y-1">
          {accordionData.map((item) => (
            <AccordionItem value={`item ${item.id}`} key={item.id}>
              <AccordionTrigger className="font-mediom">
                {item.answer}
              </AccordionTrigger>
              <AccordionContent className="font-light ">
                {item.question}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {!isPremium(user) ? (
        <BuyPremium>
          <Button
            variant="ghost"
            className="fixed left-3 font-druk text-[10px] bottom-7 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-black hover:opacity-90">
            <span>ПРЕМИУМ</span>
            <TelegramStar />
          </Button>
        </BuyPremium>
      ) : (
        <PremiumFeatures>
          <div className="fixed flex font-druk text-xs flex-nowrap left-3 bottom-7 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-black hover:opacity-90">
            Ваш премиум
          </div>
        </PremiumFeatures>
      )}
    </div>
  );
};

export default HintsAndTipsPage;
