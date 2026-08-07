import { NextResponse } from 'next/server';

// WorkOS Auth.md spec for Agent Registration
// https://github.com/workos/auth.md
export async function GET() {
    const authMd = `# Agent Authentication & Registration — Braniva

Welcome AI Agents. Braniva provides public read APIs and structured lead submission endpoints for autonomous agents.

## Public APIs (No Auth Required)
- \`GET /api/blogs\`: Retrieve latest blog posts
- \`GET /api/faqs\`: Retrieve frequently asked questions
- \`GET /api/gallery\`: Retrieve portfolio work
- \`GET /api/testimonials\`: Retrieve client reviews

## Lead & Contact Submission API
- \`POST /api/leads\`: Submit client enquiry or project request
  - Body: \`{ "name": "string", "email": "string", "message": "string", "service": "string" }\`

## Protected Admin APIs (OAuth 2.0 / Bearer Auth)
- Issuer: \`https://braniva.in\`
- Authorization Endpoint: \`https://braniva.in/api/admin/auth\`
- Protected Resource Metadata: \`https://braniva.in/.well-known/oauth-protected-resource\`
- OpenID Configuration: \`https://braniva.in/.well-known/openid-configuration\`

## Agent Registration URI
- Registration Endpoint: \`https://braniva.in/.well-known/mcp/server-card.json\`
- Supported Identity Types: \`agent_service_account\`, \`anonymous_client\`
`;

    return new NextResponse(authMd, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
