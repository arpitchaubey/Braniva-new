"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-WETJ53C5L8";

export default function GoogleAnalytics() {
  useEffect(() => {
    const loadGA = () => {
      if (document.getElementById("ga-script")) return;

      const script = document.createElement("script");
      script.id = "ga-script";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadGA, { timeout: 4000 });
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timerId = setTimeout(loadGA, 3500);
      return () => clearTimeout(timerId);
    }
  }, []);

  return null;
}
