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
import { usePremium } from "@/hooks/usePremium";

const HintsAndTipsPage: React.FC = () => {
  const { isPremium } = usePremium();
  return (
    <div className="flex h-screen flex-col bg-yellow-400">
      <div className="fixed z-10 flex w-[100vw] text-black justify-between bg-yellow-400  pl-3 pr-3 pt-14 ">
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
      {!isPremium ? (
        <BuyPremium>
          <Button
            variant="ghost"
            className="fixed left-3 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
            <TelegramStar />
            <span>Premium</span>
          </Button>
        </BuyPremium>
      ) : (
        <div className="fixed flex flex-nowrap left-3 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
          У вас есть премиум!
        </div>
      )}
    </div>
  );
};

export default HintsAndTipsPage;
