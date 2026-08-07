import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const acceptHeader = req.headers.get('accept') || '';
  const isMarkdownRequested = acceptHeader.includes('text/markdown') || req.nextUrl.searchParams.get('format') === 'markdown';

  // If agent requests Markdown for HTML pages
  if (isMarkdownRequested && !req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/_next')) {
    const pathname = req.nextUrl.pathname;

    let markdownText = `# Braniva — E-commerce & Brand Growth Agency\n\n`;
    markdownText += `Website: https://braniva.in\nContact: hello@braniva.in\n\n`;

    if (pathname === '/') {
      markdownText += `## Build Brands. Scale Businesses. Drive Growth.\n\n`;
      markdownText += `Braniva is a full-service agency specializing in branding, Shopify development, UI/UX, CRO & digital marketing. We help startups and growing businesses increase conversions, grow revenue, and build brands people remember.\n\n`;
      markdownText += `### Services Offered:\n`;
      markdownText += `1. **Website Design & Development** — Custom E-commerce Websites on Shopify & Next.js\n`;
      markdownText += `2. **Marketplace Setup & Onboarding** — Amazon, Flipkart, Nykaa, Myntra, Ajio, Tata Cliq\n`;
      markdownText += `3. **Logistics Onboarding** — Shiprocket, Delhivery, Blue Dart integration & RTO reduction\n`;
      markdownText += `4. **Marketing Strategy** — Performance Marketing (Meta & Google Ads) & Launch campaigns\n`;
      markdownText += `5. **Product Listing Optimization** — EBC / A+ content & SEO keyword optimization\n`;
      markdownText += `6. **Email Marketing Automation** — Klaviyo abandoned cart & retention flows\n`;
      markdownText += `7. **WhatsApp Marketing Campaigns** — Direct broadcasts & automated catalog commerce\n`;
      markdownText += `8. **Brand Identity** — Logo architecture, color systems, and visual guidelines\n\n`;
      markdownText += `### How We Work:\n`;
      markdownText += `- **1. Discovery Call**: We listen first and understand your goals.\n`;
      markdownText += `- **2. Scope & Roadmap**: Define clear deliverables and timeline.\n`;
      markdownText += `- **3. Preparation**: Competitor analysis & strategic positioning.\n`;
      markdownText += `- **4. Build & Execute**: Deliver listings, campaigns, and storefronts.\n`;
      markdownText += `- **5. Launch & Review**: Post-launch monitoring and optimization.\n`;
      markdownText += `- **6. Optimise & Grow**: Data-driven scaling.\n\n`;
      markdownText += `### Agent Capabilities & API:\n`;
      markdownText += `- API Catalog: https://braniva.in/.well-known/api-catalog\n`;
      markdownText += `- Agent Skills: https://braniva.in/.well-known/agent-skills/index.json\n`;
      markdownText += `- MCP Server Card: https://braniva.in/.well-known/mcp/server-card.json\n`;
      markdownText += `- Contact API: POST https://braniva.in/api/leads\n`;
    } else if (pathname.startsWith('/services')) {
      markdownText += `## Services — Braniva\n\n`;
      markdownText += `Explore our core services for launching and scaling D2C brands in India.\n`;
      markdownText += `- Website Design & Development: https://braniva.in/services/web\n`;
      markdownText += `- Marketplace Onboarding: https://braniva.in/services/marketplace\n`;
      markdownText += `- Logistics Integration: https://braniva.in/services/logistics\n`;
      markdownText += `- Marketing Strategy: https://braniva.in/services/marketing\n`;
    } else {
      markdownText += `## Braniva Resource\n\nRequested Path: ${pathname}\nVisit https://braniva.in for details.\n`;
    }

    return new NextResponse(markdownText, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': '650',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brand-logo.png|logo.png).*)'],
};
