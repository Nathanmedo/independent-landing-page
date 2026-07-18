"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";
import { PHONE_NUMBER, SUPPORT_EMAIL } from "@/lib/wix-api/constants";

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

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-primary/95 px-6 md:py-52 py-30">
      {/* subtle glow */}

      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-24 lg:grid-cols-[1fr_520px]">
          {/* LEFT */}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.45em] text-neutral-200"
            >
              CONTACT
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-8 text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-8xl"
            >
              Let's build
              <br />
              your next
              <br />
              print success.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-xl text-xl leading-relaxed text-neutral-400"
            >
              Whether you're starting a print business, expanding production or
              looking for a reliable supplier, our team is ready to help.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-20 space-y-8">
              {[
                "20+ Years of Industry Experience",
                "Trusted Across Africa & Beyond",
                "Premium Products Only",
                "Fast Nationwide Delivery",
                "Dedicated Customer Support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-5">
                  <div className="h-2 w-2 rounded-full bg-white" />

                  <p className="text-lg text-neutral-300">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            className=" border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm"
          >
            <ContactForm />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className=" grid gap-8 sm:grid-cols-2"
          >
            <a
              href="tel:+2348132876380"
              className="group flex items-start gap-4"
            >
              <div className="rounded-full border border-white/10 p-3 transition group-hover:border-white/30">
                <Phone className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Phone
                </p>

                <p className="mt-2 text-lg text-white">{PHONE_NUMBER}</p>
              </div>
            </a>

            <a
              href="mailto:info@independentchemicals.ng"
              className="group flex items-start gap-4"
            >
              <div className="rounded-full border border-white/10 p-3 transition group-hover:border-white/30">
                <Mail className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Email
                </p>

                <p className="mt-2 text-lg text-white">
                  {SUPPORT_EMAIL}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="rounded-full border border-white/10 p-3">
                <MapPin className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Visit Us
                </p>

                <p className="mt-2 text-neutral-300 leading-relaxed">
                  5, Ashabi Street,
                  <br />
                  Off Abiodun Street,
                  <br />
                  Mushin, Lagos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full border border-white/10 p-3">
                <Clock3 className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Business Hours
                </p>

                <p className="mt-2 text-neutral-300">
                  Mon – Sat
                  <br />
                  8:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
