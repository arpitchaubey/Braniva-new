"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-end gap-3 group transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div 
                        className="relative w-8 h-8 md:w-10 md:h-10"
                        whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image src="/brand-logo.png" alt="Braniva Logo" fill className="object-contain" sizes="48px" unoptimized />
                    </motion.div>
                    <div className="flex items-baseline mb-0.5">
                        <span className="text-xl md:text-2xl font-bold font-sora text-white tracking-wide leading-none">Braniva</span>
                        <motion.span 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1ABC9C] ml-1"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Services", href: "/services" },
                        { name: "Case Studies", href: "/case-studies" },
                        { name: "Blog", href: "/blog" },
                        { name: "FAQ", href: "/faq" },
                        { name: "About", href: "/about" },
                        { name: "Contact", href: "/contact" }
                    ].map((item) => (
                        <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Link href={item.href} className="hover:text-[#1ABC9C] transition-colors">
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Link
                            href="/schedule"
                            className="inline-block px-5 py-2.5 rounded-full bg-[#0F3D3E] text-white text-sm font-medium hover:bg-[#1ABC9C] hover:text-[#052222] transition-all duration-300 border border-[#1ABC9C]/40"
                        >
                            Schedule Call
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white cursor-pointer p-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0A0A0A] p-6 shadow-xl">
                    <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 text-white">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">Home</Link>
                        <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">Services</Link>
                        <Link href="/case-studies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">Case Studies</Link>
                        <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">Blog</Link>
                        <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">FAQ</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">About</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#1ABC9C] transition-colors font-medium">Contact</Link>
                        <hr className="border-[#1F1F1F]" />
                        <Link
                            href="/schedule"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex justify-center items-center px-5 py-3 rounded-full bg-[#0F3D3E] text-white text-sm font-medium hover:bg-[#1ABC9C] transition-all duration-300"
                        >
                            Schedule Call
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
