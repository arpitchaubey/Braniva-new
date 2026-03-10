import React from "react";
import {
    ShoppingCart,
    Megaphone,
    Truck,
    BarChart3,
    Mail,
    MessageSquare,
    Globe,
    Palette,
} from "lucide-react";

export type ServiceFeature = {
    title: string;
    description: string;
};

export type ServiceItem = {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    shortDesc: string;
    detailedDescription: string[]; // For paragraphs on the detailed page
    benefits: string[];
    process: { title: string; description: string }[];
    features: string[]; // specifically for the services/page.tsx summary card
};

export const servicesData: ServiceItem[] = [
    {
        id: "marketplace",
        icon: <ShoppingCart className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Marketplace Setup & Onboarding",
        subtitle: "Launch Your Brand on Amazon, Flipkart, Nykaa, Ajio, Tata Cliq, Aza, Pernia, Sverve and more.",
        shortDesc: "Complete seller account setup and launch support for top marketplaces.",
        detailedDescription: [
            "We handle the end-to-end operational heavy lifting required to get your brand live across India's top e-commerce ecosystems, including Amazon, Flipkart, Myntra, Nykaa, Ajio, Tata Cliq, JioMart, Aza, Pernia's Pop-Up Shop, and Sverve.",
            "Our team manages the complexities of brand registry, GTIN exemptions, category gating, and platform-specific compliance. We structure your initial product catalog to meet the exact indexing criteria required by each unique algorithm, ensuring your brand launches smoothly without rejection delays."
        ],
        features: ["Multi-platform Seller Setup", "Brand Registry & IP Protection", "Category Ungating", "Platform-specific Compliance", "Inventory Synchronization Setup"],
        benefits: [
            "Immediate access to millions of existing high-intent shoppers.",
            "Complete elimination of onboarding friction and rejection delays.",
            "Optimized foundational SEO for maximum day-one visibility.",
            "Guarantee of 100% adherence to constantly changing marketplace guidelines."
        ],
        process: [
            { title: "Platform Strategy", description: "Selecting the right mix of marketplaces (e.g., fashion vs. electronics) for your brand." },
            { title: "Account & Brand Registry", description: "Registering seller accounts and verifying your trademark for brand protection." },
            { title: "Catalog Architecture", description: "Structuring your product variants and attributes to fit complex backend requirements." },
            { title: "Compliance Check & Launch", description: "Validating all data against platform policies before hitting the live switch." }
        ]
    },
    {
        id: "marketing",
        icon: <Megaphone className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Marketing Strategy",
        subtitle: "Explosive Growth through Multi-Channel Campaigns",
        shortDesc: "Comprehensive campaigns across Google Ads, Meta Ads, Performance Marketing, and Influencer channels.",
        detailedDescription: [
            "We deploy high ROI performance marketing architectures utilizing Google Ads (Search, Shopping, Display, Performance Max), Meta Ads (Facebook & Instagram), TikTok Ads, and Programmatic networks like Criteo.",
            "Beyond sheer ad spend, we integrate deeply vetted, niche-specific Influencer Marketing pipelines. By fusing data-driven split-testing with authentic creator social proof, we build sustainable customer acquisition funnels that scale profitably."
        ],
        features: ["Google Performance Max", "Advanced Meta Pixel Tracking", "Influencer Pipeline Management", "Retargeting Architectures", "Conversion API (CAPI) Integration"],
        benefits: [
            "Maximized Return on Ad Spend (ROAS) and lowered CPA.",
            "Diversified traffic sources to reduce reliance on a single platform.",
            "Granular audience targeting using lookalike and predictive models.",
            "Authentic social proof and credibility through structured influencer partnerships."
        ],
        process: [
            { title: "Market & Audience Mapping", description: "Identifying your highly profitable customer segments using predictive data." },
            { title: "Conversion Architecture", description: "Implementing Meta CAPI and Google Tag Manager for flawless tracking." },
            { title: "Creative & Ad Launch", description: "Deploying high-converting diverse creatives across targeted ad networks." },
            { title: "Continuous Optimization", description: "Aggressive A/B testing, bid adjustments, and budget scaling based on real-time ROAS." }
        ]
    },
    {
        id: "logistics",
        icon: <Truck className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Logistics Onboarding",
        subtitle: "Seamless Shipping and Fulfillment Integration",
        shortDesc: "Seamless shipping integration with top partners like DTDC, Shiprocket, and Delhivery.",
        detailedDescription: [
            "Fulfillment is the backbone of e-commerce. A poor delivery experience will break your brand, regardless of how good the product is. We consult and integrate your technical stack tightly with premium logistics aggregators and carriers.",
            "We facilitate automated integration with top-tier partners including Merchant, DTDC, Shiprocket, Delhivery, Xpressbees, Shadowfax, Blue Dart, and Ecom Express. We focus heavily on minimizing RTOs and automating NDR (Non-Delivery Report) management."
        ],
        features: ["Aggregator API Integration", "NDR Automation Workflows", "Live Tracking Post-Purchase", "Carrier Optimization Logic"],
        benefits: [
            "Negotiated volume shipping rates through established carrier partnerships.",
            "Fully automated order syncing, label generation, and dispatch tracking.",
            "Drastically reduced RTO (Return to Origin) rates via automated verification.",
            "A seamless, fully transparent post-purchase tracking experience for buyers."
        ],
        process: [
            { title: "Carrier Selection", description: "Finding the best courier mix based on your primary geographic zones and weights." },
            { title: "Platform Integration", description: "Linking the courier API dashboards directly to your Shopify/custom CMS." },
            { title: "Workflow Automation", description: "Setting up automated label generation, manifesting, and pickup scheduling." },
            { title: "RTO Management", description: "Implementing verified COD checks and automated NDR follow-up systems." }
        ]
    },
    {
        id: "listing",
        icon: <BarChart3 className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Product Listing Optimization",
        subtitle: "SEO-Optimized Listings to Increase Visibility and Conversion Rates",
        shortDesc: "SEO-optimized listings designed to improve search visibility and conversion rates.",
        detailedDescription: [
            "In marketplace algorithms (like Amazon's A9), visibility equals velocity. We utilize advanced data tools like Helium10, JungleScout, and DataHawk to scrape long-tail, high-converting semantic keywords.",
            "We craft highly optimized listings featuring persuasive copywriting, strategic backend search terms, dynamic A+ (Enhanced Brand Content), and visually striking hero images to dominate organic search results and maximize click-through rates."
        ],
        features: ["A+/Enhanced Brand Content", "Semantic Keyword Ingestion", "Backend Search Term Optimization", "Competitor Gap Analysis"],
        benefits: [
            "Drastically higher organic search ranking against entrenched competitors.",
            "Increased click-through rates (CTR) from optimized primary hero images.",
            "Higher conversion velocity from deeply persuasive copy and rich media specs.",
            "Protection against hijacking and unauthorized listing modifications."
        ],
        process: [
            { title: "Algorithmic Keyword Research", description: "Discovering high-volume, low-competition search terms via Helium10/JungleScout." },
            { title: "Sales Copywriting", description: "Drafting persuasive, benefit-driven titles, bullet points, and HTML descriptions." },
            { title: "A+ / EBC Design", description: "Graphic design for rich visual storytelling and comparative product matrices." },
            { title: "Performance Tuning", description: "Monitoring organic listing rank daily and adjusting content for seasonality." }
        ]
    },
    {
        id: "email",
        icon: <Mail className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Email Marketing Automation",
        subtitle: "Nurture Leads and Accelerate Repeat Purchases",
        shortDesc: "Strategic automated journeys that nurture leads and strengthen customer relationships.",
        detailedDescription: [
            "Your email list is a high-margin asset you fully own. Using enterprise-grade ESPs like Klaviyo, Mailchimp, Omnisend, and Brevo, we build sophisticated architectures that drive baseline revenue entirely on autopilot.",
            "By implementing strict RFM (Recency, Frequency, Monetary) dynamic segmentation and strategic multi-trigger flow journeys—ranging from robust welcome series to multi-step cart abandonment and targeted win-back sequences—we massively increase Customer Lifetime Value (LTV)."
        ],
        features: ["Klaviyo / Omnisend Setup", "Dynamic RFM Segmentation", "Cart Abandonment Automations", "Post-Purchase Upsell Flows", "Custom HTML Templates"],
        benefits: [
            "Substantial baseline revenue generation without requiring daily ad spend.",
            "Deepened brand identity and personalized customer retention over time.",
            "Significantly higher recovery rates on abandoned shopping carts and browsers.",
            "Automated review collection and referral generation."
        ],
        process: [
            { title: "ESP Configuration", description: "Setting up Klaviyo/Omnisend, configuring DNS records, and warming up sender domains." },
            { title: "Flow Architecture", description: "Mapping out complex, conditional customer lifecycle journeys." },
            { title: "Email Design", description: "Creating heavily styled, conversion-optimized, responsive custom HTML templates." },
            { title: "Data Synchronization", description: "Integrating Shopify tracking to trigger flows based on specific behavioral events." }
        ]
    },
    {
        id: "whatsapp",
        icon: <MessageSquare className="w-12 h-12 text-[#1ABC9C]" />,
        title: "WhatsApp Marketing Campaigns",
        subtitle: "Direct Engagement for Higher Conversions",
        shortDesc: "Targeted broadcast promotions and automated messaging to improve retention.",
        detailedDescription: [
            "WhatsApp boasts an average open rate of 98%, making it the most critical direct channel in regions like India. We integrate the official WhatsApp Business API using platforms like Interakt, Wati, Gupshup, or LimeChat.",
            "We handle the paperwork for official Green-Tick verification and deploy automated conversational commerce logic. This includes abandoned cart recovery via WhatsApp, automated shipping updates, and highly targeted, interactive promotional broadcasts with rich media catalogs."
        ],
        features: ["Official API Setup (Wati/Interakt)", "Green-Tick Verification Support", "Automated Catalog Commerce", "Two-way Conversational Support", "Interactive Button Broadcasts"],
        benefits: [
            "Incredibly high immediate open and read rates compared to traditional SMS/Email.",
            "Lowered RTOs through automated address verification and COD confirmation flows.",
            "Direct, highly conversational channel for rapid flash sales and VIP drops.",
            "Automated post-purchase relationship building with immediate feedback collection."
        ],
        process: [
            { title: "API Deployment", description: "Establishing Business API access via official BSPs and applying for verification." },
            { title: "Template Library", description: "Designing and getting approval for highly interactive, rich media message templates." },
            { title: "Trigger Automation", description: "Linking abandoned cart and order status signals directly to WhatsApp dispatch." },
            { title: "Broadcast Execution", description: "Segmenting customer lists for compliant, high-ROI promotional blasts." }
        ]
    },
    {
        id: "web",
        icon: <Globe className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Website Design & Development",
        subtitle: "Custom E-commerce Websites that Convert",
        shortDesc: "Custom business websites designed to improve credibility and convert visitors.",
        detailedDescription: [
            "A fast, beautifully designed digital storefront establishes instant authority. We develop high-performance e-commerce platforms extending from heavily customized Shopify Plus setups to entirely custom, headless commerce applications built on Next.js, React, and Node.js.",
            "We prioritize mobile-first Core Web Vitals, implementing advanced CSS animations with Framer Motion, GSAP, and robust backend integrations on Vercel/AWS scalable infrastructure. Our goal is sub-second load times and zero-friction checkout funnels."
        ],
        features: ["Shopify Plus Customization", "Headless React/Next.js Apps", "Framer Motion Micro-interactions", "Advanced CRO (Conversion Optimization)", "Vercel Edge Deployment"],
        benefits: [
            "A completely bespoke, premium digital aesthetic tailored strictly to your brand guidelines.",
            "Lightning-fast Edge/Server-Side rendered pages for peak SEO and minimal bounce rates.",
            "Extensively tested specific checkout UI/UX flows engineered to reduce friction.",
            "Enterprise-scale architecture capable of easily handling intense viral traffic spikes."
        ],
        process: [
            { title: "Figma UI/UX Prototyping", description: "Wireframing user intent flows and designing pixel-perfect mockups." },
            { title: "Frontend Engineering", description: "Building responsive, modern, highly animated interfaces in React/Next.js." },
            { title: "Backend/CMS Integration", description: "Connecting databases, Shopify Liquid, headless inventory, and payment gateways." },
            { title: "QA & Optimization", description: "Rigorous cross-browser testing, SEO crawling, and lighthouse speed tuning." }
        ]
    },
    {
        id: "brand-identity",
        icon: <Palette className="w-12 h-12 text-[#1ABC9C]" />,
        title: "Brand Identity",
        subtitle: "Crafting Memorable and Distinct Brand Experiences",
        shortDesc: "Crafting memorable visual identities and guidelines that resonate with your target audience.",
        detailedDescription: [
            "Commoditized products compete on price; distinct brands compete on value. We construct cohesive, psychological visual identities from the ground up using Adobe Creative Suite, Figma, and After Effects for motion graphics.",
            "Our agency delivers comprehensive brand ecosystems. This includes bespoke logo architecture, strict typographic and color systems, brand voice positioning documentation, and scalable digital/print collateral guidelines that guarantee omni-channel consistency."
        ],
        features: ["Bespoke Logo Architecture", "Comprehensive Brand Guidelines", "Typography & Color Systems", "Motion Graphic Identity", "Competitive Visual Positioning"],
        benefits: [
            "Instant premium recognition and immediate consumer trust within crowded markets.",
            "Flawless visual consistency across packaging, web interfaces, and performance ads.",
            "A strong emotional, psychological connection with your specific target demographic.",
            "A perceived value elevation that effortlessly justifies higher price points and margins."
        ],
        process: [
            { title: "Market Discovery", description: "Auditing competitor visual positioning and defining your unique brand archetypes." },
            { title: "Concept Generation", description: "Drafting varied visual identity directions, moodboards, and symbolic logos." },
            { title: "System Refinement", description: "Locking in exact hex codes, typographic hierarchies, and layout structures." },
            { title: "Asset Delivery", description: "Providing a massive, scalable vector library and a rigorous PDF brand rulebook." }
        ]
    },
];
