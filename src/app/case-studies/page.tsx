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
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div
                    variants={scrollItemVariants}
                    className="bg-[#1A1A1A] border border-[#333] rounded-3xl p-8 lg:p-12 shadow-xl"
                >
                    <div className="mb-12 border-b border-[#333] pb-10">
                        <span className="text-[#1ABC9C] font-semibold text-sm tracking-wider uppercase mb-4 block">
                            Manufacturing & E-commerce
                        </span>

                        <h2 className="text-3xl lg:text-5xl font-bold text-white font-sora mb-10 leading-tight">Case Study: A.K Industries</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                            <div className="bg-[#121212] p-8 rounded-xl border border-[#333] h-full">
                                <h3 className="text-xl font-bold text-white mb-4">Client Overview</h3>
                                <p className="text-[#B0B0B0] leading-relaxed text-lg">
                                    A.K Industries is a manufacturing company seeking to expand its product reach by entering major e-commerce marketplaces. Their objective was to successfully launch and position their product across leading online platforms in India.
                                </p>
                            </div>
                            <div className="bg-[#121212] p-8 rounded-xl border border-[#333] h-full">
                                <h3 className="text-xl font-bold text-white mb-4">The Challenge</h3>
                                <p className="text-[#B0B0B0] leading-relaxed text-lg">
                                    The client wanted to begin selling on platforms such as Amazon, Flipkart, and Meesho but required guidance and execution support for the entire process from product validation to marketplace onboarding and listing optimization.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-14">
                        <h3 className="text-2xl font-bold text-white font-sora mb-8 pb-4 border-b border-[#333]">Our Approach</h3>

                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-1/3 shrink-0">
                                    <h4 className="text-white font-semibold flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                        Product Validation
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-[#B0B0B0] leading-relaxed">We first evaluated the product&apos;s quality and assessed its suitability for online marketplaces. This included verifying whether the product met platform standards and had competitive potential in the market.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-1/3 shrink-0">
                                    <h4 className="text-white font-semibold flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                        Marketplace Preparation
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-[#B0B0B0] leading-relaxed">A structured product data sheet was developed, including specifications, descriptions, and key attributes required for marketplace listings.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-1/3 shrink-0">
                                    <h4 className="text-white font-semibold flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                        Image Enhancement
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-[#B0B0B0] leading-relaxed">Since the original product photos were not optimized for e-commerce, our team enhanced them using AI tools and professional editing software to create high-quality, marketplace-ready visuals.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-1/3 shrink-0">
                                    <h4 className="text-white font-semibold flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                        Platform Setup
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-[#B0B0B0] leading-relaxed">We handled the complete onboarding and seller account setup process across Amazon, Flipkart, and Meesho.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-1/3 shrink-0">
                                    <h4 className="text-white font-semibold flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] block"></span>
                                        Listing Optimization
                                    </h4>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-[#B0B0B0] leading-relaxed">The product listings were created with optimized titles, descriptions, keywords, and images to improve discoverability and conversion potential.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#121212] p-8 md:p-10 rounded-2xl border-l-4 border-[#1ABC9C]">
                        <h4 className="text-white font-bold text-2xl mb-4">Outcome</h4>
                        <p className="text-[#B0B0B0] text-lg leading-relaxed">
                            The client was successfully onboarded across three major e-commerce platforms with fully optimized listings and professional product presentation, establishing a strong foundation for their online sales operations.
                        </p>
                    </div>
                </motion.div>
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
