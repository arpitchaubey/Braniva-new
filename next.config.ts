import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude Three.js from server bundle — it's only used client-side via dynamic()
  serverExternalPackages: ["three", "cloudinary"],

  images: {
    // Allow Cloudinary and common image CDNs
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
    // WebP conversion for all images
    formats: ["image/avif", "image/webp"],
  },

  // Minimize bundle size by removing source maps in production
  productionBrowserSourceMaps: false,

  // Compress server responses
  compress: true,

  // Experimental: faster builds and smaller bundles
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
    ],
  },

  // RFC 8288 Link headers for AI agent discovery
  async headers() {
    return [
      {
        // Homepage — advertise agent-discovery endpoints
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
            ].join(", "),
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        // Well-known JSON endpoints — correct content types
        source: "/.well-known/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
