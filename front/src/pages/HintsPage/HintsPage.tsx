import React from 'react';
import BackImg from '..//../assets/images/back-svgrepo-com (2).svg';
import { Link } from '@tanstack/react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { accordionData } from './accordion.config';

const HintsAndTipsPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-yellow-400">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-yellow-400 pb-2 pl-[16px] pr-5 pt-9">
        <Link to="/about" className="">
          <img
            src={BackImg}
            className="h-[30px] w-[30px] object-contain"
            alt="About"
          />
        </Link>
      </div>

      <div className="mb-14 mt-20 pl-5">
        <span className="text-2xl font-extrabold text-black">
          СОВЕТЫ И ПОДСКАЗКИ
        </span>
      </div>
      <div className="w-[100vw] px-0">
        <Accordion type="single" collapsible className="space-y-1">
          {accordionData.map((item) => (
            <AccordionItem value={`item ${item.id}`} key={item.id}>
              <AccordionTrigger>{item.answer}</AccordionTrigger>
              <AccordionContent>{item.question}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default HintsAndTipsPage;
