"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";


export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Products", href: "#products" },
  { label: "Faqs", href: "#Faqs" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="relative  flex items-center justify-center p-6 z-[100]">
      <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 shadow-sm w-[95%] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ repeat: 0 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <motion.img
                animate={{
                  x: [0, 0, 0, 0, 0, 0, 0, 40],
                  rotate: [0, 45, 360, 90, 270, 0],
                  scale: [1, 1.2, 1, 0.8, 1],
                  borderRadius: [0, 20, 40, 0, 50],
                }}
                transition={{ duration: 5, ease: "easeInOut" }}
                src={"/images/icn-logo.jpg"}
                alt="Logo"
                className="rounded-full w-3/4 h-3/4"
              />
              <motion.div
                animate={{ opacity: [0, 1], x: [0, -20] }}
                transition={{ duration: 1, ease: "easeOut", delay: 5 }}
                className=" text-white/80 font-light instrument"
              >
                <p>ICN</p>
              </motion.div>
            </motion.div>
          </Link>
        </div>
        {/* Desktop Navigation (hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-2 mix-blend-difference">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile Hamburger (visible on small screens) */}
        <div className="md:hidden bg-white/10 backdrop-blur-md rounded-xl">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex items-center justify-center p-2 rounded-md text-white/90 bg-transparent hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
          >
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile side drawer + overlay */}
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!open}
          onClick={() => setOpen(false)}
        />

      </div>
        {/* Drawer panel */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white text-blue-600 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!open}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center"
            >
              <Image
                src={"/images/icn-logo.jpg"}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-2">
            {/* Keep font and sizing consistent with desktop nav */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-blue-600 text-xs font-light px-3 py-2 rounded transition-colors duration-150 hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
    </header>
  );
}
