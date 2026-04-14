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
    <div className="w-full mt-12 lg:px-12 px-4 bg-primary py-12">
      <h1 className="text-5xl mb-4 md:text-6xl space-x-1 md:leading-16 tracking-tight instrument not-italic text-center w-full flex justify-center items-center font-light text-white">
        <span>Our</span>
        <span className="font-medium text-primary-foreground italic instrument">
          Products
          <motion.div
            className="origin-left h-[4px] bg-primary-foreground w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          ></motion.div>
        </span>
      </h1>

      <BentoGrid className="max-w-4xl mx-auto">
        {useCollections.map((collection, index) => (
          <div
            className={`${
              index === 3 || index === 6 ? "col-span-2 lg:col-span-3" : ""
            } overflow-hidden relative `}
          >
            <BentoGridItem
              key={index}
              className="h-full"
              header={
                <img
                  src={collection?.media?.mainMedia?.image?.url}
                  className="h-[100%] object-cover"
                  onError={() => <Skeleton />}
                />
              }
            />
            <span className="absolute left-6 top-4 font-semibold text-secondary mix-blend-difference">
              {collection.name}
            </span>
          </div>
        ))}
      </BentoGrid>
    </div>
  );
}

export default ProductSection;

function productLoadingSkeleton({}) {
  return (
    <>
      {Array.from({length: 6}, (_, index)=>(
        <div
        className={`${
          index === 3 || index === 6 ? "col-span-2 lg:col-span-3" : ""
        } overflow-hidden h-[100%]`}
      >
        <BentoGridItem
          key={index}
          header={
            <Skeleton className="h-12" />
          }
        />
        {/* <span className="absolute bottom-2 left-2 text-primary">
          {collection.name}
        </span> */}
      </div>
      ))}
    </>
  );
}
