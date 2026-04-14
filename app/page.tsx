"use client"

import AboutSection from "@/components/about-page/about"
import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import ProductSection from "@/components/product-page/product"
import FAQSection from "@/components/faq-page/FaqSection"
import ContactForm from "@/components/contact-page/ContactForm"
import Footer from "@/components/footer/footer"
import { Toaster } from "sonner"

export default function ShaderShowcase() {
  return (
    <main>
      <section id="hero">
          <div className="min-h-screen relative overflow-hidden bg-animated-gradient">
            <Header />
            <HeroContent />
          </div>
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="products">
        <ProductSection />
      </section>
      <section id="Faqs">
        <FAQSection />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <section id="footer">
        <Footer />
      </section>
      <Toaster position="bottom-right" />
    </main>
  )
}
