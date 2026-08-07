"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null;
    let animationFrameId: number | null = null;
    let isCleanedUp = false;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (isCleanedUp) return;

        lenis = new Lenis({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          syncTouch: false,
        });

        function raf(time: number) {
          if (lenis) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
          }
        }

        animationFrameId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Smooth scroll initialization skipped:", e);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => initLenis(), { timeout: 1500 });
      return () => {
        isCleanedUp = true;
        window.cancelIdleCallback(idleId);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (lenis) lenis.destroy();
      };
    } else {
      const timerId = setTimeout(() => initLenis(), 1000);
      return () => {
        isCleanedUp = true;
        clearTimeout(timerId);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (lenis) lenis.destroy();
      };
    }
  }, []);

  return <>{children}</>;
}
