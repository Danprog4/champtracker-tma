import { BuyPremium } from "@/components/BuyPremium";
import { TelegramStar } from "@/components/shared/TelegramStar";
import PremiumFeatures from "@/components/ui/PremiumFeatures";
import { useChallenges } from "@/hooks/useChallenges";
import { usePremium } from "@/hooks/usePremium";
import { useTokens } from "@/hooks/useTokens";
import { useUser } from "@/hooks/useUser";
import { BackIcon } from "@/icons/Back";
import TokenIcon from "@/icons/TokenIcon";
import { isPremium } from "@/lib/challengeUtills";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";

export const ProfilePage = () => {
  const { user } = useUser();
  const fakeUsers = [
    {
      name: "SmitkaJS22",
      tokens: 3420,
    },
    {
      name: "BlueRaven22",
      tokens: 1890,
    },
    {
      name: "EchoStar99",
      tokens: 1450,
    },
    {
      name: "AlisaAJ_99",
      tokens: 1230,
    },
    {
      name: "SilentPeak05",
      tokens: 930,
    },
    {
      name: "ChDmitry05",
      tokens: 710,
    },
  ];
  return (
    <div className="flex flex-col  overflow-x-hidden ">
      <div className="flex items-center justify-center ">
        <div className="fixed z-10  flex w-[100vw] justify-between items-center bg-black h-[fit] pt-24  p-3 top-0">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-3 gap-2  mt-36">
        <div className="text-start text-2xl font-druk  flex items-end gap-2">
          <div className="flex gap-1">
            <div>{user.name}</div>
            {isPremium(user) && (
              <div className="pt-[5px]">
                <TelegramStar />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="text-white text-sm ">
            Выполненных заданий: {user.completedChallengesCount}
          </div>
          <div className="text-white text-sm ">
            {isPremium(user) ? (
              <>Премиум до {dayjs(user.premiumUntil).format("DD.MM.YYYY")}</>
            ) : (
              <>Премиум: нет</>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3 pt-3 ml-3 mr-3 border border-neutral-600 bg-neutral-800 rounded-lg">
        <div className="text-white text-sm font-druk pb-3">Таблица лидеров</div>
        {fakeUsers.map((fakeUser, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-neutral-600 border p-2 ${
              index === fakeUsers.length - 1 && "mt-3 border-yellow-300"
            } ${
              index !== 0 && index !== fakeUsers.length - 1 ? "border-t-0" : ""
            }`}>
            <div className="flex items-center">
              <div className="pr-3">{`${index === fakeUsers.length - 1 ? "100." : `${index + 1}.`}`}</div>
              <div className="flex items-center">
                {index === fakeUsers.length - 1 ? (
                  isPremium(user) ? (
                    <div className="flex items-center gap-1">
                      {user.name}
                      <div className="pb-[4px]">
                        <TelegramStar />
                      </div>
                    </div>
                  ) : (
                    user.name
                  )
                ) : (
                  fakeUser.name
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {index === fakeUsers.length - 1 ? (
                <div className="flex items-center gap-1">
                  {user.tokens} <TokenIcon />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>{fakeUser.tokens}</span> <TokenIcon />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Achievements Section */}
      <div className="flex flex-col p-3 mt-4 ml-3 mr-3 border border-neutral-600 rounded-lg bg-neutral-800">
        <div className="text-white text-sm font-druk pb-3">Мои Достижения</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Первые шаги",
              description: "Выполнить первое задание",
              completed: user.completedChallengesCount > 0,
            },
            {
              title: "Активист",
              description: "Выполнить 10 заданий",
              completed: user.completedChallengesCount >= 10,
            },
            {
              title: "Коллекционер",
              description: "Собрать 1000 токенов",
              completed: user.tokens >= 1000,
            },
            {
              title: "Чемпион",
              description: "Попасть в топ-10",
              completed: false,
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg ${
                achievement.completed
                  ? "border-yellow-400 bg-neutral-800"
                  : "border-neutral-600 bg-neutral-900"
              }`}>
              <div className="text-sm  mb-1">{achievement.title}</div>
              <div className="text-xs text-neutral-400">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs pr-3 text-neutral-400 leading-4 pl-3 pt-3 pb-20">
        Получай токены за свои достижения и повышай свой уровень в таблице
        лидеров. Будь лучше всех!
      </div>
      {!isPremium(user) ? (
        <BuyPremium>
          <button
            className={`fixed font-druk text-sm text-white hover:opacity-90 bottom-7 ml-3 flex h-[45px] w-[94vw] items-center gap-1 justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 p-5       }`}>
            <span>Разблокируй новые функции</span>
            <TelegramStar className="pb-[1px]" />
          </button>
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
