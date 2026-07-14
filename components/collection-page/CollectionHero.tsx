"use client"

import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface CollectionHeroProps {
  collection: {
    name: string;
    description?: string | null;
    numberOfProducts?: number | null;
  };
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function CollectionHero({
  collection,
}: CollectionHeroProps) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl px-6 pt-24 md:pb-20 pb-10"
    >
      <div
        className="text-xs flex items-center gap-2 uppercase tracking-[0.45em] text-neutral-200"
      >

        <Link href="/">
        <ArrowLeftIcon className="text-sm" />
        </Link>
        <motion.span
        variants={fadeUp}>Collection</motion.span>
      </div>

      <motion.h1
        variants={fadeUp}
        className="mt-6 text-6xl font-semibold leading-[0.9] tracking-[-0.06em] text-white md:text-8xl"
      >
        {collection.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-2xl text-xl leading-relaxed text-neutral-200"
      >
        {collection.description ||
          "Explore premium products curated for professionals."}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-12 flex items-center gap-6"
      >
        <div className="h-px w-24 bg-white/80" />

        <span className="text-sm uppercase tracking-[0.3em] text-neutral-200">
          {collection.numberOfProducts ?? 0} Products
        </span>
      </motion.div>
    </motion.section>
  );
}