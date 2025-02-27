import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";
import { updateOnBoarding } from "@/api/challenge";

const slides = [
  {
    title: "Достигай целей вместе с нами",
    description:
      "Создавай задания, отслеживай прогресс и развивайся каждый день. Мы поможем тебе стать лучшей версией себя.",
    bgColor: "bg-red-400",
    image: "/images/main.png",
  },
  {
    title: "Формируй полезные привычки",
    description:
      "Перестать откладывать все на потом. Регулярно выполняй задания, получай награды и превращай желаемые действия в устойчивые привычки.",
    bgColor: "bg-purple-400",
    image: "/images/info.png",
  },
  {
    title: "Соревнуйся и побеждай",
    description:
      "Участвуй в рейтинге игроков, получай премиум токены за достижения и обменивай их на ценные призы. Будь лучшим!",
    bgColor: "bg-blue-400",
    image: "/images/raiting.png",
  },
];

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        className={`relative h-screen w-full overflow-hidden ${
          slides[Math.max(0, current - 1)]?.bgColor || slides[0].bgColor
        }`}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                className={`flex w-screen items-center flex-col justify-end bottom-28 p-0 h-screen  relative text-white`}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={300}
                  height={300}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[300px]"
                />
                <span className="text-2xl font-semibold pb-2  text-center font-druk">
                  {slide.title}
                </span>
                <p className="text-sm text-center px-4">{slide.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-[72px] left-1/2 translate-x-20">
          {current !== count ? (
            <CarouselNext className="bg-yellow-400 w-[250px] h-[30px]" />
          ) : (
            <Link to="/new">
              <CarouselNext className="bg-yellow-400 w-[250px] h-[30px]" />
            </Link>
          )}
        </div>
      </Carousel>
      <div className="absolute bottom-7 w-full text-center text-sm  text-white translate-x-1">
        {current} из {count}
      </div>
    </div>
  );
}
