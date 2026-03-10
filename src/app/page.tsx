"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Globe, LineChart, Mail, MessageSquare, ShoppingCart, Target } from "lucide-react";

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
      <section className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          className="flex-1 flex flex-col items-start"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#1ABC9C]/30 text-[#1ABC9C] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-pulse"></span>
            Premium Digital Agency
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white font-sora leading-tight mb-6">
            From Launch to Scale We Handle Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ABC9C] to-[#0F3D3E]">Digital Growth</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-[#B0B0B0] mb-10 max-w-2xl leading-relaxed">
            We help brands launch, optimize, and grow their online presence while driving sales through strategic digital marketing.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Link href="/schedule" className="px-8 py-4 rounded-full bg-[#0F3D3E] text-white font-medium hover:bg-[#1ABC9C] transition-all shadow-[0_0_20px_rgba(26,188,156,0.2)] hover:shadow-[0_0_30px_rgba(26,188,156,0.4)]">
              Schedule a Free Call
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-full bg-[#1F1F1F] text-white font-medium hover:bg-[#2a2a2a] transition-all border border-[#333]">
              Start Your Project
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Dashboard Visual */}
        <motion.div
          className="flex-1 w-full relative h-[400px] lg:h-[500px] border border-[#1F1F1F] rounded-2xl bg-[#121212]/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D3E]/20 to-transparent"></div>
          {/* Dashboard Header */}
          <div className="h-12 border-b border-[#1F1F1F] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* Sales Card */}
            <motion.div
              className="bg-[#1F1F1F] rounded-xl p-5 border border-[#333] flex items-center justify-between"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div>
                <p className="text-sm text-[#B0B0B0] mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white font-sora">$124,500</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1ABC9C]/20 flex items-center justify-center">
                <LineChart className="text-[#1ABC9C]" />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-[#1F1F1F] rounded-xl p-4 border border-[#333]"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingCart className="text-white w-5 h-5" />
                  <span className="text-[#B0B0B0] text-sm">Amazon Sales</span>
                </div>
                <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1ABC9C] w-[75%]"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1F1F1F] rounded-xl p-4 border border-[#333]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-white w-5 h-5" />
                  <span className="text-[#B0B0B0] text-sm">Conversion</span>
                </div>
                <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1ABC9C] w-[88%]"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full bg-[#1F1F1F]/30 py-24 border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4">Our Services</h2>
            <p className="text-[#B0B0B0] max-w-2xl text-lg">We provide end-to-end solutions to establish, optimize, and scale your brand across digital channels.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={scrollContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { icon: <ShoppingCart />, title: "Marketplace Setup & Onboarding", desc: "Complete seller account setup and launch support for Amazon, Flipkart, and more." },
              { icon: <BarChart3 />, title: "Product Listing Optimization", desc: "SEO-optimized listings designed to improve search visibility and conversion rates." },
              { icon: <Mail />, title: "Email Marketing Automation", desc: "Strategic automated journeys that nurture leads and strengthen customer relationships." },
              { icon: <MessageSquare />, title: "WhatsApp Marketing Campaigns", desc: "Targeted broadcast promotions and automated messaging to improve retention." },
              { icon: <Globe />, title: "Website Design & Development", desc: "Custom business websites designed to improve credibility and convert visitors." },
              { icon: <LineChart />, title: "E-commerce Growth Strategy", desc: "Data-driven strategies to improve product visibility and accelerate sales." },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="group p-8 rounded-2xl bg-[#121212] border border-[#1F1F1F] hover:border-[#1ABC9C]/50 transition-colors"
                variants={scrollItemVariants}
              >
                <div className="w-14 h-14 rounded-xl bg-[#0F3D3E]/30 flex items-center justify-center text-[#1ABC9C] mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-sora">{service.title}</h3>
                <p className="text-[#B0B0B0] leading-relaxed">{service.desc}</p>
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
