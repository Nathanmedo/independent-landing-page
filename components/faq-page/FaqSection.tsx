"use client";

import {
  Shirt,
  Printer,
  Building2,
  GraduationCap,
  Package,
  Factory,
  BadgeCheck,
  Layers3,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  {
    title: "Garment Branding",
    icon: Shirt,
  },
  {
    title: "Commercial Printing",
    icon: Printer,
  },
  {
    title: "Corporate Branding",
    icon: Building2,
  },
  {
    title: "Schools",
    icon: GraduationCap,
  },
  {
    title: "Print Resellers",
    icon: Package,
  },
  {
    title: "Manufacturing",
    icon: Factory,
  },
  {
    title: "Promotional Products",
    icon: BadgeCheck,
  },
  {
    title: "Large Format",
    icon: Layers3,
  },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`flex w-max gap-5 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {[...industries, ...industries].map((industry, index) => {
        const Icon = industry.icon;

        return (
          <div
            key={industry.title + index}
            className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <Icon
              size={18}
              className="text-neutral-400
        transition-all
        duration-300
        group-hover:rotate-6
        group-hover:text-white"
            />

            <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white">
              {industry.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function IndustriesSection() {

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


  return (
    <section className="overflow-hidden bg-primary/90 py-24">
      <motion.div
        className="mx-auto mb-14 max-w-4xl px-6 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.45em] text-neutral-200"
        >
          TRUSTED BY
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-5xl font-semibold leading-[1em] tracking-[-0.05em] text-white md:text-6xl"
        >
          Powering businesses
          <br />
          across industries.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400"
        >
          From startups to large production facilities, our materials, machinery
          and accessories support professionals across the printing industry.
        </motion.p>
      </motion.div>
      <div className="relative">
        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-primary/30 to-transparent" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-primary/30 to-transparent" />

        <MarqueeRow />

        <div className="h-6" />

        <MarqueeRow reverse />
      </div>
    </section>
  );
}
