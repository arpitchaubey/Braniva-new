import { NextResponse } from 'next/server';

// Universal Commerce Protocol (UCP) Specification Profile
// https://ucp.dev/specification/overview/
export async function GET() {
    const ucp = {
        ucp_version: "1.0.0",
        merchant: {
            name: "Braniva",
            domain: "braniva.in",
            category: "d2c_growth_agency",
            support_email: "hello@braniva.in",
        },
        services: [
            {
                id: "consultation",
                name: "20-Minute Strategy Session",
                type: "free_consultation",
                endpoint: "https://braniva.in/schedule",
            },
            {
                id: "agency_services",
                name: "Full-Service D2C Branding & Marketing",
                type: "professional_services",
                endpoint: "https://braniva.in/services",
            },
        ],
        capabilities: {
            negotiation: false,
            free_tier_available: true,
            instant_booking: true,
        },
        spec_url: "https://ucp.dev/specification/overview/",
    };

    return NextResponse.json(ucp, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
