"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Blog", href: "/blog" },
        { name: "FAQ", href: "/faq" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || isMobileMenuOpen
                    ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 shadow-xl"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
                <Link href="/" className="flex items-end gap-2.5 group transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                        className="relative w-7 h-7 md:w-10 md:h-10"
                        whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image src="/brand-logo.png" alt="Braniva Logo" fill className="object-contain" sizes="48px" unoptimized />
                    </motion.div>
                    <div className="flex items-baseline mb-0.5">
                        <span className="text-lg md:text-2xl font-bold font-sora text-white tracking-wide leading-none">Braniva</span>
                        <motion.span
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1ABC9C] ml-1"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-white">
                    {navLinks.map((item) => (
                        <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Link
                                href={item.href}
                                className={`hover:text-[#1ABC9C] transition-colors ${pathname === item.href ? "text-[#1ABC9C]" : ""}`}
                            >
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
                            className="inline-block px-4 lg:px-5 py-2.5 rounded-full bg-[#0F3D3E] text-white text-sm font-medium hover:bg-[#1ABC9C] hover:text-[#052222] transition-all duration-300 border border-[#1ABC9C]/40"
                        >
                            Schedule Call
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <Menu className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -12, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -12, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-t border-white/5 overflow-hidden"
                    >
                        <nav aria-label="Mobile Navigation" className="flex flex-col px-4 py-5 gap-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-colors text-base ${
                                        pathname === item.href
                                            ? "text-[#1ABC9C] bg-[#1ABC9C]/10"
                                            : "text-white hover:text-[#1ABC9C] hover:bg-white/5"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-3 mt-2 border-t border-white/10">
                                <Link
                                    href="/schedule"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex justify-center items-center px-5 py-3.5 rounded-full bg-[#0F3D3E] text-white text-sm font-semibold hover:bg-[#1ABC9C] hover:text-[#052222] transition-all duration-300 border border-[#1ABC9C]/40"
                                >
                                    Schedule Call
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
