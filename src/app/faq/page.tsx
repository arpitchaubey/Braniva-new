"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

type FAQ = {
    id: number;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
};

export default function FaqPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFaqId, setActiveFaqId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/faqs")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFaqs(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Filter FAQs by search query
    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group FAQs by category
    const categories = Array.from(new Set(filteredFaqs.map(faq => faq.category)));

    return (
        <motion.div 
            className="min-h-screen bg-[#0A0A0A] pt-28 md:pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-[#1ABC9C] font-bold tracking-widest uppercase text-xs mb-3 inline-block">Help Center</span>
                    <h1 className="text-4xl md:text-6xl font-bold font-sora text-white mb-6">Frequently Asked Questions</h1>
                    <p className="text-[#B0B0B0] max-w-xl mx-auto text-base md:text-lg">
                        Find answers to common questions about marketplace store setup, advertising logistics, and brand marketing.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-10 max-w-lg mx-auto relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#666]">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions or keywords..."
                            className="w-full bg-[#1A1A1A] border border-[#27272A] rounded-full pl-12 pr-6 py-4 text-base text-white focus:outline-none focus:border-[#1ABC9C] focus:scale-[1.01] transition-all shadow-lg"
                        />
                    </div>
                </motion.div>

                {loading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredFaqs.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border border-dashed border-[#27272A] rounded-3xl py-20 text-center text-[#B0B0B0]"
                    >
                        No matching questions found for &quot;{searchQuery}&quot;.
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        {categories.map(category => (
                            <motion.div 
                                key={category} 
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-xl font-bold font-sora text-[#1ABC9C] border-b border-[#27272A] pb-2 mb-6 uppercase tracking-wider text-xs">
                                    {category}
                                </h2>
                                <div className="space-y-4">
                                    {filteredFaqs
                                        .filter(faq => faq.category === category)
                                        .map(faq => {
                                            const isOpen = activeFaqId === faq.id;
                                            return (
                                                <motion.div
                                                    key={faq.id}
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                    className="border border-[#27272A] bg-[#1C1C1E] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#3F3F46]"
                                                >
                                                    <button
                                                        onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
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
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Support CTA */}
                <motion.div 
                    className="mt-20 p-6 sm:p-8 rounded-3xl bg-[#1A1A1A] border border-[#27272A] text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative z-10">
                        <motion.div 
                            className="inline-block mb-4"
                            whileHover={{ rotate: [0, -15, 15, -10, 0], scale: 1.25 }}
                            transition={{ duration: 0.5 }}
                        >
                            <HelpCircle className="w-10 h-10 text-[#1ABC9C] mx-auto" />
                        </motion.div>
                        <h3 className="text-xl font-bold font-sora text-white mb-2">Still have questions?</h3>
                        <p className="text-xs text-[#B0B0B0] mb-6 max-w-sm mx-auto">Can&apos;t find the answers you&apos;re looking for? Reach out directly and we&apos;ll reply shortly.</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-xs hover:bg-[#1dd3af] transition-all border border-[#1ABC9C]"
                            >
                                Get in Touch <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
