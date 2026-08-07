import { NextResponse } from 'next/server';

// MCP Server Card (SEP-1649)
// https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
export async function GET() {
    const serverCard = {
        serverInfo: {
            name: "Braniva",
            version: "1.0.0",
            description: "Braniva is a full-service e-commerce growth agency helping Indian brands launch on marketplaces, build their digital presence, and scale with performance marketing.",
            url: "https://braniva.in",
            contact: "hello@braniva.in",
            logo: "https://braniva.in/logo.png",
        },
        transport: {
            type: "http",
            endpoint: "https://braniva.in/api",
        },
        capabilities: {
            resources: [
                {
                    name: "blogs",
                    description: "Published blog posts and insights from Braniva",
                    endpoint: "https://braniva.in/api/blogs",
                    methods: ["GET"],
                },
                {
                    name: "faqs",
                    description: "Frequently asked questions about Braniva's services",
                    endpoint: "https://braniva.in/api/faqs",
                    methods: ["GET"],
                },
                {
                    name: "gallery",
                    description: "Portfolio and case study work",
                    endpoint: "https://braniva.in/api/gallery",
                    methods: ["GET"],
                },
                {
                    name: "testimonials",
                    description: "Client testimonials and reviews",
                    endpoint: "https://braniva.in/api/testimonials",
                    methods: ["GET"],
                },
            ],
            tools: [
                {
                    name: "contact",
                    description: "Submit an enquiry to Braniva's team",
                    endpoint: "https://braniva.in/api/contact",
                    methods: ["POST"],
                    inputSchema: {
                        type: "object",
                        required: ["name", "email", "message"],
                        properties: {
                            name: { type: "string", description: "Full name" },
                            email: { type: "string", format: "email", description: "Email address" },
                            message: { type: "string", description: "Your message or enquiry" },
                            service: { type: "string", description: "Service you're interested in (optional)" },
                        },
                    },
                },
            ],
        },
        discovery: {
            apiCatalog: "https://braniva.in/.well-known/api-catalog",
            agentSkills: "https://braniva.in/.well-known/agent-skills/index.json",
        },
    };

    return NextResponse.json(serverCard, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
