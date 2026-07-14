"use client";

import React, { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { motion } from "framer-motion";
import { div, image } from "framer-motion/client";
import { getWixClient } from "@/lib/wix.base";
import { getAllCollections } from "@/lib/wix-api/collections";
import { wixBrowserClient } from "@/lib/wix-api/wix.browser";
import { collections } from "@wix/stores";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Skeleton } from "../ui/skeleton";
import { ArrowRight } from "lucide-react";

function ProductSection() {
  const [active, setUseActive] = useState("");
  const [useCollections, SetUseCollections] = useState<any[]>([]);

  const tabs = [
    {
      image: "/images/icn-logo.jpg",
      label: "Geometric Power",
      value: "geometric",
      description:
        "Outstanding performance across all our mining operations. The reliability has exceeded expectations.",
    },
    {
      image: "/images/icn-logo.jpg",
      label: "Transition Minerals International",
      value: "transition",
      description:
        "Game-changing technology for our mineral exploration projects. Highly recommended.",
    },
    {
      image: "/images/icn-logo.jpg",
      label: "GEM Solutions",
      value: "gem",
      description:
        "We won a $500k contract to export 70 Archer drones to Ghana to protect their farms.",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const wixClient = wixBrowserClient;
      console.log(wixClient);
      const collections = await getAllCollections(wixClient);
      console.log("Collections:", collections);
      SetUseCollections(collections);
      setUseActive(collections[0]?.slug || "");
    };
    fetchData();
  }, []);
  if (!useCollections) {
    return <div>Loading...</div>;
  }
  return (

    <main className="overflow-hidden">
      {/* INKS */}

      {useCollections.map((collection, index) => (
        <div
          key={index}
          className="group h-[400px] relative overflow-hidden cursor-pointer bg-primary/95"
        >
          <img
            src={collection?.media?.mainMedia?.image?.url}
            className=" object-cover h-fit opacity-10 group-hover:opacity-25 duration-150 w-full transition-all"
            onError={() => <Skeleton />}
          />
          <div className="absolute left-6 top-6 w-[90%]">
            <p className=" text-xs  uppercase tracking-[0.5em] text-neutral-500 group-hover:text-white">
              0{index + 1}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-7xl font-semibold tracking-[-0.06em] text-neutral-500 group-hover:text-white transition duration-500 group-hover:translate-x-4 md:text-[10rem]">
                  {collection.name}
                </h2>
                <p className="mt-8 max-w-lg text-xl leading-relaxed text-neutral-400">
                  DTF, Eco Solvent, Sublimation, Screen Printing and Textile
                  inks engineered for vibrant, consistent and professional
                  results.
                </p>
              </div>
              <span className="text-5xl text-neutral-600 transition duration-500 group-hover:translate-x-5 group-hover:text-white">
                <ArrowRight />
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="group cursor-pointer bg-primary/80 py-3 px-4">
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-neutral-500 group-hover:text-white">
          04
        </p>

        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-7xl font-semibold tracking-[-0.06em] text-neutral-500 group-hover:text-white transition duration-500 group-hover:translate-x-4 md:text-[10rem]">
              HTV
            </h2>

            <p className="mt-8 max-w-lg text-xl leading-relaxed text-neutral-400">
              Standard, Glitter, Reflective, Metallic, Flock and Specialty Heat
              Transfer Vinyl for premium garment decoration.
            </p>
          </div>

          <div className="text-5xl text-neutral-600 transition duration-500 group-hover:translate-x-5 group-hover:text-white">
            <span className=" uppercase tracking-[0.5px] group-hover:text-white">
              SEE MORE
            </span>
            <ArrowRight />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductSection;

function productLoadingSkeleton({}) {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          className={`${
            index === 3 || index === 6 ? "col-span-2 lg:col-span-3" : ""
          } overflow-hidden h-[100%]`}
        >
          <BentoGridItem key={index} header={<Skeleton className="h-12" />} />
          {/* <span className="absolute bottom-2 left-2 text-primary">
          {collection.name}
        </span> */}
        </div>
      ))}
    </>
  );
}
