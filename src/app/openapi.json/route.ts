import { NextResponse } from 'next/server';

// OpenAPI 3.0 Spec with Machine Payment Protocol (MPP) extensions
export async function GET() {
    const openapi = {
        openapi: "3.0.3",
        info: {
            title: "Braniva API",
            description: "API for Braniva D2C growth agency — query blogs, FAQs, gallery, and submit leads.",
            version: "1.0.0",
        },
        servers: [
            { url: "https://braniva.in" }
        ],
        paths: {
            "/api/blogs": {
                get: {
                    summary: "Get Blog Posts",
                    description: "Fetch published blog posts from Braniva.",
                    parameters: [
                        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                        { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
                    ],
                    responses: {
                        "200": { description: "Array of blog posts" }
                    }
                }
            },
            "/api/faqs": {
                get: {
                    summary: "Get FAQs",
                    description: "Fetch frequently asked questions.",
                    responses: {
                        "200": { description: "Array of FAQs" }
                    }
                }
            },
            "/api/gallery": {
                get: {
                    summary: "Get Gallery Work",
                    description: "Fetch portfolio showcase items.",
                    responses: {
                        "200": { description: "Array of gallery items" }
                    }
                }
            },
            "/api/leads": {
                post: {
                    summary: "Submit Contact Lead",
                    description: "Submit a project or consultation request to Braniva.",
                    "x-payment-info": {
                        intent: "free",
                        method: "none",
                        amount: 0,
                        currency: "INR"
                    },
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["name", "email", "message"],
                                    properties: {
                                        name: { type: "string" },
                                        email: { type: "string", format: "email" },
                                        message: { type: "string" },
                                        service: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": { description: "Lead submitted successfully" }
                    }
                }
            }
        }
    };

    return NextResponse.json(openapi, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
