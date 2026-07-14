"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { WixImage } from "./ui/wiximage";
import Badge from "./ui/badge";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const image1 = product?.media?.mainMedia?.image?.url;
  const image2 = product?.media?.items?.[1]?.image?.url;

  return (
    <Link
      href={product.productPageUrl.path}
      className="group block"
    >
      <article
        className="
          overflow-hidden
          rounded-2xl

          border
          border-white/8

          bg-primary

          shadow-[0_10px_40px_rgba(0,0,0,.18)]

          transition-all
          duration-500

          hover:-translate-y-1.5
          hover:border-white/15
          hover:shadow-[0_25px_70px_rgba(0,0,0,.35)]
        "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* IMAGE */}

        <div className="relative aspect-[4/4] overflow-hidden">

          <WixImage
            mediaIdentifier={hovered && image2 ? image2 : image1}
            altText={product.name}
            width={600}
            height={600}
            className="
              h-full
              w-full
              object-cover

              transition-transform
              duration-700

              group-hover:scale-[1.05]
            "
          />

          {product.ribbon && (
            <div className="absolute left-5 top-5">
              <Badge className="">
                {product.ribbon}
              </Badge>
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div className="space-y-6 p-6">

          <div className="flex items-start justify-between gap-5">

            <div>

              <h3
                className="
                  text-xl
                  font-semibold
                  tracking-[-0.03em]
                  text-white
                "
              >
                {product.name}
              </h3>

              <div className="mt-4 flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <p className="text-sm text-neutral-400">
                  {product.stock?.inStock
                    ? "In Stock"
                    : "Availability on request"}
                </p>

              </div>

            </div>

            <ArrowUpRight
              className="
                mt-1

                text-neutral-500

                transition-all

                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
                group-hover:text-white
              "
              size={22}
            />

          </div>

          <div className="h-px bg-white/8" />

          <p
            className="
              text-sm

              uppercase

              tracking-[0.25em]

              text-neutral-500

              transition-colors

              duration-300

              group-hover:text-neutral-300
            "
          >
            View Product Details
          </p>

        </div>
      </article>
    </Link>
  );
}