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
};

export default nextConfig;
