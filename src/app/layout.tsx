import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Braniva | Scale Your Brand Beyond Limits",
  description: "We help brands launch, optimize, and grow their online presence while driving sales through strategic digital marketing.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} antialiased min-h-screen flex flex-col bg-[#0A0A0A] text-white`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="flex-grow z-10 relative mt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
