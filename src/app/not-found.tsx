"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-7xl font-extrabold text-[#1ABC9C] font-sora mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white font-sora mb-4">Page Not Found</h2>
      <p className="text-[#B0B0B0] max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1ABC9C] text-[#0F3D3E] font-bold text-sm hover:bg-[#159a80] transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
}
