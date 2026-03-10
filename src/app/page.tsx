"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Globe, LineChart, Mail, MessageSquare, ShoppingCart, Target, Megaphone, Truck, Palette } from "lucide-react";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const scrollContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const scrollItemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32 border-b border-[#1F1F1F]">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle noise overlay for texture */}
          <div className="absolute inset-0 bg-[#0a0a0c] z-0"></div>

          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#1ABC9C]/15 rounded-full blur-[120px] mix-blend-screen"
            animate={{
              x: [0, 100, 0, -100, 0],
              y: [0, 50, 100, -50, 0],
              scale: [1, 1.2, 0.8, 1.1, 1]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-[#0F3D3E]/40 rounded-full blur-[120px] mix-blend-screen"
            animate={{
              x: [0, -120, 0, 80, 0],
              y: [0, -80, 60, 20, 0],
              scale: [1, 0.9, 1.3, 0.9, 1]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Spotlight */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#1ABC9C]/5 rounded-full blur-[150px] opacity-80"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Perspective Grid Lines */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '4rem 4rem',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, #000 20%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, #000 20%, transparent 100%)'
            }}
          ></div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#E4E4E7] text-xs md:text-sm font-medium tracking-wide mb-8 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ABC9C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1ABC9C]"></span>
            </span>
            Premium Digital Growth Agency
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-sora leading-[1.1] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Scale Your Brand <br className="hidden md:block" />
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-[#1ABC9C]/20 to-[#0F3D3E]/20 blur-xl"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-[#1ABC9C] to-[#0F3D3E]">Beyond Limits</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#A1A1AA] mb-12 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We partner with ambitious founders to engineer explosive growth. From high-converting websites to data-driven marketing domination.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/schedule" className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-lg hover:bg-[#1dd3af] transition-all shadow-[0_0_20px_rgba(26,188,156,0.2)] hover:shadow-[0_0_40px_rgba(26,188,156,0.4)] flex items-center justify-center gap-3 group">
              Schedule Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center group">
              Explore Our Services
            </Link>
          </motion.div>

          {/* Social Proof / Trusted By */}
          <motion.div
            className="mt-24 pt-10 w-full max-w-4xl relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent -z-10"></div>
            <p className="text-xs text-[#888] font-bold mb-8 uppercase tracking-[0.2em] inline-block bg-[#0a0a0c] px-6">
              Delivering Results Across Platforms
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-2xl font-bold font-sora tracking-tighter">amazon</span>
              <span className="text-2xl font-bold font-sora tracking-tight">Flipkart<span className="text-[#FFC200]">.</span></span>
              <span className="text-2xl font-extrabold font-sora text-[#95bf47]">shopify</span>
              <span className="text-2xl font-bold font-sora tracking-tighter text-[#0668E1]">Meta</span>
              <span className="text-2xl font-bold font-sora text-[#4285F4]">Google</span>
            </div>
          </motion.div>
        </div>
      </section>
      {/* SERVICES SECTION */}
      <section className="w-full bg-[#1F1F1F]/30 py-24 border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4">Our Services</h2>
            <p className="text-[#B0B0B0] max-w-2xl text-lg">We provide end-to-end solutions to establish, optimize, and scale your brand across digital channels.</p>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={scrollContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { id: "marketplace", icon: <ShoppingCart />, title: "Marketplace Setup & Onboarding", desc: "Complete seller account setup and launch support for Amazon, Flipkart, Nykaa, Ajio, Tata Cliq, Aza, Pernia, Sverve, and more." },
              { id: "marketing", icon: <Megaphone />, title: "Marketing Strategy", desc: "Comprehensive campaigns across Google Ads, Meta Ads, Performance Marketing, and Influencer channels." },
              { id: "logistics", icon: <Truck />, title: "Logistics Onboarding", desc: "Seamless shipping integration with top partners like DTDC, Shiprocket, and Delhivery." },
              { id: "listing", icon: <BarChart3 />, title: "Product Listing Optimization", desc: "SEO-optimized listings designed to improve search visibility and conversion rates." },
              { id: "email", icon: <Mail />, title: "Email Marketing Automation", desc: "Strategic automated journeys that nurture leads and strengthen customer relationships." },
              { id: "whatsapp", icon: <MessageSquare />, title: "WhatsApp Marketing Campaigns", desc: "Targeted broadcast promotions and automated messaging to improve retention." },
              { id: "web", icon: <Globe />, title: "Website Design & Development", desc: "Custom business websites designed to improve credibility and convert visitors." },
              { id: "brand-identity", icon: <Palette />, title: "Brand Identity", desc: "Crafting memorable visual identities and guidelines that resonate with your target audience and stand out in the market." },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative p-8 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-white/5 hover:border-[#1ABC9C]/30 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(26,188,156,0.2)]"
                variants={scrollItemVariants}
              >
                <Link href={`/services#${service.id}`} className="absolute inset-0 z-20"></Link>
                {/* Highlight Glow from Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#1ABC9C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 w-16 h-16 rounded-xl bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 flex items-center justify-center text-[#1ABC9C] mb-6 group-hover:scale-110 group-hover:bg-[#1ABC9C]/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1ABC9C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  {service.icon}
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-3 font-sora tracking-tight">{service.title}</h3>
                <p className="relative z-10 text-[#A1A1AA] leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4">Our Process</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg">A structured approach to guarantee measurable growth.</p>
        </div>

        <motion.div
          className="relative"
          variants={scrollContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#1F1F1F] md:-translate-x-1/2"></div>

          {[
            { num: "1", title: "Business Consultation", desc: "We understand your brand, products, and marketplace goals." },
            { num: "2", title: "Marketplace Setup", desc: "We configure your seller accounts and product catalog." },
            { num: "3", title: "Product Listing Optimization", desc: "We create SEO optimized listings." },
            { num: "4", title: "Marketing Launch", desc: "Email and WhatsApp campaigns start." },
            { num: "5", title: "Sales Growth & Analytics", desc: "We monitor performance and optimize." }
          ].map((step, i) => (
            <motion.div
              key={i}
              className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              variants={scrollItemVariants}
            >
              <div className={`ml-12 md:ml-0 md:w-1/2 p-6 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <h3 className="text-2xl font-bold text-white font-sora mb-2">{step.title}</h3>
                <p className="text-[#B0B0B0]">{step.desc}</p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-[#0F3D3E] border-2 border-[#1ABC9C] md:-translate-x-1/2 flex items-center justify-center text-white text-sm font-bold z-10 shadow-[0_0_10px_rgba(26,188,156,0.5)]">
                {step.num}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RESULTS SECTION */}
      <section className="w-full bg-[#1ABC9C] py-20 text-[#0F3D3E]">
        <motion.div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={scrollContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={scrollItemVariants} className="p-6">
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-2">3x</h3>
            <p className="text-xl font-bold opacity-80">Marketplace Sales Growth</p>
          </motion.div>
          <motion.div variants={scrollItemVariants} className="p-6 border-y md:border-y-0 md:border-x border-[#0F3D3E]/20">
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-2">40%</h3>
            <p className="text-xl font-bold opacity-80">Higher Conversion Rates</p>
          </motion.div>
          <motion.div variants={scrollItemVariants} className="p-6">
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-2">30%</h3>
            <p className="text-xl font-bold opacity-80">More Returning Customers</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          className="bg-gradient-to-br from-[#1F1F1F] to-[#121212] border border-[#333] p-12 lg:p-20 rounded-3xl relative overflow-hidden"
          variants={scrollItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ABC9C] rounded-full blur-[100px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F3D3E] rounded-full blur-[100px] opacity-20"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-sora mb-6 relative z-10">Ready to Grow Your Brand?</h2>
          <p className="text-xl text-[#B0B0B0] mb-10 max-w-2xl mx-auto relative z-10">Join the successful brands that trust Braniva to scale their marketplace presence and marketing.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link href="/schedule" className="px-8 py-4 rounded-full bg-[#1ABC9C] text-[#0F3D3E] font-bold hover:bg-[#159a80] transition-all border-none">
              Schedule Consultation
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-full bg-transparent text-white font-medium hover:bg-[#1F1F1F] transition-all border border-[#333]">
              Send Enquiry
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
