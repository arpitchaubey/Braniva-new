import { NextResponse } from 'next/server';

// DNS for AI Discovery (DNS-AID) Entrypoint Record Documentation
// https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
export async function GET() {
    const dnsAid = {
        domain: "braniva.in",
        status: "configured",
        dns_records: [
            {
                name: "_index._agents.braniva.in",
                type: "HTTPS / SVCB",
                target: "braniva.in",
                params: {
                    alpn: ["h2", "h3"],
                    port: 443,
                    endpoint: "https://braniva.in/.well-known/mcp/server-card.json",
                },
            },
            {
                name: "_a2a._agents.braniva.in",
                type: "HTTPS / SVCB",
                target: "braniva.in",
                params: {
                    alpn: ["h2", "h3"],
                    port: 443,
                    endpoint: "https://braniva.in/.well-known/agent-skills/index.json",
                },
            },
        ],
        dnssec_validation: true,
        discovery_index: "https://braniva.in/.well-known/agent-skills/index.json",
    };

    return NextResponse.json(dnsAid, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
