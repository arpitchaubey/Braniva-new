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

    const services = [
        {
            id: "marketplace",
            title: "Marketplace Setup & Onboarding",
            subtitle: "Launch Your Brand on Amazon, Flipkart, Nykaa, Ajio, Tata Cliq, Aza, Pernia, Sverve and more.",
            description: "We help brands establish a strong presence on top e-commerce marketplaces through optimized listings and complete store setup.",
            features: ["Seller account setup", "Product catalog configuration", "Keyword optimization", "Platform-specific compliance"],
            icon: <ShoppingCart className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "marketing",
            title: "Marketing",
            subtitle: "Explosive Growth through Multi-Channel Campaigns",
            description: "Comprehensive marketing campaigns driving measurable ROI through targeted ad spend and influencer collaborations.",
            features: ["Google Ads", "Meta Ads", "Performance Marketing", "Influencer Marketing"],
            icon: <Megaphone className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "logistics",
            title: "Logistics Onboarding",
            subtitle: "Seamless Shipping and Fulfillment Integration",
            description: "We streamline your delivery operations by onboarding and integrating top-tier logistics providers for reliable shipping.",
            features: ["DTDC", "Xpressbees", "Shiprocket", "Delhivery"],
            icon: <Truck className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "listing",
            title: "Product Listing Optimization",
            subtitle: "SEO-Optimized Listings to Increase Visibility and Conversion Rates",
            description: "Professionally optimized product listings designed to improve marketplace search visibility, attract customers, and increase conversion rates.",
            features: ["A+ Content creation", "SEO Keyword research", "Competitor listing analysis", "Image enhancement guidelines"],
            icon: <LineChart className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "email",
            title: "Email Marketing Automation",
            subtitle: "Nurture Leads and Accelerate Repeat Purchases",
            description: "Strategic email campaigns and automated customer journeys that nurture leads, increase repeat purchases, and strengthen long-term customer relationships.",
            features: ["Welcome flow setup", "Cart abandonment recovery", "Post-purchase sequences", "Newsletter campaigns"],
            icon: <Mail className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "whatsapp",
            title: "WhatsApp Marketing Campaigns",
            subtitle: "Direct Engagement for Higher Conversions",
            description: "Direct customer engagement through targeted WhatsApp campaigns, broadcast promotions, and automated messaging to improve conversions and retention.",
            features: ["Broadcast promotions", "Order status updates", "Support automation", "Customer segmentation"],
            icon: <MessageSquare className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "web",
            title: "Website Design & Development",
            subtitle: "Custom E-commerce Websites that Convert",
            description: "Custom business websites designed to establish a strong online presence, improve credibility, and convert visitors into customers.",
            features: ["Shopify / Custom setup", "Conversion rate optimization", "Mobile-first design", "Speed optimization"],
            icon: <MonitorSmartphone className="w-12 h-12 text-[#1ABC9C]" />,
        },
        {
            id: "brand-identity",
            title: "Brand Identity",
            subtitle: "Crafting Memorable and Distinct Brand Experiences",
            description: "We develop cohesive visual identities, comprehensive brand guidelines, and compelling narratives that resonate with your target audience and differentiate you in the market.",
            features: ["Logo & Visual Identity", "Brand Guidelines", "Brand Positioning", "Marketing Collateral Design"],
            icon: <Palette className="w-12 h-12 text-[#1ABC9C]" />,
        }
    ];

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
                                {svc.description}
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
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
}
