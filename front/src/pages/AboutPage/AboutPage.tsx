import React from "react";
import CrossImg from "../../assets/images/—Pngtree—vector cross icon_4254623.png";
import GitHubLogo from "../../assets/images/GitHub-Logo.wine.svg";
import TelegramLogo from "../../assets/images/telegram-svgrepo-com (3).svg";
import CopyRightLogo from "../../assets/images/5a369c1a2cfcd0.4577110515135283461843.png";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { usePremium } from "@/hooks/usePremium";
import { Button } from "@/components/ui/button";
import { TelegramStar } from "@/components/shared/TelegramStar";
import { CrossIcon } from "@/icons/Cross";
const AboutPage: React.FC = () => {
  const { isPremium } = usePremium();
  console.log(isPremium, "isPremium");
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed flex w-full items-center justify-start bg-black pl-3 pt-14">
        <Link to="/">
          <CrossIcon />
        </Link>
      </header>
      <Link
        to="/hints"
        className="mt-28 flex h-[33vh] w-[100vw] items-center justify-center rounded-full bg-yellow-400">
        <span className="text-center font-druk text-xl font-extrabold text-black leading-6">
          ПОДСКАЗКИ <br></br> И СОВЕТЫ
        </span>
      </Link>
      {!isPremium ? (
        <BuyPremium>
          <Button
            variant="ghost"
            className="fixed left-3 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
            <TelegramStar />
            <span>Premium</span>
          </Button>
        </BuyPremium>
      ) : (
        <div className="fixed flex flex-nowrap left-3 bottom-4 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium text-white hover:opacity-90">
          У вас есть премиум!
        </div>
      )}
      <div className="flex font-druk">
        <a
          className="flex h-[50vw] w-[50vw] flex-col  items-center justify-center rounded-3xl bg-blue-300"
          href="https://github.com/Danprog4/Challenge-Up"
          target="_blank"
          rel="noopener noreferrer">
          <img className="h-[55px] w-[55px]" src={GitHubLogo} alt="GitHub" />
          <span className="font-bold text-sm text-black">Danprog4</span>
        </a>
        <a
          className="flex h-[50vw] w-[50vw] flex-col items-center justify-center  bg-orange-400"
          href="https://t.me/danikpavlovski"
          target="_blank"
          rel="noopener noreferrer">
          <img
            className="h-[58px] w-[58px]"
            src={TelegramLogo}
            alt="Telegram"
          />
          <span className="font-bold text-black mb-1 text-sm">
            @danikpavlovski
          </span>
        </a>
      </div>
      {/* <div
        onClick={() =>
          toast("К сожалению, сейчас доступен только русский язык")
        }
        className="mb-10 flex h-[8vh] w-[100vw] items-center justify-center rounded-full bg-green-600 text-xl font-extrabold text-black"
      >
        <span>ЯЗЫК</span>
      </div> */}
      <footer className="mb-12 pr-3 mt-auto flex justify-between pl-3 ">
        <div className="text-lg font-bold font-druk">ChampTracker</div>
        <div className="flex flex-col items-end font-thin">
          <img
            src={CopyRightLogo}
            alt="CopyRight"
            className="h-[25px] w-[25px]"
          />
          <span className="font-druk text-xs">2025</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
