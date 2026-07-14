"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/wix-api/constants";

const MESSAGE = "Hello Independent Chemicals.NIG,\nI'm interested in your printing materials and would like to make an enquiry. Please share more information about your products and pricing. \nThank you.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1200);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    MESSAGE
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 16,
            scale: 0.96,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            bottom-8
            right-8
            z-50

            flex
            items-center
            gap-3

            rounded-full

            border
            border-white/10

            bg-[#25D366]

            px-5
            py-4

            text-white

            shadow-xl

            backdrop-blur-xl

            transition-colors

            hover:bg-[#20BD5A]
          "
        >
          <MessageCircle size={20} />

          <span className="hidden font-medium sm:block">
            Make an Order
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}