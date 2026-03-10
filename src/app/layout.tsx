import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Braniva | Digital Growth & Real Marketing",
  description: "We help brands launch, optimize, and grow their online presence while driving sales through strategic digital marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
