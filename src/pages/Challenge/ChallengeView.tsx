import React from "react";
import { Link, useParams } from "@tanstack/react-router";
import { categories } from "@/configs/cards.config";
import { CrossIcon } from "@/icons/Cross";

const ChallengeView: React.FC = () => {
  const { id } = useParams({ from: "/card/$id" });
  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id))
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  return (
    <div className="mb-20 flex w-full flex-col pb-24">
      <div className="relative rounded-b-3xl w-full">
        <img
          src={card?.imageUrl}
          alt={card?.title}
          className={`${category?.color} h-[65vh] w-full object-cover rounded-b-3xl`}
        />
        <Link
          to="/new"
          className="fixed right-0 top-0 pt-4 p-3 z-10 text-black">
          <CrossIcon />
        </Link>
        <div className="absolute inset-0 flex flex-col p-3 pt-14  text-start">
          <span className="text-sm text-black">Задание</span>
          <span className="text-lg font-bold font-druk text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
            {card?.title}
          </span>
        </div>
        <div className="absolute bottom-3 flex pl-3">
          {card?.duration?.map((dur) => (
            <div className="flex w-[18.77vw] flex-col aspect-square items-center justify-center rounded-full bg-black bg-cover">
              <div className="text-center">
                <div className="font-druk text-lg">{dur}</div>
                <div className="mb-1 mt-[-5px] text-[10px] font-medium">
                  ДНЕЙ
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0 p-3">
          <div className="flex w-[18.77vw] flex-col aspect-square items-center justify-center rounded-full bg-black bg-cover">
            <div className=" text-[10px] text-start font-medium">
              ЕЖЕ <br /> ДНЕВ <br /> ВНО
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="mb-14 mt-5 text-start text-lg text-gray-300 leading-6">
          {card?.desc}
        </p>
        <div className="text-start">
          <span className="text-lg font-druk font-bold leading-6">
            ПОДСКАЗКИ <br /> И СОВЕТЫ
          </span>
          {card?.hints?.map((hint, index) => (
            <div className="mt-5 flex gap-3 text-lg font-light text-gray-300">
              <span className="font-bold text-white">
                <div className="w-5 border border-gray-300 mt-3"></div>
              </span>
              <p
                className={`${index + 1 === card.hints?.length && "mb-5"} leading-6`}>
                {hint}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pl-0 font-extrabold">
        <Link
          to={"/card/$id/create"}
          params={{
            id: card!.id.toString(),
          }}
          className="fixed bottom-7 shadow-xl shadow-black z-20 flex h-[45px] w-[94vw] font-druk text-xs items-center justify-center rounded-lg bg-pink-500 p-5">
          <div className="">ПРОДОЛЖИТЬ</div>
        </Link>
      </div>
    </div>
  );
};

export default ChallengeView;
