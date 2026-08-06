"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Defer Lenis init until after paint so it doesn't block LCP/TBT
    const timer = setTimeout(async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      let animationFrameId: number;

      function raf(time: number) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animationFrameId);
        lenis.destroy();
      };
    }, 2000); // Wait 2s after paint before initialising smooth scroll

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
