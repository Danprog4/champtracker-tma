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

  return (
    <div className="h-min-full flex flex-col">
      <div className="flex items-center justify-center">
        <div className="fixed z-10  flex w-[100vw] justify-between bg-black h-[12vh] p-3 pt-14 top-0">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-3 gap-2">
        <div className="text-start text-2xl font-druk mt-24 flex items-end gap-2">
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
      <div className="flex flex-col p-3 pt-3 ml-3 mr-3 border-2 border-gray-600 bg-gray-900 rounded-lg">
        <div className="text-white text-sm font-druk pb-3">Таблица лидеров</div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-gray-600 border p-2 ${
              index === Array.from({ length: 5 }).length - 1 &&
              "mt-3 border-yellow-300"
            }`}>
            <div className="flex items-center">
              <div className="pr-3">{`${index === Array.from({ length: 5 }).length - 1 ? "100." : `${index + 1}.`}`}</div>
              <div className="flex items-center">
                {index === Array.from({ length: 5 }).length - 1 ? (
                  isPremium(user) ? (
                    <div className="flex items-center gap-1">
                      {user.username}
                      <div className="pb-[4px]">
                        <TelegramStar />
                      </div>
                    </div>
                  ) : (
                    user.name
                  )
                ) : (
                  `User ${index + 1}`
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {index === Array.from({ length: 5 }).length - 1 ? (
                <div className="flex items-center gap-1">
                  {user.tokens} <TokenIcon />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>100</span> <TokenIcon />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Achievements Section */}
      <div className="flex flex-col p-3 mt-4 ml-3 mr-3 border-2 border-gray-600 rounded-lg bg-gray-900">
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
                  ? "border-yellow-400 bg-gray-800"
                  : "border-gray-600 bg-gray-900"
              }`}>
              <div className="text-sm  mb-1">{achievement.title}</div>
              <div className="text-xs text-gray-400">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs pr-3 text-gray-400 leading-4 pl-3 pt-3 mb-20">
        Получай токены за свои достижения и повышай свой уровень в таблице
        лидеров. Будь лучше всех!
      </div>
      {!isPremium(user) ? (
        <BuyPremium>
          <button
            className={`fixed font-druk text-xs text-black hover:opacity-90 bottom-7 ml-3 flex h-[45px] w-[94vw] items-center gap-1 justify-center rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 p-5       }`}>
            <span>Разблокируй новые функции</span>
            <TelegramStar className="pb-[1px]" />
          </button>
        </BuyPremium>
      ) : (
        <PremiumFeatures>
          <div className="fixed text-black font-druk text-xs flex flex-nowrap left-3 bottom-7 items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 py-2 font-medium hover:opacity-90">
            Ваш премиум
          </div>
        </PremiumFeatures>
      )}
    </div>
  );
};
