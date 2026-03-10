"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function CaseStudiesPage() {
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

    const caseStudies = [
        {
            client: "Fashion Accessories Brand",
            industry: "Apparel & E-commerce",
            challenge: "The brand suffered from low marketplace visibility, generic listings, and poor conversion rates compared to competitors.",
            solution: "We performed a complete overhaul of their Amazon and Flipkart listings, injecting high-volume keywords, optimizing A+ content, and automating their email retention campaigns.",
            result: "Achieved 3x sales growth within 3 months and increased returning customer rate by 30%.",
            metrics: ["3x Sales", "30% Retained", "Top 10 Category"]
        },
        {
            client: "D2C Skincare Startup",
            industry: "Beauty & Personal Care",
            challenge: "High cart abandonment rates and low return-on-ad-spend (ROAS) hindering scalability.",
            solution: "Implemented a robust WhatsApp and Email marketing automation funnel targeting abandoned carts and upselling complementary products to existing customers.",
            result: "Recovered 25% of abandoned carts, directly adding 40% higher baseline monthly revenue.",
            metrics: ["25% Recovery", "40% Rev Growth", "2.5x ROAS"]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">Our Results</h1>
                <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
                    Real impact. Real scalable growth. See how we&apos;ve helped brands transform their marketplace performance.
                </p>
            </motion.div>

            <motion.div
                className="grid gap-12"
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {caseStudies.map((study, idx) => (
                    <motion.div
                        key={idx}
                        variants={scrollItemVariants}
                        className="bg-[#1F1F1F]/40 border border-[#1F1F1F] rounded-3xl p-8 lg:p-12 hover:border-[#0F3D3E] transition-all"
                    >
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#333] text-[#1ABC9C] text-sm font-medium mb-6">
                                    {study.industry}
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white font-sora mb-6">{study.client}</h2>
                                <div className="flex flex-wrap gap-3">
                                    {study.metrics.map((metric, i) => (
                                        <span key={i} className="px-4 py-2 rounded-lg bg-[#0F3D3E]/30 text-white font-semibold text-sm border border-[#0F3D3E]">
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-[#B0B0B0] font-medium mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Challenge
                                    </h4>
                                    <p className="text-white leading-relaxed">{study.challenge}</p>
                                </div>
                                <div>
                                    <h4 className="text-[#B0B0B0] font-medium mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#1ABC9C] rounded-full"></span> Solution
                                    </h4>
                                    <p className="text-white leading-relaxed">{study.solution}</p>
                                </div>
                                <div className="md:col-span-2 bg-[#121212] p-6 rounded-xl border border-[#333]">
                                    <h4 className="text-[#1ABC9C] font-bold mb-2">The Result</h4>
                                    <p className="text-white text-lg">{study.result}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <Link href="/contact" className="inline-flex items-center gap-3 text-white font-bold hover:text-[#1ABC9C] transition-colors text-lg">
                    Ready to be our next success story? Contact Us <ArrowUpRight className="w-5 h-5" />
                </Link>
            </motion.div>
        </div>
    );
}
