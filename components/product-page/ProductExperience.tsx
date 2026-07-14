"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCategory } from "./types";

import { Dispatch, SetStateAction } from "react";
import CollectionCard from "./CollectionCard";

interface ProductExperienceProps {
  collections: ProductCategory[];
  activeIndex: number;

  setCollections: Dispatch<SetStateAction<ProductCategory[]>>;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

gsap.registerPlugin(ScrollTrigger);

export default function ProductExperience({
  collections,
  activeIndex,
  setActiveIndex,
  setCollections,
}: ProductExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!collections.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,

        start: "top top",

        end: () => `+=${window.innerHeight * collections.length}`,

        pin: true,

        scrub: true,

        anticipatePin: 1,

        onUpdate(self) {
          const progress = self.progress;

          const index = Math.min(
            collections.length - 1,
            Math.floor(progress * collections.length),
          );

          setActiveIndex(index);
        },
      });
    });

    return () => ctx.revert();
  }, [collections]);

  return (
    <section
      style={{
        height: `${collections.length * 116.57}vh`,
      }}
    >
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-primary/95"
      >
        {/* Progress */}

        <div className="absolute left-12 top-1/2 z-50 -translate-y-1/2 space-y-4">
          {collections.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                activeIndex === index
                  ? "h-12 w-[2px] bg-white"
                  : "h-6 w-[2px] bg-neutral-700"
              }`}
            />
          ))}
        </div>

        {/* Cards */}

        <div className="relative h-full">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection._id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              product={collection}
              active={index === activeIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
