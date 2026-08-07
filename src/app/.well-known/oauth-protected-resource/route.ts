import { NextResponse } from 'next/server';

// RFC 9728 OAuth Protected Resource Metadata
export async function GET() {
    const resourceMetadata = {
        resource: "https://braniva.in/api",
        authorization_servers: ["https://braniva.in"],
        scopes_supported: ["leads:write", "admin:read", "admin:write"],
        bearer_methods_supported: ["header"],
        documentation: "https://braniva.in/auth.md",
    };

    return NextResponse.json(resourceMetadata, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
