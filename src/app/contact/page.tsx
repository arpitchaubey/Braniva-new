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
        <div className="max-w-7xl mx-auto px-6 py-20">
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={scrollItemVariants}>
                    <h2 className="text-2xl font-bold text-white font-sora mb-8">Get in Touch</h2>

                    <div className="space-y-8">
                        <div className="flex flex-col gap-2">
                            <span className="w-12 h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#1ABC9C] mb-2">
                                <Mail className="w-5 h-5" />
                            </span>
                            <h4 className="text-white font-semibold">Email</h4>
                            <p className="text-[#B0B0B0]">hello@braniva.in</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="w-12 h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#1ABC9C] mb-2">
                                <Phone className="w-5 h-5" />
                            </span>
                            <h4 className="text-white font-semibold">Phone</h4>
                            <p className="text-[#B0B0B0]">+91 7303872329</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="w-12 h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#1ABC9C] mb-2">
                                <MapPin className="w-5 h-5" />
                            </span>
                            <h4 className="text-white font-semibold">HQ</h4>
                            <p className="text-[#B0B0B0]">Sector-71, Faridabad, Haryana, 121004, India<br /><span className="text-sm">(We operate as a fully remote team and do not maintain a physical office location.)</span></p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={scrollItemVariants} className="bg-[#1F1F1F]/40 border border-[#333] rounded-3xl p-8 lg:p-12">
                    {(submitted || hasSubmitted) ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-[#1ABC9C]/20 text-[#1ABC9C] rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-sora">We're on it!</h3>
                            <p className="text-[#B0B0B0]">You've already submitted an inquiry with us. A member of our team will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-[#B0B0B0]">Name *</label>
                                    <input required name="name" type="text" id="name" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[#B0B0B0]">Email *</label>
                                    <input required name="email" type="email" id="email" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-[#B0B0B0]">Phone Number *</label>
                                    <input required name="phone" type="tel" id="phone" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="business" className="text-sm font-medium text-[#B0B0B0]">Type of Business *</label>
                                    <select required name="business" id="business" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors appearance-none">
                                        <option value="">Select option...</option>
                                        <option value="d2c">D2C Brand</option>
                                        <option value="retail">Retail Business</option>
                                        <option value="startup">Startup</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="company" className="text-sm font-medium text-[#B0B0B0]">Company Name (Optional)</label>
                                <input type="text" name="company" id="company" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
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
    );
}
