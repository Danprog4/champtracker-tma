import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";
import { updateOnBoarding } from "@/api/challenge";

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
        className="relative h-screen w-full overflow-hidden">
        <CarouselContent className="">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex w-screen items-center flex-col justify-center p-0 h-screen bg-black relative text-white">
                <span className="text-4xl font-semibold pb-2">
                  Добро пожаловать!
                </span>
                <p className="text-sm text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, laborum consequatur delectus deleniti molestias modi
                  eveniet accusamus provident alias magni!
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-12 left-1/2 translate-x-20">
          {current !== count ? (
            <CarouselNext className="bg-yellow-400 w-[250px] h-[30px]" />
          ) : (
            <Link to="/new">
              <CarouselNext className="bg-yellow-400 w-[250px] h-[30px]" />
            </Link>
          )}
        </div>
      </Carousel>
      <div className="absolute bottom-2 w-full text-center text-sm text-muted-foreground translate-x-1">
        {current} из {count}
      </div>
    </div>
  );
}
