"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#121212]">
            {/* Primary Emerald Glow */}
            <motion.div
                className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-30 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, #0F3D3E 0%, transparent 70%)",
                }}
                animate={{
                    x: ["0%", "20%", "-20%", "0%"],
                    y: ["0%", "-20%", "20%", "0%"],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                initial={{ x: "-20%", y: "-10%" }}
            />

            {/* Accent Bright Emerald Glow */}
            <motion.div
                className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-20 mix-blend-screen right-0 bottom-0"
                style={{
                    background: "radial-gradient(circle, #1ABC9C 0%, transparent 70%)",
                }}
                animate={{
                    x: ["0%", "-30%", "10%", "0%"],
                    y: ["0%", "10%", "-30%", "0%"],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                initial={{ x: "20%", y: "20%" }}
            />

            {/* Subtle Noise Texture overlay (optional) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
    );
}
