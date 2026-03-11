"use client";

import {
    Building2,
    LineChart,
    Mail,
    MessageSquare,
    ShoppingCart,
    MonitorSmartphone,
    Megaphone,
    Truck,
    Palette
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from 'next/link';
import { servicesData } from "@/data/servicesData";

export default function ServicesPage() {
    const scrollItemVariants: Variants = {
        hidden: { y: 50, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    const services = servicesData;

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">Our Services</h1>
                <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
                    Comprehensive digital solutions designed to establish, optimize, and scale your brand&apos;s online presence.
                </p>
            </div>

            <div className="flex flex-col gap-24">
                {services.map((svc, index) => (
                    <motion.section
                        key={svc.id}
                        id={svc.id}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                        variants={scrollItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex-1 flex justify-center">
                            <div className="w-48 h-48 rounded-full bg-[#1F1F1F] border-2 border-[#0F3D3E] flex items-center justify-center shadow-[0_0_50px_rgba(26,188,156,0.1)] relative">
                                <div className="absolute inset-0 rounded-full border border-[#1ABC9C]/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                                {svc.icon}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white font-sora mb-2">{svc.title}</h2>
                            <h3 className="text-xl text-[#1ABC9C] font-semibold mb-6">{svc.subtitle}</h3>
                            <p className="text-[#B0B0B0] mb-8 leading-relaxed text-lg">
                                {svc.detailedDescription?.[0] || ""}
                            </p>

                            <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-6">
                                <h4 className="text-white font-bold mb-4">What&apos;s Included:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {svc.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[#B0B0B0]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C]"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8">
                                <Link
                                    href={`/services/${svc.id}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F1F1F] text-white hover:bg-[#1ABC9C] hover:text-[#0a0a0a] transition-colors border border-[#333] hover:border-[#1ABC9C] font-semibold"
                                >
                                    Learn More Details
                                </Link>
                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
}
