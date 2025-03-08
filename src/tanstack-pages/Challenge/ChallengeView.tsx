import React, { useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { categories } from "@/configs/cards.config";
import { CrossIcon } from "@/icons/Cross";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
const ChallengeView: React.FC = () => {
  const { id } = useParams({ from: "/card/$id" });

  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id))
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  return (
    <div className="flex min-h-screen flex-col pb-12 overflow-y-auto h-auto">
      {/* <div
        className={`fixed z-10 flex w-full justify-end items-center  p-3 h-[fit] pt-24 pb-3 bg-${category?.color} text-black`}></div> */}
      <div className="relative rounded-b-3xl w-full flex items-end ">
        <div
          className={`${category?.color} h-[75vh] w-full object-cover rounded-b-3xl`}
        />
        <div className="absolute top-24 right-3 text-black z-[1000]">
          <Link to="/new">
            <CrossIcon />
          </Link>
        </div>

        <div className="absolute inset-0 flex flex-col p-3 pt-24  text-start ">
          <span className="text-sm font-medium text-white">Задание</span>
          <span className="text-lg  font-druk text-black ">{card?.title}</span>
        </div>
        <img
          src={card?.imageUrl}
          alt={card?.title}
          className="absolute w-[100vw] h-[60vh] object-cover "
        />
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
        <p className="mb-10 mt-5 text-start text-lg text-neutral-300 leading-6">
          {card?.desc}
        </p>
        <div className="text-start">
          <span className="text-lg font-druk  leading-6">
            ПОДСКАЗКИ <br /> И СОВЕТЫ
          </span>
          {card?.hints?.map((hint, index) => (
            <div className="mt-5 flex gap-3 text-lg font-light text-neutral-300">
              <span className=" text-white">
                <div className="w-5 border border-neutral-300 mt-3"></div>
              </span>
              <p
                className={`${index + 1 === card.hints?.length && "mb-5"} leading-6`}>
                {hint}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pl-0 ">
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
