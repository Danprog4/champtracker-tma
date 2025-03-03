import React from "react";
import { Link } from "@tanstack/react-router";
import { BuyPremium } from "@/components/BuyPremium";
import { updateOnBoarding } from "@/api/challenge";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect } from "react";

type Card = {
  id: number;
  imageUrl: string;
  title: string;
};

type Category = {
  title: string;
  color: string;
  items: Card[];
};

interface DumpSliderProps {
  categories: Category[];
  currentSlides: { [key: number]: number };
  onSlideChange: (categoryIndex: number, slideIndex: number) => void;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  currentSlides,
  onSlideChange,
}) => {
  const [apis, setApis] = React.useState<{ [key: number]: CarouselApi }>({});

  useEffect(() => {
    Object.entries(currentSlides).forEach(([categoryIndex, slideIndex]) => {
      const api = apis[Number(categoryIndex)];
      if (api) {
        api.scrollTo(slideIndex);
      }
    });
  }, [currentSlides, apis]);

  return (
    <div className="flex flex-col">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 pl-3">
          <div className="flex justify-between pr-3 items-start mb-3">
            <div className="">{category.title}</div>
            <div className="text-neutral-400 text-sm mt-1">
              {(currentSlides[categoryIndex] || 0) + 1}/{category.items.length}
            </div>
          </div>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              setApi={(api) => {
                if (api) {
                  setApis((prev) => ({ ...prev, [categoryIndex]: api }));
                  api.on("select", () => {
                    const currentIndex = api.selectedScrollSnap();
                    if (typeof currentIndex === "number") {
                      onSlideChange(categoryIndex, currentIndex);
                    }
                  });
                }
              }}>
              <CarouselContent className="-ml-4">
                {category.items.map((card, cardIndex) => (
                  <CarouselItem key={cardIndex} className="pl-4 basis-auto">
                    <Link
                      onClick={() => {
                        updateOnBoarding(true);
                      }}
                      to="/card/$id"
                      params={{ id: String(card.id) }}
                      className="relative block">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        className="-z-50 h-[250px] w-[250px] object-contain rounded-lg"
                        loading="eager"
                        priority={cardIndex < 4}
                        width={250}
                        height={250}
                      />
                      <div className="text-outline font-druk absolute inset-0 p-3 text-start text-lg leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
                        {card.title}
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DumpSlider;
