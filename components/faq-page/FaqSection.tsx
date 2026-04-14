"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Filter out null refs
    const elements = itemRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (elements.length === 0) return;

    // GSAP stagger animation with ScrollTrigger (acts like IntersectionObserver)
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // 150ms delay between each item
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0], // Trigger when first element comes into view
          start: "top 80%", // Start when element is 80% down viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse", // play on enter, reverse on leave
          // markers: true, // Uncomment to see trigger points during development
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of housing solutions including property management, real estate consultation, and investment advisory services. Our team is dedicated to helping you find the perfect property or manage your existing assets effectively.",
    },
    {
      question: "How long does the process take?",
      answer:
        "The timeline varies depending on your specific needs. Typically, property searches take 2-4 weeks, while the complete transaction process can take 30-60 days. We work efficiently to ensure a smooth and timely experience.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "We offer flexible payment plans tailored to your needs. Initial consultations are free, and our service fees are transparently communicated upfront. We also provide various payment options including installment plans for eligible clients.",
    },
    {
      question: "Do you provide after-sales support?",
      answer:
        "Yes, absolutely! We pride ourselves on our comprehensive after-sales support. This includes property maintenance assistance, documentation help, and ongoing consultation for any questions or concerns you may have.",
    },
    {
      question: "How can I schedule a consultation?",
      answer:
        "You can schedule a consultation by filling out our contact form, calling our office directly, or sending us an email. We typically respond within 24 hours and will work with you to find a convenient time for your consultation."
    }
  ];

  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="max-w-3xs mx-auto mb-4">
          <h2 className="text-4xl md:text-5xl mb-2 text-primary font-bold tracking-tight instrument italic">
            Frequently Asked Questions
          </h2>
          <motion.div
            className="origin-left h-[4px] bg-primary w-full"
            initial={{ scaleX: 0 }}
            viewport={{ amount: 0.2 }}
            whileInView={{ scaleX: 1 }}
          ></motion.div>
        </div>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about our services
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full h-auto space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            value={`item-${index}`}
            className={`rounded-lg px-6  border-primary border-l-2 border-t-2 border-r-8 border-b-8`}
          >
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
