"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrafficTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Skip tracking admin routes
        if (!pathname || pathname.startsWith('/admin')) return;

        const trackVisit = () => {
            try {
                // Get or set anonymous visitor ID
                let visitorId = localStorage.getItem("braniva_visitor_id");
                if (!visitorId) {
                    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
                    localStorage.setItem("braniva_visitor_id", visitorId);
                }

                fetch("/api/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        page_path: pathname,
                        referrer: document.referrer || "Direct",
                        visitor_id: visitorId
                    })
                }).catch(() => {});
            } catch {
                // Non-blocking
            }
        };

        if ("requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(trackVisit, { timeout: 3000 });
            return () => window.cancelIdleCallback(idleId);
        } else {
            const timerId = setTimeout(trackVisit, 2500);
            return () => clearTimeout(timerId);
        }
    }, [pathname]);

    return null;
}
