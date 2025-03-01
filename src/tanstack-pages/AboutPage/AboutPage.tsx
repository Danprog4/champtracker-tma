import React from "react";
import Image from "next/image";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { Button } from "@/components/ui/button";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { CrossIcon } from "@/icons/Cross";
import { useUser } from "@/hooks/useUser";
import { isPremium } from "@/lib/challengeUtills";
import PremiumFeatures from "@/components/ui/PremiumFeatures";

const AboutPage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed flex w-full justify-start bg-black h-[8vh]  pl-3 items-center">
        <Link to="/">
          <CrossIcon />
        </Link>
      </header>
      <Link
        to="/hints"
        className="mt-20 flex h-[33vh] w-[100vw] items-center justify-center rounded-full bg-yellow-400">
        <span className="text-center font-druk text-xl  text-black leading-6">
          ПОДСКАЗКИ <br></br> И СОВЕТЫ
        </span>
      </Link>
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
      <div className="flex font-druk">
        <a
          className="flex h-[50vw] w-[50vw] flex-col  items-center justify-center rounded-3xl bg-blue-300"
          href="https://github.com/Danprog4/Challenge-Up"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            className="h-[55px] w-[55px]"
            src="/images/GitHub-Logo.wine.svg"
            alt="GitHub"
            width={55}
            height={55}
          />
          <span className=" text-sm text-black">Danprog4</span>
        </a>
        <a
          className="flex h-[50vw] w-[50vw] flex-col items-center justify-center  bg-orange-400"
          href="https://t.me/danikpavlovski"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            className="h-[58px] w-[58px]"
            src="/images/telegram-svgrepo-com (3).svg"
            alt="Telegram"
            width={58}
            height={58}
          />
          <span className=" text-black mb-1 text-sm">@danikpavlovski</span>
        </a>
      </div>
      {/* <div
          onClick={() =>
            toast("К сожалению, сейчас доступен только русский язык")
          }
          className="mb-10 flex h-[8vh] w-[100vw] items-center justify-center rounded-full bg-green-600 text-xl  text-black"
        >
          <span>ЯЗЫК</span>
        </div> */}
      <footer className="mb-14 pr-3 mt-auto flex justify-between pl-3 ">
        <div className="text-lg  font-druk">ChampTracker</div>
        <div className="flex flex-col items-end font-thin">
          <Image
            src="/images/5a369c1a2cfcd0.4577110515135283461843.png"
            alt="CopyRight"
            className="h-[25px] w-[25px]"
            width={25}
            height={25}
          />
          <span className="font-druk text-xs">2025</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
