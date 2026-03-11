"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-[#1F1F1F]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-end gap-3 group transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105">
                        <Image src="/logo.png" alt="Braniva Logo" fill className="object-contain" sizes="40px" />
                    </div>
                    <div className="flex items-baseline mb-0.5">
                        <span className="text-xl md:text-2xl font-bold font-sora text-white tracking-wide leading-none">Braniva</span>
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1ABC9C] ml-1"></span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B0B0B0]">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                    <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/schedule"
                        className="px-5 py-2.5 rounded-full bg-[#0F3D3E] text-white text-sm font-medium hover:bg-[#1ABC9C] transition-all duration-300 shadow-[0_0_15px_rgba(26,188,156,0.15)] hover:shadow-[0_0_20px_rgba(26,188,156,0.3)]"
                    >
                        Schedule Call
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#121212] border-b border-[#1F1F1F] p-6 shadow-xl">
                    <nav className="flex flex-col gap-6 text-[#B0B0B0]">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors font-medium">Home</Link>
                        <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors font-medium">Services</Link>
                        <Link href="/case-studies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors font-medium">Case Studies</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors font-medium">About</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors font-medium">Contact</Link>
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
