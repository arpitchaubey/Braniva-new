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

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

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
        <>
            {/* Navbar — absolute, floats over the hero, no background */}
            <header className="absolute top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-end gap-2.5 group" onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div
                            className="relative w-7 h-7 md:w-9 md:h-9"
                            whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image src="/brand-logo.png" alt="Braniva Logo" fill className="object-contain" sizes="48px" unoptimized />
                        </motion.div>
                        <div className="flex items-baseline mb-0.5">
                            <span className="text-lg md:text-xl font-bold font-sora text-white tracking-wide leading-none drop-shadow-md">Braniva</span>
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] ml-1"
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium">
                        {navLinks.map((item) => (
                            <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                                <Link
                                    href={item.href}
                                    className={`transition-colors drop-shadow-sm ${
                                        pathname === item.href
                                            ? "text-[#1ABC9C]"
                                            : "text-white/90 hover:text-[#1ABC9C]"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Link
                                href="/schedule"
                                className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold hover:bg-[#1ABC9C] hover:text-[#052222] transition-all duration-300 border border-white/20 hover:border-[#1ABC9C]"
                            >
                                Schedule Call
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white cursor-pointer p-2 rounded-lg transition-colors hover:bg-white/10"
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
            </header>

            {/* Full-screen Mobile Menu Overlay — separate from header so it covers everything */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] md:hidden bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col"
                    >
                        {/* Top bar inside overlay */}
                        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-end gap-2">
                                <div className="relative w-7 h-7">
                                    <Image src="/brand-logo.png" alt="Braniva Logo" fill className="object-contain" sizes="32px" unoptimized />
                                </div>
                                <span className="text-lg font-bold font-sora text-white">Braniva</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] mb-1" />
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col flex-1 px-4 sm:px-6 pt-4 gap-1 overflow-y-auto">
                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.25 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center px-4 py-4 rounded-2xl font-semibold text-lg transition-all ${
                                            pathname === item.href
                                                ? "text-[#1ABC9C] bg-[#1ABC9C]/10"
                                                : "text-white hover:text-[#1ABC9C] hover:bg-white/5"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="px-4 sm:px-6 pb-10 pt-4 border-t border-white/10"
                        >
                            <Link
                                href="/schedule"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex justify-center items-center w-full py-4 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-base hover:bg-[#1dd3af] transition-all"
                            >
                                Schedule a Free Call
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
