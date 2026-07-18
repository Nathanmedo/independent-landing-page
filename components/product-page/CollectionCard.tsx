"use client";

import { forwardRef } from "react";

import Image from "next/image";

import { ArrowUpRight } from "lucide-react";

import { ProductCategory } from "./types";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductCategory;

  active: boolean;

  index: number;
}

const CollectionCard = forwardRef<HTMLDivElement, Props>(
  ({ product, active, index }, ref) => {
    const router = useRouter();

    const productUrl = product?.media?.mainMedia?.image?.url;
    const collectionName = product?.name?.split("-");

    const handleViewCollection = () => {
      router.push(`/collections/${product?.slug}`);
    };
    return (
      <div
        id={product._id}
        ref={ref}
        className={`absolute product-card inset-0 transition-all duration-700 ${
          active
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col-reverse items-center justify-center md:justify-between px-6 py-12 sm:px-8 lg:h-full lg:flex-row lg:px-20 lg:py-0">
          {/* LEFT */}

          <div className="w-full flex md:items-start items-center flex-col text-center lg:w-[50%] lg:text-left">
            <p className="product-number mb-6 text-sm uppercase tracking-[.5em] text-white lg:mb-8">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h2 className="product-title text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl md:text-7xl lg:text-[9rem]">
              {collectionName[0]}
            </h2>

            <p className="product-description mx-auto mt-6 max-w-md text-base text-neutral-400 sm:text-lg lg:mx-0 lg:mt-10 lg:text-xl">
              {product.description}
            </p>

            <button
              onClick={handleViewCollection}
              className="product-button md:mt-10 mt-5 flex items-center gap-3 border-2 border-white px-6 py-4 uppercase tracking-[.3em] text-white transition-all duration-150 hover:bg-white hover:text-primary/95 lg:mt-14"
            >
              Explore
              <ArrowUpRight
                className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                size={18}
              />
            </button>
          </div>

          {/* RIGHT */}

          <div className="relative mb-10 h-[280px] w-full sm:h-[360px] md:h-[450px] lg:mb-0 lg:h-full lg:w-[45%]">
            <Image
              src={productUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              priority
              className={`product-image object-contain transition-all duration-500 ease-out ${
                active
                  ? "scale-100 opacity-100"
                  : "scale-[0.97] opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    );
  },
);

CollectionCard.displayName = "CollectionCard";

export default CollectionCard;
