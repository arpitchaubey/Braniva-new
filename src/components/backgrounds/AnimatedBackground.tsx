"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#121212]">
            {/* Lightweight CSS Gradients Instead of Expensive Blurs */}
            <div className="absolute top-0 left-1/4 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,61,62,0.15)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="absolute bottom-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(26,188,156,0.1)_0%,transparent_70%)] pointer-events-none"></div>

            {/* Subtle Noise Texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        </div>
    );
}
