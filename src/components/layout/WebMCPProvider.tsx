"use client";

import { useEffect } from "react";

// WebMCP (Web Model Context Protocol) API
// https://webmachinelearning.github.io/webmcp/
export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const webMcpTools = [
      {
        name: "schedule_call",
        description: "Redirect or schedule a 20-minute consultation call with Braniva.",
        inputSchema: {
          type: "object",
          properties: {
            serviceInterest: { type: "string", description: "Service interested in" },
          },
        },
        execute: async (args: { serviceInterest?: string }) => {
          window.location.href = `/schedule${args?.serviceInterest ? `?service=${encodeURIComponent(args.serviceInterest)}` : ""}`;
          return { status: "redirecting", url: "/schedule" };
        },
      },
      {
        name: "submit_lead",
        description: "Submit a project lead or enquiry to Braniva's team.",
        inputSchema: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            message: { type: "string" },
            service: { type: "string" },
          },
        },
        execute: async (args: { name: string; email: string; message: string; service?: string }) => {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(args),
          });
          return await res.json();
        },
      },
    ];

    // Expose via WebMCP standard
    const nav = window.navigator as unknown as { modelContext?: { provideContext: (ctx: unknown) => void } };
    if (nav.modelContext && typeof nav.modelContext.provideContext === "function") {
      try {
        nav.modelContext.provideContext({ tools: webMcpTools });
      } catch (err) {
        console.warn("WebMCP registration warning:", err);
      }
    }

    // Polyfill global for AI browser extensions
    (window as unknown as Record<string, unknown>).__WEBMCP_TOOLS__ = webMcpTools;
  }, []);

  return null;
}
