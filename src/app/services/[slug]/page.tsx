"use client";

import { useParams, notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetailPage() {
    const { slug } = useParams();

    const service = servicesData.find((s) => s.id === slug);

    if (!service) {
        notFound();
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="w-full bg-[#0a0a0a] min-h-screen text-white pt-24 pb-16">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-6 mb-20 text-center relative">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1ABC9C] rounded-full blur-[120px] opacity-10 z-0 pointer-events-none"
                />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 flex flex-col items-center"
                >
                    <motion.div variants={itemVariants} className="w-20 h-20 rounded-2xl bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 flex items-center justify-center text-[#1ABC9C] mb-8">
                        {service.icon}
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-sora mb-6">
                        {service.title}
                    </motion.h1>
                    <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-[#1ABC9C] mb-8 font-medium max-w-3xl">
                        {service.subtitle}
                    </motion.h2>
                </motion.div>
            </section>

            {/* Main Content Grid */}
            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                {/* Left Column: Description & Benefits */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="flex flex-col gap-12"
                >
                    <div>
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold font-sora mb-6 border-b border-[#1ABC9C]/30 pb-4 inline-block">Overview</motion.h3>
                        <div className="space-y-4">
                            {service.detailedDescription.map((para, i) => (
                                <motion.p variants={itemVariants} key={i} className="text-[#B0B0B0] text-lg leading-relaxed">
                                    {para}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold font-sora mb-6 border-b border-[#1ABC9C]/30 pb-4 inline-block">Key Benefits</motion.h3>
                        <ul className="space-y-4">
                            {service.benefits.map((benefit, i) => (
                                <motion.li variants={itemVariants} key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-[#1ABC9C] flex-shrink-0 mt-0.5" />
                                    <span className="text-[#E4E4E7] text-lg">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Right Column: Process/Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <div className="bg-[#121212] border border-[#1F1F1F] rounded-3xl p-8 sticky top-24">
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold font-sora mb-8 text-white">Our Process</motion.h3>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1ABC9C]/30 before:to-transparent">
                            {service.process.map((step, i) => (
                                <motion.div variants={itemVariants} key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-[#0A0A0A] group-[.is-active]:bg-[#1ABC9C] text-[#0A0A0A] group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                                        <span className="text-xs font-bold">{i + 1}</span>
                                    </div>

                                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-[#1A1A1A] p-4 rounded-xl border border-white/5 hover:border-[#1ABC9C]/30 transition-colors">
                                        <h4 className="font-bold text-white mb-1">{step.title}</h4>
                                        <p className="text-sm text-[#A1A1AA]">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#0F3D3E] to-[#121212] rounded-3xl p-12 border border-[#1ABC9C]/30 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#1ABC9C] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                    <h2 className="text-3xl font-bold font-sora mb-4 text-white relative z-10">Ready to accelerate your growth?</h2>
                    <p className="text-[#B0B0B0] mb-8 text-lg relative z-10">Schedule a free strategy call today to discuss how our {service.title} service can scale your brand.</p>
                    <Link
                        href="/schedule"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-lg hover:bg-[#1dd3af] transition-all shadow-[0_0_20px_rgba(26,188,156,0.2)] hover:shadow-[0_0_40px_rgba(26,188,156,0.4)] relative z-10 group"
                    >
                        Schedule Free Strategy Call
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
