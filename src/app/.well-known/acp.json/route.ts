import { NextResponse } from 'next/server';

// Agentic Commerce Protocol (ACP) Discovery Document
// https://agenticcommerce.dev
export async function GET() {
    const acp = {
        protocol: {
            name: "acp",
            version: "1.0.0",
        },
        api_base_url: "https://braniva.in/api",
        transports_supported: ["https", "mcp"],
        capabilities: {
            services: [
                { id: "web", name: "Website Design & Development", type: "service" },
                { id: "marketplace", name: "Marketplace Setup & Onboarding", type: "service" },
                { id: "logistics", name: "Logistics Onboarding", type: "service" },
                { id: "marketing", name: "Marketing Strategy", type: "service" },
                { id: "listing", name: "Product Listing Optimization", type: "service" },
                { id: "email", name: "Email Marketing Automation", type: "service" },
                { id: "whatsapp", name: "WhatsApp Marketing Campaigns", type: "service" },
                { id: "brand-identity", name: "Brand Identity", type: "service" },
            ],
            checkout: {
                consultation_booking: "https://braniva.in/schedule",
                lead_submission: "https://braniva.in/api/leads",
            },
        },
        contact: "hello@braniva.in",
    };

    return NextResponse.json(acp, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
