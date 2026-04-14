import { Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent text-accent-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex   h-12  justify-center">
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ repeat: Infinity, repeatDelay: 10 }}
              className="w-32 h-16 flex items-center justify-center"
            >
              {/* Placeholder logo - replace with your actual logo */}
              <motion.img
                src="/images/icn-logo.jpg"
                alt="Logo"
                className="w-24 h-24 object-cover rounded-full transform translate-x-[200px]"
                animate={{
                  x: [0, 0, 0, 0, 0, 0, 0, -200],
                  rotate: [0, 45, 360, 90, 270, 0],
                  scale: [1, 1.2, 1, 0.8, 1],
                  borderRadius: [0, 10, 40, 0, 50, 0],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1, ease: "easeOut", delay: 5 }}
              className="ml-4"
            >
              <p className="text-2xl font-semibold text-primary instrument italic">
                Building the future, one step at a time.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:underline transition-all duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/offerings"
                  className="hover:underline transition-all duration-200"
                >
                  Offerings
                </a>
              </li>
              <li>
                <a
                  href="/articles"
                  className="hover:underline transition-all duration-200"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="hover:underline transition-all duration-200"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline transition-all duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all duration-200 flex items-center gap-2"
                >
                  <Instagram size={20} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all duration-200 flex items-center gap-2"
                >
                  <Twitter size={20} />X
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all duration-200"
                >
                  Medium
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-background py-4">
        <p className="text-center text-foreground text-sm">
          © {currentYear} ICN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
