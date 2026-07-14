"use client";

import { useEffect, useState } from "react";
import { wixBrowserClient } from "@/lib/wix-api/wix.browser";
import { getAllCollections } from "@/lib/wix-api/collections";
import AboutSection from "@/components/about-page/about";
import Header from "@/components/header";
import HeroContent from "@/components/hero-content";
import { Toaster } from "sonner";
import ProductExperience from "@/components/product-page/ProductExperience";
import AboutSectionTwo from "@/components/about-page/aboutSection";
import { ProductCategory } from "@/components/product-page/types";
import IndustriesSection from "@/components/faq-page/FaqSection";
import Footer from "@/components/footer/footer";
import ContactSection from "@/components/contact-page/ContactSection";
import WhatsAppButton from "@/components/ui/whatsappButton";

export default function ShaderShowcase() {
  const [collections, setCollections] = useState<ProductCategory[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const wixClient = wixBrowserClient;
      const collections = await getAllCollections(wixClient);
      setCollections(collections);
      setActiveIndex(collections[0]?.slug || "");
    }
    load();
  }, []);

  return (
    <main>
      <section id="hero">
        <div className="min-h-screen py-3 relative overflow-hidden bg-animated-gradient px-6">
          <Header />
          <HeroContent collections={collections} />
        </div>
      </section>
      <section id="products">
        <ProductExperience
          collections={collections}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setCollections={setCollections}
        />
      </section>
      <section id="about">
        <AboutSection />
        <AboutSectionTwo />
      </section>
      <section id="Faqs">
        <IndustriesSection />
      </section>
      <section id="contact">
        <ContactSection/>
      </section>
      <section id="footer">
        <Footer />
      </section>
      <Toaster position="bottom-right" />
      <WhatsAppButton />
    </main>
  );
}
