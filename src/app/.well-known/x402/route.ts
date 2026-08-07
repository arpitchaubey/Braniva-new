import { NextResponse } from 'next/server';

// x402 Agent Payment Protocol Configuration
// https://x402.org
export async function GET() {
    const x402Config = {
        version: "1.0",
        facilitator: "https://x402.org/facilitator",
        network: "base-mainnet",
        payment_required: false,
        free_endpoints: [
            "https://braniva.in/api/blogs",
            "https://braniva.in/api/faqs",
            "https://braniva.in/api/gallery",
            "https://braniva.in/api/leads",
        ],
        message: "Braniva APIs are freely accessible to AI agents. No HTTP 402 payment required.",
    };

    return NextResponse.json(x402Config, {
        headers: {
            "Content-Type": "application/json",
            "X-402-Supported": "true",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
