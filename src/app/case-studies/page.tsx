"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

type CaseStudy = {
    id: number;
    slug: string;
    title: string;
    category: string;
    overview: string;
    challenge: string;
    approach: string; // JSON string representing { title: string, description: string }[]
    outcome: string;
};

export default function CaseStudiesPage() {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/case-studies")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCaseStudies(data);
            })
            .catch(err => console.error("Error fetching case studies:", err))
            .finally(() => setLoading(false));
    }, []);

    const scrollContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const scrollItemVariants: Variants = {
        hidden: { y: 40, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    const parseApproach = (approachStr: string) => {
        try {
            return JSON.parse(approachStr);
        } catch {
            return [];
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">Our Results</h1>
                    <p className="text-[#B0B0B0] text-base md:text-lg max-w-2xl mx-auto">
                        Real impact. Real scalable growth. See how we&apos;ve helped brands transform their marketplace performance.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : caseStudies.length === 0 ? (
                    <div className="border border-dashed border-white/10 rounded-3xl py-20 text-center text-[#B0B0B0]">
                        No case studies found. Add one in the Admin Panel to display it here.
                    </div>
                ) : (
                    <motion.div
                        variants={scrollContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="space-y-16"
                    >
                        {caseStudies.map((study) => {
                            const approachSteps = parseApproach(study.approach);

                            return (
                                <motion.div
                                    key={study.id}
                                    variants={scrollItemVariants}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-[#121216] border border-white/10 rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl hover:border-[#1ABC9C]/40 transition-colors"
                                >
                                    <div className="mb-12 border-b border-white/5 pb-10">
                                        <span className="text-[#1ABC9C] font-semibold text-xs tracking-wider uppercase mb-4 block">
                                            {study.category}
                                        </span>
                                        <h2 className="text-2xl lg:text-4xl font-bold text-white font-sora mb-10 leading-tight">
                                            Case Study: {study.title}
                                        </h2>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                                            <div className="bg-[#0A0A0C] p-8 rounded-2xl border border-white/5 h-full">
                                                <h3 className="text-lg font-bold text-white mb-4">Client Overview</h3>
                                                <p className="text-[#B0B0B0] leading-relaxed text-sm">
                                                    {study.overview}
                                                </p>
                                            </div>
                                            <div className="bg-[#0A0A0C] p-8 rounded-2xl border border-white/5 h-full">
                                                <h3 className="text-lg font-bold text-white mb-4">The Challenge</h3>
                                                <p className="text-[#B0B0B0] leading-relaxed text-sm">
                                                    {study.challenge}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {approachSteps.length > 0 && (
                                        <div className="mb-14">
                                            <h3 className="text-xl font-bold text-white font-sora mb-8 pb-4 border-b border-white/5">
                                                Our Approach
                                            </h3>

                                            <div className="space-y-8">
                                                {approachSteps.map((step: { title: string; description: string }, index: number) => (
                                                    <div key={index} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                                        <div className="md:w-1/3 shrink-0">
                                                            <h4 className="text-white font-semibold flex items-center gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                                                {step.title}
                                                            </h4>
                                                        </div>
                                                        <div className="md:w-2/3">
                                                            <p className="text-[#B0B0B0] text-sm leading-relaxed">
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-[#0A0A0C] p-8 md:p-10 rounded-3xl border-l-4 border-[#1ABC9C]">
                                        <h4 className="text-white font-bold text-xl mb-4">Outcome</h4>
                                        <p className="text-[#B0B0B0] text-sm leading-relaxed">
                                            {study.outcome}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href="/contact" className="inline-flex items-center gap-3 text-white font-bold hover:text-[#1ABC9C] transition-colors text-sm">
                        Ready to be our next success story? Contact Us <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
