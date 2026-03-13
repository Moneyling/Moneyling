/**
 * Reusable carousel using Embla. Supports dots, prev/next, optional autoplay,
 * and "center" variant (selected slide scaled and emphasized).
 */

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselVariant = "default" | "center";

export type CarouselProps = {
  children: React.ReactNode | React.ReactNode[];
  /** Embla options (loop, align, etc.) */
  options?: Parameters<typeof useEmblaCarousel>[0];
  /** Autoplay delay in ms; omit to disable */
  autoplayDelay?: number;
  /** Visual style: default = even slides; center = center slide larger */
  variant?: CarouselVariant;
  /** Slide width for default (e.g. "320px"); center uses percentage */
  slideSize?: string;
  /** Class for the viewport wrapper */
  className?: string;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show prev/next arrows */
  showArrows?: boolean;
  /** Extra class for each slide wrapper */
  slideClassName?: string;
  /** Card/slide content height (e.g. "h-[460px]") */
  slideHeight?: string;
};

export function Carousel({
  children,
  options = {},
  autoplayDelay,
  variant = "default",
  slideSize = "min(320px,85vw)",
  className = "",
  showDots = true,
  showArrows = true,
  slideClassName = "",
  slideHeight = "h-[420px]",
}: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const plugins = [];
  if (autoplayDelay != null && autoplayDelay > 0) {
    plugins.push(Autoplay({ delay: autoplayDelay, stopOnInteraction: true }));
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: variant === "center" ? "center" : "start",
      loop: true,
      containScroll: variant === "center" ? "trimSnaps" : undefined,
      ...options,
    },
    plugins.length ? plugins : undefined
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const slides = Array.isArray(children) ? children : [children];
  const count = slides.length;
  const isCenter = variant === "center";

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex touch-pan-y gap-0"
          style={{
            backfaceVisibility: "hidden",
            marginLeft: isCenter ? 0 : undefined,
          }}
        >
          {slides.map((child, index) => (
            <div
              key={index}
              className={`min-w-0 shrink-0 grow-0 select-none ${
                isCenter ? "flex items-center justify-center px-2" : ""
              } ${slideClassName}`}
              style={
                isCenter
                  ? { flex: "0 0 75%" }
                  : { minWidth: slideSize, width: slideSize }
              }
            >
              <div
                className={`transition-all duration-300 origin-center ${
                  isCenter
                    ? selectedIndex === index
                      ? "z-20 scale-100 opacity-100"
                      : "z-0 scale-[0.82] opacity-50"
                    : ""
                }`}
              >
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDots && count > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                selectedIndex === index ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showArrows && count > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="btn-glass-outline p-2 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-primary" aria-hidden />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="btn-glass-outline p-2 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-primary" aria-hidden />
          </button>
        </div>
      )}

      <style>{`
        .overflow-hidden::-webkit-scrollbar { display: none; }
        .overflow-hidden { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}
