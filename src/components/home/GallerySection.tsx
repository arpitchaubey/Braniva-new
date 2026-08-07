"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GalleryItem } from "@/data/galleryData";

export default function GallerySection({ galleryItems }: { galleryItems: GalleryItem[] }) {
  if (!galleryItems || galleryItems.length === 0) return null;

  return (
    <motion.section
      id="gallery"
      className="w-full bg-[#0A0A0A] py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-[#1ABC9C] font-bold tracking-widest uppercase text-sm mb-4">Work We&apos;ve Done</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sora mb-4">What a brand at your stage actually looks like after working with us.</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg font-medium">Real storefronts, listings, and brand pages we&apos;ve built across categories, not just one.</p>
        </div>

        <motion.div
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }
                }
              }}
              className="break-inside-avoid inline-block w-full group relative bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-[#1ABC9C]/40 transition-all duration-300"
            >
              <div className="relative w-full h-auto overflow-hidden bg-[#121212] rounded-3xl">
                <img
                  src={item.imageUrl}
                  alt={item.title || "Gallery Showcase"}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
            </motion.div>
          ))}

          {/* CTA Card completing the Gallery */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 35, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
              }
            }}
            className="break-inside-avoid inline-block w-full group relative p-8 rounded-3xl bg-gradient-to-br from-[#0F3D3E]/50 to-[#121212] border border-[#1ABC9C]/30 transition-all duration-500 overflow-hidden"
          >
            <div>
              <span className="text-[9px] font-bold text-[#1ABC9C] uppercase tracking-widest bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2.5 py-1 rounded-full">Start Now</span>
              <h3 className="text-lg font-bold text-white font-sora mt-4 mb-2 leading-snug">Scale Your Brand Beyond Limits</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed">
                Ready to build your digital storefront, optimize listings, or deploy performance marketing?
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="self-start mt-6">
              <Link
                href="/schedule"
                className="px-6 py-3 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-xs hover:bg-[#1dd3af] transition-all border border-[#1ABC9C] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#1ABC9C]/10"
              >
                Schedule a Call <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
