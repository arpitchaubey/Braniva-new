"use client";

import { Trophy, Target, Zap, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
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
                <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">About Braniva</h1>
                <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
                    We are the growth architects for modern D2C and e-commerce brands, engineering success through precision execution.
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={scrollItemVariants}>
                    <h2 className="text-3xl font-bold text-white font-sora mb-6">Our Mission</h2>
                    <p className="text-[#B0B0B0] text-lg leading-relaxed mb-6">
                        Helping brands scale their e-commerce presence through marketplace expertise and automation-driven marketing. We believe that great products deserve great visibility.
                    </p>
                    <p className="text-[#B0B0B0] text-lg leading-relaxed">
                        At Braniva, we bridge the gap between a brand&apos;s potential and its actual digital footprint. We handle the technicalities of marketplace onboarding and the intricacies of customer retention engines so you can focus on building amazing products.
                    </p>
                </motion.div>
                <motion.div variants={scrollItemVariants} className="bg-[#1F1F1F]/50 rounded-3xl p-10 border border-[#333] flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white font-sora mb-6">Our Vision</h2>
                    <p className="text-white text-xl font-medium leading-relaxed">
                        "To become the definitive growth partner for aspiring e-commerce and D2C brands globally."
                    </p>
                </motion.div>
            </motion.div>

            <div className="mb-12">
                <motion.h2
                    className="text-3xl font-bold text-white font-sora mb-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Our Core Values
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={scrollContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {[
                        { icon: <Target />, title: "Precision", desc: "Data-driven decisions over guesswork." },
                        { icon: <Zap />, title: "Agility", desc: "Adapting swiftly to marketplace shifts." },
                        { icon: <Trophy />, title: "Excellence", desc: "Delivering results that exceed expectations." },
                        { icon: <Users />, title: "Partnership", desc: "Your growth is our growth." },
                    ].map((val, i) => (
                        <motion.div key={i} variants={scrollItemVariants} className="bg-[#121212] border border-[#1F1F1F] p-8 rounded-2xl hover:border-[#0F3D3E] transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-[#0F3D3E]/30 text-[#1ABC9C] flex items-center justify-center mb-6">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white font-sora mb-3">{val.title}</h3>
                            <p className="text-[#B0B0B0]">{val.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
