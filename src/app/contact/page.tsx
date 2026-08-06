"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const submittedAt = localStorage.getItem('braniva_lead_submitted');
            if (submittedAt) {
                const elapsed = Date.now() - parseInt(submittedAt, 10);
                if (elapsed < 20 * 60 * 1000) {
                    setHasSubmitted(true);
                } else {
                    localStorage.removeItem('braniva_lead_submitted');
                }
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            lead_type: 'enquiry',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            business_type: formData.get('business'),
            company_name: formData.get('company'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                if (typeof window !== "undefined") {
                    localStorage.setItem('braniva_lead_submitted', Date.now().toString());
                }
                setSubmitted(true);
                setHasSubmitted(true);
            } else {
                alert('Failed to submit enquiry. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
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
        hidden: { y: 40, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">Contact Us</h1>
                    <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
                        Ready to scale your e-commerce brand? Send us an outline of what you&apos;re looking for, and we&apos;ll get back to you.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
                    variants={scrollContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Contact Info */}
                    <motion.div variants={scrollItemVariants}>
                        <h2 className="text-2xl font-bold text-white font-sora mb-8">Get in Touch Directly</h2>
                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0F3D3E]/30 text-[#1ABC9C] flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#B0B0B0] uppercase tracking-wider mb-1">Email Us</h3>
                                    <a href="mailto:hello@braniva.in" className="text-white text-lg font-medium hover:text-[#1ABC9C] transition-colors">hello@braniva.in</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0F3D3E]/30 text-[#1ABC9C] flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#B0B0B0] uppercase tracking-wider mb-1">Call Us</h3>
                                    <a href="tel:+917303872329" className="text-white text-lg font-medium hover:text-[#1ABC9C] transition-colors">+91 7303872329</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0F3D3E]/30 text-[#1ABC9C] flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#B0B0B0] uppercase tracking-wider mb-1">Headquarters</h3>
                                    <p className="text-white text-base font-medium leading-relaxed">
                                        Sector-71, Faridabad, Haryana, 121004, India<br/>
                                        <span className="text-xs text-[#B0B0B0] font-normal">(We operate as a fully remote team and do not maintain a physical office location.)</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={scrollItemVariants} className="bg-[#121216] border border-white/10 p-8 rounded-3xl">
                        {submitted ? (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-bold text-white mb-4">Enquiry Received!</h3>
                                <p className="text-[#B0B0B0]">Thank you for reaching out. A member of our strategy team will get back to you shortly.</p>
                            </div>
                        ) : hasSubmitted ? (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-bold text-white mb-4">Form Already Submitted</h3>
                                <p className="text-[#B0B0B0]">You have already submitted an enquiry recently. Our team is processing your request and will reach out soon!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-[#B0B0B0]">Your Name *</label>
                                    <input required type="text" name="name" id="name" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium text-[#B0B0B0]">Email Address *</label>
                                        <input required type="email" name="email" id="email" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-[#B0B0B0]">Phone Number *</label>
                                        <input required type="tel" name="phone" id="phone" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="business" className="text-sm font-medium text-[#B0B0B0]">Business Stage *</label>
                                        <select required name="business" id="business" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors">
                                            <option value="New Launch">New Launch / Startup</option>
                                            <option value="Scaling Brand">Scaling Brand (&gt;10L/mo)</option>
                                            <option value="Established Enterprise">Established Enterprise</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="company" className="text-sm font-medium text-[#B0B0B0]">Company / Brand Name</label>
                                        <input type="text" name="company" id="company" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#B0B0B0]">Enquiry Message *</label>
                                    <textarea required name="message" id="message" rows={4} className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors resize-none"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full py-4 rounded-xl bg-[#0F3D3E] text-white font-bold hover:bg-[#1ABC9C] transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
