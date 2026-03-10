import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-[#1F1F1F] bg-[#121212] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-flex flex-col items-start gap-4 mb-8 group transition-transform">
                            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                <Image src="/logo.png" alt="Braniva Logo" fill className="object-contain" sizes="48px" />
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold font-sora text-white tracking-wide">Braniva</span>
                                <span className="w-2 h-2 rounded-full bg-[#1ABC9C] ml-1.5 mb-1.5"></span>
                            </div>
                        </Link>
                        <p className="text-[#B0B0B0] max-w-sm mb-8 leading-relaxed">
                            We handle your digital growth from launch to scale. Let us optimize your marketplace presence and marketing automation.
                        </p>
                        <Link href="/schedule" className="inline-flex items-center gap-2 text-[#1ABC9C] font-medium hover:gap-3 transition-all">
                            Schedule a free consultation <MoveRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-4 text-[#B0B0B0] text-sm">
                            <li><Link href="/services#marketplace" className="hover:text-[#1ABC9C] transition-colors">Marketplace Onboarding</Link></li>
                            <li><Link href="/services#listing" className="hover:text-[#1ABC9C] transition-colors">Listing Optimization</Link></li>
                            <li><Link href="/services#email" className="hover:text-[#1ABC9C] transition-colors">Email Automation</Link></li>
                            <li><Link href="/services#whatsapp" className="hover:text-[#1ABC9C] transition-colors">WhatsApp Marketing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-[#B0B0B0] text-sm">
                            <li><Link href="/about" className="hover:text-[#1ABC9C] transition-colors">About Us</Link></li>
                            <li><Link href="/case-studies" className="hover:text-[#1ABC9C] transition-colors">Case Studies</Link></li>
                            <li><Link href="/contact" className="hover:text-[#1ABC9C] transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1F1F1F] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B0B0B0]">
                    <p>© {new Date().getFullYear()} Braniva. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
