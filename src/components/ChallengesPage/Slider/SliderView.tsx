import React, { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import Image from "next/image";
import { updateOnBoarding } from "@/api/challenge";

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
  currentSlide: { [key: number]: number };
  onScroll: (categoryIndex: number) => void;
  sliderRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const DumpSlider: React.FC<DumpSliderProps> = ({
  categories,
  currentSlide,
  onScroll,
  sliderRefs,
}) => {
  const observerRefs = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Cleanup previous observers
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    categories.forEach((_, categoryIndex) => {
      const sliderEl = sliderRefs.current[categoryIndex];
      if (!sliderEl) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const cardIndex =
                Number(entry.target.getAttribute("data-index")) || 0;
              onScroll(categoryIndex);
            }
          });
        },
        {
          root: sliderEl,
          threshold: 0.8,
          rootMargin: "0px",
        }
      );

      // Observe all cards in this category
      sliderEl.querySelectorAll(".card-item").forEach((card) => {
        observer.observe(card);
      });

      observerRefs.current[categoryIndex] = observer;
    });

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, [categories, onScroll]);

  return (
    <div className="flex flex-col w-full">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 relative">
          <div className="flex justify-between px-4 items-center mb-3">
            <h3 className="text-lg font-medium">{category.title}</h3>
            <span className="text-neutral-400 text-sm">
              {currentSlide[categoryIndex] || 1}/{category.items.length}
            </span>
          </div>

          <div
            ref={(el) => {
              if (el) {
                sliderRefs.current[categoryIndex] = el;
              }
            }}
            className="grid grid-flow-col auto-cols-[250px] gap-4 overflow-x-auto overscroll-x-contain px-4 snap-x snap-mandatory scroll-smooth ml-3"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            {category.items.map((card, cardIndex) => (
              <Link
                onClick={() => updateOnBoarding(true)}
                to="/card/$id"
                params={{ id: String(card.id) }}
                key={cardIndex}
                data-index={cardIndex}
                className="card-item relative aspect-square snap-start snap-always bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden will-change-transform"
                style={{
                  contain: "content",
                  contentVisibility: "auto",
                }}>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    className="object-cover"
                    sizes="250px"
                    fill
                    priority={cardIndex < 4}
                  />
                </div>
                <div
                  className="absolute inset-0 p-3 flex items-start"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
                  }}>
                  <h4 className="text-white text-lg font-bold leading-tight">
                    {card.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DumpSlider;
