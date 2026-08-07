import { NextResponse } from 'next/server';

// RFC 9727 — API Catalog
// Returns a linkset+json describing Braniva's public API surface
export async function GET() {
    const catalog = {
        linkset: [
            {
                anchor: "https://braniva.in/api/blogs",
                "service-desc": [{ href: "https://braniva.in/openapi.json", type: "application/openapi+json" }],
                "service-doc": [{ href: "https://braniva.in/api/blogs", type: "application/json" }],
                status: [{ href: "https://braniva.in/api/blogs?limit=1", type: "application/json" }],
            },
            {
                anchor: "https://braniva.in/api/faqs",
                "service-doc": [{ href: "https://braniva.in/api/faqs", type: "application/json" }],
                status: [{ href: "https://braniva.in/api/faqs?limit=1", type: "application/json" }],
            },
            {
                anchor: "https://braniva.in/api/gallery",
                "service-doc": [{ href: "https://braniva.in/api/gallery", type: "application/json" }],
                status: [{ href: "https://braniva.in/api/gallery", type: "application/json" }],
            },
            {
                anchor: "https://braniva.in/api/contact",
                "service-doc": [{ href: "https://braniva.in/api/contact", type: "application/json" }],
            },
        ],
    };

    return NextResponse.json(catalog, {
        headers: {
            "Content-Type": "application/linkset+json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
