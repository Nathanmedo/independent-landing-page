"use client";

import { useEffect, useRef } from "react";
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

// iOS Safari fires resize events when the address bar / notch UI
// collapses or expands — this only changes `innerHeight`, not the
// actual usable layout. Without this, ScrollTrigger recalculates the
// pin distance on every scroll tick and the section jitters.
ScrollTrigger.config({ ignoreMobileResize: true });

const HEIGHT_MULTIPLIER = 1.1657; // matches the original 116.57%

export default function ProductExperience({
  collections,
  activeIndex,
  setActiveIndex,
  setCollections,
}: ProductExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!collections.length) return;

    const ctx = gsap.context(() => {
      // Snapshot the viewport height once instead of relying on a CSS
      // vh/svh unit that iOS keeps recalculating mid-scroll.
      const vh = window.innerHeight;

      if (sectionRef.current) {
        sectionRef.current.style.height = `${
          vh * collections.length * HEIGHT_MULTIPLIER
        }px`;
      }

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,

        start: "top top",

        end: () => `+=${vh * collections.length}`,

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

      // Only recompute on a genuine shape change (rotation / resize),
      // not on iOS's address-bar height flicker.
      let lastWidth = window.innerWidth;
      const handleResize = () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;

        const newVh = window.innerHeight;
        if (sectionRef.current) {
          sectionRef.current.style.height = `${
            newVh * collections.length * HEIGHT_MULTIPLIER
          }px`;
        }
        trigger.vars.end = `+=${newVh * collections.length}`;
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, sectionRef);

    return () => ctx.revert();
  }, [collections]);

  return (
    <section
      ref={sectionRef}
      // Fallback for the very first paint, before the effect measures
      // the real viewport — swapped to px immediately after mount.
      style={{
        height: `${collections.length * 116.57}dvh`,
      }}
    >
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-primary/95"
      >
        {/* Progress */}
        <div className="absolute left-6 top-1/2 z-50 -translate-y-1/2 space-y-3 md:left-12 md:space-y-4">
          {collections.map((_, index) => (
            <div
              key={index}
              className={`w-px transition-all duration-300 ease-out ${
                activeIndex === index
                  ? "h-10 bg-white"
                  : "h-5 bg-white/25"
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