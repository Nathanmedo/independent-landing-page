"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutSectionTwo() {
  return (
    <main className="bg-primary/85 px-6 md:py-52 py-30">

      <div className="grid md:gap-24 gap-20 lg:grid-cols-2">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.5em] text-neutral-200"
          >
            OUR REPUTATION
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-8 text-6xl font-semibold leading-none tracking-[-0.06em] text-white md:text-7xl"
          >
            We don't
            <br />
            chase trust.
            <br />
            We earned it.
          </motion.h2>
        </motion.div>

        <motion.div
          className="space-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {[
            "Trusted by print businesses across Nigeria for nearly two decades.",
            "Customers from Cameroon, Ghana, Togo, Benin and Brazil continue to source premium materials from us.",
            "Thousands of successful print businesses have grown using products supplied by Independent Chemicals.NIG.",
          ].map((text) => (
            <motion.div
              key={text}
              variants={fadeUp}
              className="group border-l border-neutral-500 md:pl-8 pl-4 transition-colors duration-300 hover:border-white"
            >
              <p className="md:text-2xl text-md leading-relaxed text-neutral-300 transition-colors duration-300 group-hover:text-white">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

    </main>
  );
}