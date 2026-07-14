"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PHONE_NUMBER } from "@/lib/wix-api/constants";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const MESSAGE = "I want to make an order.";

const links = [
  { label: "Products", link: "#products" },
  { label: "About", link: "#about" },
  { label: "Contact", link: "#contact" },
  {
    label: "WhatsApp",
    link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`,
  },
  {label: "Instagram", link:"https://www.instagram.com/independentchemicals.ng"},
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-primary">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col justify-between gap-20 px-6 py-24 md:flex-row"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.45em] text-neutral-200">
            Independent Chemicals.NIG
          </p>

          <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
            Everything
            <br />
            your print
            <br />
            business needs.
          </h2>

          <p className="mt-8 max-w-md text-lg text-neutral-400">
            Premium printing materials, machinery and accessories trusted by
            professionals for nearly two decades.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-5">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className="group flex justify-start items-center gap-2 text-lg text-neutral-400 transition hover:text-white"
            >
              {link.label}

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-8 text-sm text-neutral-200 md:flex-row">
          <p>© {year} Independent Chemicals.NIG. All rights reserved.</p>

          <p>Trusted across Nigeria, West Africa and beyond.</p>
        </div>
      </div>
    </footer>
  );
}
