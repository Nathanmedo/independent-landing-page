import { easeInOut, motion } from "framer-motion";
import { ProductCategory } from "./product-page/types";
import Link from "next/link";

interface HeroContentProps {
  collections: ProductCategory[];
}

export default function HeroContent({ collections }: HeroContentProps) {
  return (
    <main className=" flex flex-col justify-center ">
      <div className="max-w-7xl">
        <p className="mb-6 mt-10 text-sm uppercase tracking-[0.45em] text-neutral-500">
          Independent Chemicals.NIG
        </p>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[0.9] tracking-[-0.06em] text-white md:text-8xl xl:text-[9rem]">
          Everything
          <br />
          your print
          <br />
          business needs.
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
          Premium printing materials, machines and accessories trusted by
          professionals across Nigeria.
        </p>

        <div className="mt-14 flex flex-wrap gap-5">
          <button className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-105">
            Explore Products
          </button>

          <button className="rounded-full border border-neutral-700 px-8 py-4 text-sm text-white transition hover:border-white">
            Request Quote
          </button>
        </div>
      </div>

      <div className="md:my-20 my-15 flex flex-wrap gap-5 text-sm uppercase tracking-[0.1em] text-neutral-500">
        {collections.map((collection, index) => {
          const productName = collection?.name?.split("-");
          return (
            <Link
              className="hover:text-neutral-200 hover:underline transition-all duration-150"
              href={`/collections/${collection?.slug}`}
              key={index}
            >
              {productName[0]}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
