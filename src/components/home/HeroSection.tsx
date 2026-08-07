"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("@/components/backgrounds/ColorBends"), { ssr: false });

const cycleWords = ["Brands", "Stores", "Revenue"];

export default function HeroSection() {
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-16 lg:pt-56 lg:pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[#0A0A0A]"
        initial={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ColorBends
          colors={["#1ABC9C", "#0F3D3E", "#16A085", "#0F2027"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={0.9}
          mouseInfluence={1}
          noise={0.1}
          parallax={0.5}
          iterations={1}
          intensity={1.1}
          bandWidth={6}
          transparent
          className="absolute inset-0 z-0 opacity-45 pointer-events-none"
        />
        {/* Fluid Bottom Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none z-10"></div>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white font-sora leading-[1.12] mb-6 md:mb-8 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span>Build </span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={cycleIndex}
              className="inline-block text-[#1ABC9C]"
              initial={{ opacity: 0, y: 40, rotateX: -90, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, rotateX: 90, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {cycleWords[cycleIndex]}
            </motion.span>
          </AnimatePresence>
          <span>.</span>
          <br />
          <span>Scale Businesses. Drive Growth.</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-[#D4D4D8] max-w-3xl mb-10 font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Braniva is a full-service branding, Shopify development, UI/UX design, CRO, and digital marketing agency helping startups and established businesses increase conversions, grow revenue, and build memorable brands.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link href="/schedule" className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-base hover:bg-[#1dd3af] transition-all border border-[#1ABC9C] flex items-center justify-center gap-2 group shadow-lg shadow-[#1ABC9C]/20">
              Let&apos;s Get You Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link href="/#gallery" className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#2D2D2D] bg-[#1F1F1F] text-white font-medium text-base hover:bg-[#2A2A2A] hover:border-[#3D3D3F] transition-all flex items-center justify-center group">
              See How We&apos;ve Helped Others
            </Link>
          </motion.div>
        </motion.div>

        {/* Social Proof Trust Bar */}
        <motion.div
          className="flex items-center gap-3 pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=aman" alt="Founder 1" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=vikram" alt="Founder 2" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=amit" alt="Founder 3" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=arpit" alt="Founder 4" />
          </div>
          <div className="text-left flex items-center gap-2 text-xs">
            <span className="text-[#1ABC9C] font-bold">★★★★★</span>
            <span className="text-[#A1A1AA]">Trusted by 50+ D2C Founders & Sellers</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
