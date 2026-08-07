import { NextResponse } from 'next/server';

// OpenID Connect Discovery 1.0 / RFC 8414
export async function GET() {
    const config = {
        issuer: "https://braniva.in",
        authorization_endpoint: "https://braniva.in/admin",
        token_endpoint: "https://braniva.in/api/admin/auth",
        userinfo_endpoint: "https://braniva.in/api/admin/auth",
        jwks_uri: "https://braniva.in/.well-known/jwks.json",
        response_types_supported: ["token", "id_token"],
        subject_types_supported: ["public"],
        id_token_signing_alg_values_supported: ["RS256", "HS256"],
        scopes_supported: ["openid", "profile", "email", "leads:write", "admin:read"],
        token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
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
