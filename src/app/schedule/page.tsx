"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Video, Globe, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function SchedulePage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const [mounted, setMounted] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const submitted = localStorage.getItem('braniva_lead_submitted');
            if (submitted) {
                setHasSubmitted(true);
            }
        }
    }, []);

    const [step, setStep] = useState<"date-time" | "form" | "success">("date-time");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        project_details: "",
    });

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
            setCurrentMonth(prev);
        }
    };

    const buildCalendarDays = () => {
        const days = [];
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDayOfWeek = new Date(year, month, 1).getDay();

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const days = buildCalendarDays();

    // Reset things if user changes date
    useEffect(() => {
        if (!selectedDate) return;
        setIsLoadingSlots(true);
        setSelectedTime(null);

        const fetchAvailability = async () => {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;

            try {
                const res = await fetch(`/api/calendar/availability?date=${dateString}&timezone=Asia/Calcutta`);
                const data = await res.json();
                setAvailableSlots(data.availableSlots || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoadingSlots(false);
            }
        };

        fetchAvailability();
    }, [selectedDate]);

    const formatTime = (time24: string) => {
        const [hourStr, min] = time24.split(":");
        const hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${min}${ampm}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const year = selectedDate!.getFullYear();
        const month = String(selectedDate!.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate!.getDate()).padStart(2, '0');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_type: 'Consultation Call Booking',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company_name: formData.company_name,
                    project_details: formData.project_details,
                    business_type: "N/A",
                    monthly_revenue: "N/A",
                    meeting_date: `${year}-${month}-${day}`,
                    meeting_time: selectedTime
                })
            });
            if (response.ok) {
                if (typeof window !== "undefined") {
                    localStorage.setItem('braniva_lead_submitted', 'true');
                }
                setStep("success");
                setHasSubmitted(true);
            } else {
                alert("Something went wrong booking your meeting. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:py-20 font-sans selection:bg-[#1ABC9C] selection:text-black">

            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold font-sora mb-4 text-[#F4F4F5]">
                    Schedule a Call
                </h1>
                <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
                    Book a free 30-minute consultation. We'll send you an invitation confirming the details.
                </p>
            </motion.div>

            <motion.div
                className="max-w-[1060px] mx-auto bg-[#18181A] border border-[#27272A] rounded-2xl flex flex-col md:flex-row shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ minHeight: "550px" }}
            >
                {/* Prevent duplicate booking if they have already submitted on this device */}
                {hasSubmitted && step !== "success" ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 text-center w-full">
                        <div className="w-16 h-16 rounded-full bg-[#1ABC9C]/10 flex items-center justify-center mb-6">
                            <CheckCircle2 size={32} className="text-[#1ABC9C]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white font-sora mb-4">You're Already Scheduled!</h2>
                        <p className="text-[#A1A1AA] max-w-md mx-auto mb-8">
                            We have received your previous inquiry and our team will get in touch with you shortly.
                            Please check your email for the meeting link.
                        </p>
                        <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-[#18181A] border border-[#27272A] hover:bg-[#27272A] hover:text-white rounded-lg font-medium text-[#A1A1AA] transition">
                            Return to Homepage
                        </button>
                    </div>
                ) : (
                    <>
                        {/* LEFT SIDEBAR - ALWAYS VISIBLE OVERVIEW */}
                        <div className={`w-full md:w-[320px] p-6 md:p-8 bg-[#18181A] flex flex-col border-b md:border-b-0 md:border-r border-[#27272A] ${step === 'success' ? 'hidden md:flex' : 'flex'}`}>
                            <div className="mb-6 flex flex-col space-y-4">
                                <div className="w-12 h-12 bg-[#121212] border border-[#27272A] rounded-lg flex items-center justify-center text-[#1ABC9C] font-sora font-bold text-xl">
                                    B
                                </div>
                            </div>
                            <p className="text-[#A1A1AA] font-medium text-sm mb-2">Braniva Growth Team</p>
                            <h2 className="text-2xl font-bold text-[#F4F4F5] mb-8 font-sora">30 min meeting</h2>

                            <div className="flex flex-col gap-5 text-[#A1A1AA] font-medium text-[15px]">
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="stroke-[1.5]" />
                                    {step !== 'date-time' && selectedDate && selectedTime ? (
                                        <span className="text-[#1ABC9C]">
                                            {formatTime(selectedTime)} on {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
                                        </span>
                                    ) : (
                                        <span>30 min</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3"><Video size={20} className="stroke-[1.5]" /> Google Meet</div>
                                <div className="flex items-center gap-3"><Globe size={20} className="stroke-[1.5]" /> Asia/Kolkata</div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT AREA */}
                        <div className="flex-1 flex flex-col md:flex-row bg-[#121212]">

                            {/* STEP 1: DATE & TIME SELECTION */}
                            <AnimatePresence mode="wait">
                                {step === "date-time" && (
                                    <motion.div
                                        key="date-time"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 flex flex-col md:flex-row w-full"
                                    >
                                        {/* Calendar Picker */}
                                        <div className="flex-1 p-6 md:p-8 flex flex-col">
                                            <h3 className="text-xl font-bold text-[#F4F4F5] mb-6 hidden md:block">Select a Date & Time</h3>

                                            <div className="flex items-center justify-between mb-6">
                                                <p className="text-base font-semibold text-[#F4F4F5]">
                                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={prevMonth}
                                                        disabled={currentMonth <= new Date(today.getFullYear(), today.getMonth(), 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#27272A] bg-[#18181A] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                    >
                                                        <ChevronLeft size={18} />
                                                    </button>
                                                    <button
                                                        onClick={nextMonth}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#27272A] bg-[#18181A] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition"
                                                    >
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-4">
                                                {daysOfWeek.map(day => (
                                                    <div key={day} className="text-center text-[11px] font-bold text-[#A1A1AA] tracking-wider">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                                                {days.map((day, ix) => {
                                                    if (!day) return <div key={`empty-${ix}`} />;
                                                    const isPast = day < today;
                                                    const isSelected = selectedDate?.getTime() === day.getTime();
                                                    const isToday = day.getTime() === today.getTime();

                                                    return (
                                                        <div key={day.toISOString()} className="flex justify-center">
                                                            <button
                                                                onClick={() => setSelectedDate(day)}
                                                                disabled={isPast}
                                                                className={`w-10 h-10 flex items-center justify-center rounded-full text-[15px] font-semibold transition ${isSelected
                                                                    ? 'bg-[#1ABC9C] text-[#050505]'
                                                                    : isPast
                                                                        ? 'text-[#3F3F46] cursor-not-allowed'
                                                                        : isToday
                                                                            ? 'text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/30 hover:bg-[#27272A]'
                                                                            : 'text-[#E4E4E7] hover:bg-[#27272A] bg-transparent'
                                                                    }`}
                                                            >
                                                                {day.getDate()}
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Timeslot List */}
                                        {selectedDate && (
                                            <div className="w-full md:w-[280px] p-6 md:p-8 border-t md:border-t-0 md:border-l border-[#27272A] flex flex-col">
                                                <p className="text-[#F4F4F5] font-semibold mb-6">
                                                    {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
                                                </p>

                                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                                    {isLoadingSlots ? (
                                                        <div className="flex justify-center my-10">
                                                            <div className="w-6 h-6 border-2 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                    ) : availableSlots.length > 0 ? (
                                                        <div className="flex flex-col gap-2">
                                                            {availableSlots.map(time => {
                                                                const isSelected = selectedTime === time;
                                                                return (
                                                                    <div key={time} className="w-full flex gap-2">
                                                                        <button
                                                                            onClick={() => setSelectedTime(time)}
                                                                            className={`py-3 px-4 rounded border text-sm font-semibold transition flex-1 ${isSelected
                                                                                ? 'border-[#1ABC9C] bg-[#1ABC9C]/10 text-[#1ABC9C]'
                                                                                : 'border-[#27272A] text-[#E4E4E7] hover:border-[#1ABC9C]/50 hover:text-white bg-transparent'
                                                                                }`}
                                                                        >
                                                                            {formatTime(time)}
                                                                        </button>
                                                                        {isSelected && (
                                                                            <button
                                                                                onClick={() => setStep('form')}
                                                                                className="w-1/2 py-3 rounded bg-[#1ABC9C] hover:bg-[#14957D] text-[#050505] font-bold text-sm transition shadow-[0_0_15px_rgba(26,188,156,0.3)]"
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-[#A1A1AA] text-sm text-center mt-10">No available slots for this day.</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* STEP 2: BOOKING FORM */}
                                {step === "form" && (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 flex flex-col w-full"
                                    >
                                        <div className="p-6 md:p-8 flex flex-col h-full">
                                            <button
                                                onClick={() => setStep('date-time')}
                                                className="w-fit mb-8 flex items-center gap-2 text-[#A1A1AA] hover:text-white transition font-medium text-sm"
                                            >
                                                <ArrowLeft size={16} /> Back
                                            </button>

                                            <h3 className="text-xl font-bold text-[#F4F4F5] mb-6">Enter Details</h3>

                                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">Name *</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={formData.name}
                                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full bg-[#18181A] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">Email *</label>
                                                        <input
                                                            required
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full bg-[#18181A] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">Phone</label>
                                                        <input
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full bg-[#18181A] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">Company</label>
                                                        <input
                                                            type="text"
                                                            value={formData.company_name}
                                                            onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                                            className="w-full bg-[#18181A] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">Please share anything that will help prepare for our meeting.</label>
                                                    <textarea
                                                        rows={4}
                                                        value={formData.project_details}
                                                        onChange={e => setFormData({ ...formData, project_details: e.target.value })}
                                                        className="w-full bg-[#18181A] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition resize-none custom-scrollbar"
                                                    />
                                                </div>

                                                <div className="mt-auto pt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="bg-[#F4F4F5] hover:bg-white text-black font-bold py-3 px-8 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                                    >
                                                        {isSubmitting ? (
                                                            <span className="w-5 h-5 border-2 border-black border-t-transparent flex rounded-full animate-spin"></span>
                                                        ) : "Confirm Booking"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: SUCCESS */}
                                {step === "success" && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-[#1ABC9C]/10 flex items-center justify-center mb-6">
                                            <CheckCircle2 size={32} className="text-[#1ABC9C]" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white font-sora mb-4">Meeting Scheduled</h2>
                                        <p className="text-[#A1A1AA] max-w-md mx-auto mb-8">
                                            You're scheduled with Braniva for <b>{formatTime(selectedTime!)}</b> on <b>{selectedDate!.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</b>.
                                            <br /><br />
                                            A calendar invitation has been sent to your email address, and our team will append the meeting link shortly.
                                        </p>
                                        <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-[#18181A] border border-[#27272A] hover:bg-[#27272A] hover:text-white rounded-lg font-medium text-[#A1A1AA] transition">
                                            Return to Homepage
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </>
                )}
            </motion.div>

            {/* Internal styles for hiding generic scrollbars on webkit */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #27272A;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3F3F46;
                }
            `}</style>
        </div>
    );
}
