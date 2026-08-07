import { NextResponse } from 'next/server';

// RFC 8414 OAuth 2.0 Authorization Server Metadata
export async function GET() {
    const config = {
        issuer: "https://braniva.in",
        authorization_endpoint: "https://braniva.in/admin",
        token_endpoint: "https://braniva.in/api/admin/auth",
        grant_types_supported: ["client_credentials", "password"],
        response_types_supported: ["token"],
        token_endpoint_auth_methods_supported: ["client_secret_basic", "bearer"],
        scopes_supported: ["leads:write", "admin:read", "admin:write"],
        agent_auth: {
            register_uri: "https://braniva.in/auth.md",
            supported_identity_types: ["agent_service_account"],
            credential_types: ["bearer_token"],
        },
    };

    return NextResponse.json(config, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
