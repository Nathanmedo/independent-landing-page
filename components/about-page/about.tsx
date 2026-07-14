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
      staggerChildren: 0.12,
    },
  },
};

export default function AboutSection() {
  return (
    <main className="bg-primary/90 px-6 py-40">

      <motion.div
        className="max-w-6xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.p
          variants={fadeUp}
          className="mb-8 text-xs uppercase tracking-[0.45em] text-neutral-500"
        >
          WHY PROFESSIONALS TRUST US
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="max-w-5xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-8xl xl:text-[8rem]"
        >
          Two decades.
          <br />
          One reputation.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-2xl text-xl leading-relaxed text-neutral-400"
        >
          Nearly twenty years of supplying premium printing materials,
          machinery and accessories to businesses across Nigeria,
          West Africa and beyond.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-32 grid gap-16 md:grid-cols-2 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          {
            number: "20+",
            text: "Years of experience serving the printing industry.",
          },
          {
            number: "10K+",
            text: "Happy customers who trust our products.",
          },
          {
            number: "15+",
            text: "Countries reached through loyal customers and distributors.",
          },
          {
            number: "100%",
            text: "Genuine products from trusted manufacturers.",
          },
        ].map((item) => (
          <motion.div
            key={item.number}
            variants={fadeUp}
            className="group"
          >
            <h3 className="text-6xl font-semibold tracking-[-0.05em] text-white transition-colors duration-300 group-hover:text-neutral-300">
              {item.number}
            </h3>

            <p className="mt-4 text-neutral-400">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </main>
  );
}