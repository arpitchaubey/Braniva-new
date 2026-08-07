"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { servicesData } from "@/data/servicesData";
import { galleryData, GalleryItem } from "@/data/galleryData";
import { blogsData, Blog } from "@/data/blogsData";
import { testimonialsData, Testimonial } from "@/data/testimonialsData";

import HeroSection from "@/components/home/HeroSection";
import { scrollContainerVariants, scrollItemVariants } from "@/components/home/variants";

// Granular code-splitting for heavy below-the-fold components
const FaqSection = dynamic(() => import("@/components/home/FaqSection"));
const GallerySection = dynamic(() => import("@/components/home/GallerySection"));

type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
};

const processSteps = [
  { num: "1", title: "Discovery Call", desc: "We listen first. Understand where you are, what you've already tried, and what outcome you actually need before suggesting anything." },
  { num: "2", title: "Scope & Roadmap", desc: "We define exactly what we're doing, in what order, and why. You'll know the plan before we touch a single deliverable." },
  { num: "3", title: "Research & Preparation", desc: "Strategy, competitor analysis, platform requirements, creative direction all done before execution begins. No rushing to market." },
  { num: "4", title: "Build & Execute", desc: "We do the work listings, campaigns, designs, integrations with regular check-ins so you're never left wondering what's happening." },
  { num: "5", title: "Launch & Review", desc: "Go live, monitor closely, and fix anything that needs fixing before it becomes a problem. The first 2 weeks after launch matter most." },
  { num: "6", title: "Optimise & Grow", desc: "We track what's working, cut what isn't, and build on real results not assumptions. Growth that compounds, not resets." }
];

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>(blogsData.slice(0, 3));
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(galleryData);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData);

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      })
      .catch(err => console.error(err));

    fetch("/api/faqs?limit=5")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setFaqs(data);
      })
      .catch(err => console.error(err));

    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryItems(data);
        }
      })
      .catch(err => console.error(err));

    fetch("/api/testimonials")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* HERO SECTION (Initial Viewport) */}
      <HeroSection />

      {/* SERVICES SECTION (Below Fold - Offscreen layout optimization) */}
      <motion.section
        className="w-full bg-[#0A0A0A] py-24 content-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Why Choose Us</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-sora mb-4">We know what breaks in a brand&apos;s first year.</h2>
            <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg">We&apos;re not a generic agency that dabbles in e-commerce. We work with founders who are starting from scratch and we understand the problems nobody warns you about before launch.</p>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={scrollContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative p-8 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-white/5 hover:border-[#1ABC9C] transition-all duration-500 overflow-hidden"
                variants={scrollItemVariants}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/services#${service.id}`} className="absolute inset-0 z-20" aria-label={`View details about our ${service.title} service`}></Link>
                {/* Highlight Glow from Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#1ABC9C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <motion.div
                  className="relative z-10 w-16 h-16 rounded-xl bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 flex items-center justify-center text-[#1ABC9C] mb-6 overflow-hidden"
                  whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1ABC9C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  {service.icon}
                </motion.div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-3 font-sora tracking-tight">{service.title}</h3>
                <p className="relative z-10 text-[#A1A1AA] leading-relaxed">{service.shortDesc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* PLATFORMS MARQUEE SECTION */}
      <motion.section
        className="w-full bg-[#0A0A0A] py-24 overflow-hidden content-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Platforms We Know Inside Out</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-sora">Not every platform is right for you on day one.</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg mt-4">Where you sell depends on what you&apos;re selling, who you&apos;re selling to, and what stage you&apos;re at.</p>
        </div>
        <div className="relative flex overflow-hidden group w-full py-4 max-w-full">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex flex-none items-center gap-12 md:gap-24 whitespace-nowrap px-6 md:px-12 will-change-transform transform-gpu"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...Array(2)].map((_, idx) => (
              <span key={idx} className="flex items-center gap-24">
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">amazon</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tight opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">Flipkart<span className="text-[#FFC200]">.</span></span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter text-[#fc2779] opacity-90 hover:opacity-100 transition-all duration-300">NYKAA</span>
                <span className="text-3xl md:text-5xl font-extrabold font-sora text-[#95bf47] opacity-90 hover:opacity-100 transition-all duration-300">shopify</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">Myntra</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">AJIO</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">Blinkit</span>
                <span className="text-3xl md:text-5xl font-serif tracking-widest text-[#E6CD92] opacity-90 hover:opacity-100 transition-all duration-300">Aza</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter text-[#0668E1] opacity-90 hover:opacity-100 transition-all duration-300">Meta</span>
                <span className="text-3xl md:text-5xl font-bold text-white font-sora tracking-tight opacity-90 hover:opacity-100 transition-all duration-300">WordPress</span>
                <span className="text-3xl md:text-5xl font-bold font-sora tracking-tighter opacity-90 hover:opacity-100 hover:text-white transition-all duration-300">TATA CLiQ</span>
                <span className="text-3xl md:text-5xl font-bold font-sora text-[#4285F4] opacity-90 hover:opacity-100 transition-all duration-300">Google</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* PROCESS SECTION */}
      <motion.section
        className="w-full bg-[#0A0A0A] py-24 content-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="text-center mb-16">
          <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">How We Work</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4">Same process. Every service. No surprises.</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg">Whether we&apos;re setting up your marketplace, running your ads, or building your brand this is how we work, every time.</p>
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-6"
          variants={scrollContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical Connecting Line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[#1ABC9C]/40"></div>

          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex items-start gap-5 mb-10 md:mb-12 md:items-center"
              variants={scrollItemVariants}
            >
              {/* Mobile layout */}
              <div className="md:hidden flex-shrink-0 w-9 h-9 rounded-full bg-[#0F3D3E] border-2 border-[#1ABC9C] flex items-center justify-center text-white text-sm font-bold z-10">
                {step.num}
              </div>
              <div className="md:hidden flex-1">
                <h3 className="text-xl font-bold text-white font-sora mb-1">{step.title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center w-full">
                <div className="pr-10 text-right">
                  {i % 2 === 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-white font-sora mb-2">{step.title}</h3>
                      <p className="text-[#B0B0B0]">{step.desc}</p>
                    </>
                  )}
                </div>
                <motion.div
                  className="w-9 h-9 rounded-full bg-[#0F3D3E] border-2 border-[#1ABC9C] flex items-center justify-center text-white text-sm font-bold z-10 cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.25, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {step.num}
                </motion.div>
                <div className="pl-10">
                  {i % 2 !== 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-white font-sora mb-2">{step.title}</h3>
                      <p className="text-[#B0B0B0]">{step.desc}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* GALLERY GRID SECTION (Dynamically Loaded & Offscreen Content Visibility) */}
      <div className="w-full content-auto">
        <GallerySection galleryItems={galleryItems} />
      </div>

      {/* RESULTS SECTION */}
      <motion.section
        className="w-full bg-[#1ABC9C] py-20 text-[#052222] shadow-2xl relative overflow-hidden content-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10"
          variants={scrollContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={scrollItemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 cursor-pointer"
          >
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-3 text-[#031515] tracking-tight">50+</h3>
            <p className="text-base font-bold text-[#052222]/90 max-w-xs mx-auto leading-snug">Brands launched from zero, across categories</p>
          </motion.div>

          <motion.div
            variants={scrollItemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 border-t md:border-t-0 md:border-l border-[#031515]/20 cursor-pointer"
          >
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-3 text-[#031515] tracking-tight">7</h3>
            <p className="text-base font-bold text-[#052222]/90 max-w-xs mx-auto leading-snug">Platforms we know and we&apos;ll tell you which one fits first</p>
          </motion.div>

          <motion.div
            variants={scrollItemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 border-t md:border-t-0 md:border-l border-[#031515]/20 cursor-pointer"
          >
            <h3 className="text-5xl lg:text-7xl font-black font-sora mb-3 text-[#031515] tracking-tight">30</h3>
            <p className="text-base font-bold text-[#052222]/90 max-w-xs mx-auto leading-snug">Days avg from first call to your first live listing</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* DYNAMIC BLOG SECTION */}
      {blogs.length > 0 && (
        <motion.section
          id="blog-feed"
          className="w-full bg-[#0A0A0A] py-24 content-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Things Worth Reading Before You Launch</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-sora">From the Blog</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1ABC9C] hover:text-[#1dd3af] transition-colors border-b border-[#1ABC9C]/30 pb-1"
              >
                Explore All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <motion.div
                  key={blog.id}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#1ABC9C]/20 transition-all duration-300"
                >
                  <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${blog.title}`}></Link>
                  <div>
                    <div className="relative aspect-[16/10] bg-[#1F1F1F] overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[10px] text-[#666] mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1ABC9C]" /> {blog.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#1ABC9C]" /> {blog.read_time}</span>
                      </div>
                      <h3 className="text-base font-bold text-white font-sora mb-3 group-hover:text-[#1ABC9C] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-[#B0B0B0] line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/5 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-[#121212]">
                      <img
                        src={blog.author_avatar}
                        alt={blog.author_name}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{blog.author_name}</p>
                      <p className="text-[9px] text-[#666] mt-1">{blog.author_role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* TESTIMONIALS SECTION */}
      <motion.section
        id="testimonials"
        className="w-full bg-[#0A0A0A] py-24 content-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Founder Stories</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sora">What first-time founders say after working with us.</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg mt-4 font-medium">Real accounts from founders who started where you are.</p>
        </div>

        {testimonials.length > 4 ? (
          <div className="relative flex overflow-hidden group w-full py-4 max-w-full">
            <div className="absolute top-0 bottom-0 left-0 w-20 md:w-36 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-20 md:w-36 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

            <motion.div
              className="flex flex-none items-stretch gap-6 px-4 will-change-transform transform-gpu"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: Math.max(25, testimonials.length * 6) }}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="w-[320px] md:w-[380px] shrink-0 flex flex-col">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#1C1C1E] border border-[#27272A] p-8 rounded-3xl relative hover:border-[#1ABC9C]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-1 mb-6 text-[#1ABC9C]">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>

                    <p className="text-sm md:text-base text-[#B0B0B0] italic leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3.5 pt-6 border-t border-[#27272A] mt-6">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#121212] border border-[#27272A] shrink-0">
                        <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none">{t.name}</h4>
                        <p className="text-[10px] text-[#666] mt-1.5">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 ${testimonials.length === 1 ? 'max-w-md mx-auto' : testimonials.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : testimonials.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.id || idx}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#1C1C1E] border border-[#27272A] p-8 rounded-3xl relative hover:border-[#1ABC9C]/30 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-6 text-[#1ABC9C]">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>

                  <p className="text-sm md:text-base text-[#B0B0B0] italic leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3.5 pt-6 border-t border-[#27272A] mt-6">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#121212] border border-[#27272A] shrink-0">
                      <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{t.name}</h4>
                      <p className="text-[10px] text-[#666] mt-1.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* DYNAMIC FAQ SECTION (Isolated State & Granular Code Splitting) */}
      <div className="w-full content-auto">
        <FaqSection faqs={faqs} />
      </div>

      {/* FINAL CTA */}
      <motion.section
        className="w-full bg-[#0A0A0A] py-24 text-center content-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-[#1F1F1F] to-[#121212] border border-[#333] p-6 sm:p-10 lg:p-20 rounded-3xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4 relative z-10 text-center">Not sure where to start?</h2>
            <p className="text-lg md:text-xl text-[#B0B0B0] mb-2 max-w-2xl mx-auto relative z-10 text-center">Start with an honest 20-minute conversation.</p>
            <p className="text-sm md:text-base text-[#777] mb-10 max-w-xl mx-auto relative z-10 text-center">We&apos;ll look at your product, your idea, and your target platforms and tell you exactly what needs to happen before you launch.</p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/schedule" className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#1ABC9C] text-[#0F3D3E] font-bold text-sm hover:bg-[#159a80] transition-all border border-[#1ABC9C] whitespace-nowrap">
                  Let&apos;s Get You Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Link href="/#gallery" className="inline-flex items-center px-7 py-3.5 rounded-full bg-transparent text-white font-medium text-sm hover:bg-[#1F1F1F] transition-all border border-[#333] whitespace-nowrap">
                  See Our Work First
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
