import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import TrafficTracker from "@/components/layout/TrafficTracker";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GA_MEASUREMENT_ID = "G-WETJ53C5L8";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://braniva.in"),
  title: {
    default: "Braniva | Scale Your Brand Beyond Limits",
    template: "%s | Braniva",
  },
  description:
    "Full-service branding, Shopify development, UI/UX, CRO & performance marketing agency. We help Indian startups and D2C brands launch, optimize listings, and scale revenue.",
  keywords: [
    "Braniva",
    "D2C Agency India",
    "Shopify Development Agency",
    "Marketplace Onboarding Amazon Flipkart Nykaa",
    "Performance Marketing Agency India",
    "Product Listing Optimization",
    "Brand Identity Design",
    "CRO Agency",
    "Logistics Onboarding",
    "WhatsApp Marketing Campaigns",
  ],
  authors: [{ name: "Braniva Team", url: "https://braniva.in" }],
  creator: "Braniva",
  publisher: "Braniva",
  alternates: {
    canonical: "https://braniva.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://braniva.in",
    siteName: "Braniva",
    title: "Braniva | Scale Your Brand Beyond Limits",
    description:
      "Full-service branding, Shopify development, UI/UX, CRO & performance marketing agency. We help Indian startups and D2C brands launch, optimize listings, and scale revenue.",
    images: [
      {
        url: "/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Braniva - Scale Your Brand Beyond Limits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braniva | Scale Your Brand Beyond Limits",
    description:
      "Full-service branding, Shopify development, UI/UX, CRO & performance marketing agency. We help Indian startups and D2C brands launch, optimize listings, and scale revenue.",
    images: ["/brand-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://braniva.in/#organization",
      "name": "Braniva",
      "url": "https://braniva.in",
      "logo": "https://braniva.in/logo.png",
      "image": "https://braniva.in/brand-logo.png",
      "email": "hello@braniva.in",
      "description":
        "Braniva is a full-service branding, Shopify development, UI/UX, CRO, and digital marketing agency helping startups and growing businesses increase conversions and scale revenue.",
    },
    {
      "@type": "WebSite",
      "@id": "https://braniva.in/#website",
      "url": "https://braniva.in",
      "name": "Braniva",
      "publisher": { "@id": "https://braniva.in/#organization" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://braniva.in/#service",
      "name": "Braniva E-commerce & Brand Growth Agency",
      "url": "https://braniva.in",
      "logo": "https://braniva.in/logo.png",
      "image": "https://braniva.in/brand-logo.png",
      "priceRange": "$$",
      "areaServed": "India",
      "serviceType": [
        "Shopify Development",
        "Marketplace Onboarding",
        "E-commerce Performance Marketing",
        "Product Listing Optimization",
        "Brand Identity Design",
        "Email Marketing Automation",
        "WhatsApp Marketing Campaigns",
      ],
    },
  ],
};

import WebMCPProvider from "@/components/layout/WebMCPProvider";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${sora.variable} antialiased min-h-screen flex flex-col bg-[#0A0A0A] text-white`}
      >
        <SmoothScroll>
          <GoogleAnalytics />
          <WebMCPProvider />
          <TrafficTracker />
          <AnimatedBackground />

          <Navbar />
          <main id="main-content" role="main" className="flex-grow z-10 relative">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
