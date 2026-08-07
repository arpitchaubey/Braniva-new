import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Agent Skills Discovery RFC v0.2.0
// https://github.com/cloudflare/agent-skills-discovery-rfc
export async function GET() {
    const skills = [
        {
            name: "get-blogs",
            type: "http-api",
            description: "Retrieve published blog posts from Braniva. Supports limit and offset query params.",
            url: "https://braniva.in/api/blogs",
            method: "GET",
            params: { limit: "number (optional, default 10)", offset: "number (optional, default 0)" },
        },
        {
            name: "get-faqs",
            type: "http-api",
            description: "Retrieve frequently asked questions about Braniva's services.",
            url: "https://braniva.in/api/faqs",
            method: "GET",
            params: { limit: "number (optional)" },
        },
        {
            name: "get-gallery",
            type: "http-api",
            description: "Retrieve Braniva's portfolio gallery — past client work and case studies.",
            url: "https://braniva.in/api/gallery",
            method: "GET",
        },
        {
            name: "get-testimonials",
            type: "http-api",
            description: "Retrieve client testimonials and reviews for Braniva.",
            url: "https://braniva.in/api/testimonials",
            method: "GET",
        },
        {
            name: "submit-contact",
            type: "http-api",
            description: "Submit a contact/lead enquiry to Braniva's team. POST a JSON body with name, email, message, and optionally service.",
            url: "https://braniva.in/api/contact",
            method: "POST",
            body: {
                name: "string (required)",
                email: "string (required)",
                message: "string (required)",
                service: "string (optional)",
            },
        },
    ];

    // Compute a simple digest of the skills array for cache validation
    const digest = crypto
        .createHash("sha256")
        .update(JSON.stringify(skills))
        .digest("hex");

    const index = {
        $schema: "https://agentskills.io/schema/v0.2.0/index.json",
        name: "Braniva",
        description: "Braniva is a full-service e-commerce growth agency — marketplace onboarding, marketing, logistics, and brand identity for Indian brands.",
        url: "https://braniva.in",
        skills: skills.map((s) => ({
            ...s,
            sha256: digest,
        })),
    };

    return NextResponse.json(index, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
