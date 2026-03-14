import Link from "next/link";
import Image from "next/image";
import { MoveRight, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-[#1F1F1F] bg-[#0a0a0c] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex flex-col items-start gap-4 mb-8 group transition-transform">
                            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                <Image src="/logo.png" alt="Braniva Logo" fill className="object-contain" sizes="48px" />
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold font-sora text-white tracking-wide">Braniva</span>
                                <span className="w-2 h-2 rounded-full bg-[#1ABC9C] ml-1.5 mb-1.5"></span>
                            </div>
                        </Link>
                        <p className="text-[#B0B0B0] max-w-sm mb-8 leading-relaxed text-sm">
                            Your end-to-end e-commerce growth partner. From marketplace onboarding and logistics to performance marketing and brand identity we handle the heavy lifting so you can focus on your product.
                        </p>
                        <Link href="/schedule" className="inline-flex items-center gap-2 text-[#1ABC9C] font-medium hover:gap-3 transition-all text-sm">
                            Schedule a free consultation <MoveRight className="w-4 h-4" />
                        </Link>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-8">
                            <a href="https://www.instagram.com/braniva.in" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-[#1ABC9C] transition-colors" aria-label="Braniva on Instagram">
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                            <a href="https://www.linkedin.com/company/braniva/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-[#1ABC9C] transition-colors" aria-label="Braniva on LinkedIn">
                                <Linkedin className="w-5 h-5 text-white" />
                            </a>
                            <a href="https://x.com/_braniva" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-[#1ABC9C] transition-colors" aria-label="Braniva on Twitter">
                                <Twitter className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-semibold mb-6 font-sora text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-3.5 text-[#B0B0B0] text-sm">
                            <li><Link href="/services#marketplace" className="hover:text-[#1ABC9C] transition-colors">Marketplace Onboarding</Link></li>
                            <li><Link href="/services#marketing" className="hover:text-[#1ABC9C] transition-colors">Marketing Strategy</Link></li>
                            <li><Link href="/services#logistics" className="hover:text-[#1ABC9C] transition-colors">Logistics Onboarding</Link></li>
                            <li><Link href="/services#listing" className="hover:text-[#1ABC9C] transition-colors">Listing Optimization</Link></li>
                            <li><Link href="/services#email" className="hover:text-[#1ABC9C] transition-colors">Email Automation</Link></li>
                            <li><Link href="/services#whatsapp" className="hover:text-[#1ABC9C] transition-colors">WhatsApp Marketing</Link></li>
                            <li><Link href="/services#web" className="hover:text-[#1ABC9C] transition-colors">Website Development</Link></li>
                            <li><Link href="/services#brand-identity" className="hover:text-[#1ABC9C] transition-colors">Brand Identity</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-semibold mb-6 font-sora text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3.5 text-[#B0B0B0] text-sm">
                            <li><Link href="/about" className="hover:text-[#1ABC9C] transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-[#1ABC9C] transition-colors">All Services</Link></li>
                            <li><Link href="/case-studies" className="hover:text-[#1ABC9C] transition-colors">Case Studies</Link></li>
                            <li><Link href="/schedule" className="hover:text-[#1ABC9C] transition-colors">Book a Call</Link></li>
                            <li><Link href="/contact" className="hover:text-[#1ABC9C] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-semibold mb-6 font-sora text-sm uppercase tracking-wider">Get in Touch</h4>
                        <ul className="space-y-4 text-[#B0B0B0] text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 text-[#1ABC9C] shrink-0" />
                                <a href="mailto:hello@braniva.in" className="hover:text-[#1ABC9C] transition-colors">hello@braniva.in</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 text-[#1ABC9C] shrink-0" />
                                <a href="tel:+917303872329" className="hover:text-[#1ABC9C] transition-colors">+91 7303872329</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-[#1ABC9C] shrink-0" />
                                <span>H.no-1326, Sector-3, Faridabad, Haryana, 121004, India<br /></span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1F1F1F] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
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
