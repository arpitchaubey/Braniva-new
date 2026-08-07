"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
};

export default function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <motion.section
      id="faq-section"
      className="w-full bg-[#0A0A0A] py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Questions Every First-Time Founder Asks</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sora">Questions every first-time founder asks us.</h2>
          <p className="text-[#B0B0B0] mt-4 text-sm">Honest answers. No agency spin.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <motion.div
                key={faq.id}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="border border-[#27272A] bg-[#1C1C1E] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#3F3F46]"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-bold text-white font-sora hover:text-[#1ABC9C] transition-colors cursor-pointer"
                >
                  <span className="text-sm md:text-base leading-snug">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center text-[#B0B0B0] transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 text-[#1ABC9C]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-3 text-[#D4D4D8] text-xs md:text-sm leading-relaxed border-t border-[#27272A] bg-[#121212]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1ABC9C] hover:text-[#1dd3af] transition-colors border-b border-[#1ABC9C]/30 pb-1"
          >
            View More FAQs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
