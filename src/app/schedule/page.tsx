"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function SchedulePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            lead_type: 'meeting',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            business_type: formData.get('business'),
            company_name: formData.get('company'),
            meeting_date: formData.get('date'),
            meeting_time: formData.get('time'),
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Failed to book meeting. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white font-sora mb-6">Schedule a Call</h1>
                <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
                    Book a free 30-minute consultation with our growth experts to discuss your marketplace strategy.
                </p>
            </motion.div>

            <motion.div
                className="bg-[#1F1F1F]/40 border border-[#333] rounded-3xl p-8 lg:p-12"
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div variants={scrollItemVariants}>
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-[#1ABC9C]/20 text-[#1ABC9C] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CalendarIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-sora">Meeting Scheduled!</h3>
                            <p className="text-[#B0B0B0]">We have received your meeting request. We will contact you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Personal Details */}
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-xl font-bold text-white font-sora mb-2 border-b border-[#333] pb-4">Your Details</h3>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-sm font-medium text-[#B0B0B0]">Name *</label>
                                        <input required name="name" type="text" id="name" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium text-[#B0B0B0]">Email *</label>
                                        <input required name="email" type="email" id="email" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors" />
                                    </div>

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

                                {/* Date & Time Selection */}
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-xl font-bold text-white font-sora mb-2 border-b border-[#333] pb-4 flex items-center justify-between">
                                        <span>When?</span>
                                        <span className="text-xs font-normal text-[#1ABC9C] bg-[#1ABC9C]/10 px-2 py-1 rounded">30 min call</span>
                                    </h3>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="date" className="text-sm font-medium text-[#B0B0B0] flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" /> Select Date *
                                        </label>
                                        <input required name="date" type="date" id="date" min={new Date().toISOString().split('T')[0]} className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors [color-scheme:dark]" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="time" className="text-sm font-medium text-[#B0B0B0] flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> Select Time *
                                        </label>
                                        <select required name="time" id="time" className="bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] transition-colors appearance-none">
                                            <option value="">Select time block...</option>
                                            <option value="10:00">10:00 AM - 10:30 AM</option>
                                            <option value="11:00">11:00 AM - 11:30 AM</option>
                                            <option value="13:00">1:00 PM - 1:30 PM</option>
                                            <option value="15:00">3:00 PM - 3:30 PM</option>
                                            <option value="16:30">4:30 PM - 5:00 PM</option>
                                        </select>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl bg-[#1ABC9C] text-[#0F3D3E] font-bold hover:bg-[#159a80] transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                                        </button>
                                        <p className="text-xs text-[#B0B0B0] mt-4 text-center">
                                            By confirming, you agree to our terms and privacy policy.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
