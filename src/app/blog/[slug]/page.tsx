"use client";

import { useState, useEffect, use } from "react";
import { Calendar, Clock, ArrowLeft, Share2, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogsData, Blog } from "@/data/blogsData";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const initialBlog = blogsData.find(b => b.slug === slug) || null;
    const [blog, setBlog] = useState<Blog | null>(initialBlog);
    const [loading, setLoading] = useState(!initialBlog);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch(`/api/blogs?slug=${slug}`)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Post not found");
            })
            .then(data => setBlog(data))
            .catch(err => {
                console.error(err);
                if (!blog) {
                    const fallback = blogsData.find(b => b.slug === slug);
                    if (fallback) setBlog(fallback);
                }
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to render simple text blocks as formatted React components
    const renderContent = (content: string) => {
        if (!content) return null;

        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        
        let currentList: { type: 'ul' | 'ol', items: string[] } | null = null;
        let currentParagraph: string[] = [];

        const flushParagraph = (key: string | number) => {
            if (currentParagraph.length > 0) {
                const text = currentParagraph.join(' ');
                currentParagraph = [];
                elements.push(
                    <p key={`p-${key}`} className="text-sm md:text-base text-[#B0B0B0] leading-relaxed mb-6 font-normal">
                        {parseInlineStyles(text)}
                    </p>
                );
            }
        };

        const flushList = (key: string | number) => {
            if (currentList) {
                const { type, items } = currentList;
                currentList = null;

                const listElements = items.map((item, idx) => (
                    <li key={`li-${idx}`} className="mb-2 last:mb-0">
                        {parseInlineStyles(item)}
                    </li>
                ));

                if (type === 'ul') {
                    elements.push(
                        <ul key={`ul-${key}`} className="space-y-2.5 my-6 pl-6 list-disc text-[#B0B0B0] text-sm md:text-base leading-relaxed">
                            {listElements}
                        </ul>
                    );
                } else {
                    elements.push(
                        <ol key={`ol-${key}`} className="space-y-2.5 my-6 pl-6 list-decimal text-[#B0B0B0] text-sm md:text-base leading-relaxed">
                            {listElements}
                        </ol>
                    );
                }
            }
        };

        const parseInlineStyles = (text: string) => {
            const parts = text.split(/\*\*(.*?)\*\*/g);
            return parts.map((part, index) => {
                if (index % 2 === 1) {
                    return <strong key={index} className="text-white font-semibold">{part}</strong>;
                }
                return part;
            });
        };

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) {
                flushParagraph(index);
                flushList(index);
                return;
            }

            if (trimmed.startsWith('## ')) {
                flushParagraph(index);
                flushList(index);
                elements.push(
                    <h2 key={`h2-${index}`} className="text-2xl md:text-3xl font-bold font-sora text-white mt-12 mb-4 tracking-tight">
                        {parseInlineStyles(trimmed.substring(3))}
                    </h2>
                );
            } else if (trimmed.startsWith('### ')) {
                flushParagraph(index);
                flushList(index);
                elements.push(
                    <h3 key={`h3-${index}`} className="text-xl md:text-2xl font-bold font-sora text-white mt-10 mb-4 tracking-tight">
                        {parseInlineStyles(trimmed.substring(4))}
                    </h3>
                );
            } else if (trimmed.startsWith('#### ')) {
                flushParagraph(index);
                flushList(index);
                elements.push(
                    <h4 key={`h4-${index}`} className="text-lg font-bold font-sora text-[#1ABC9C] mt-8 mb-3 tracking-tight">
                        {parseInlineStyles(trimmed.substring(5))}
                    </h4>
                );
            } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                flushParagraph(index);
                const itemText = trimmed.startsWith('• ') ? trimmed.substring(2) : trimmed.substring(2);
                if (currentList && currentList.type === 'ul') {
                    currentList.items.push(itemText);
                } else {
                    flushList(index);
                    currentList = { type: 'ul', items: [itemText] };
                }
            } else if (/^\d+\.\s+/.test(trimmed)) {
                flushParagraph(index);
                const match = trimmed.match(/^(\d+)\.\s+(.*)/);
                const itemText = match ? match[2] : trimmed;
                if (currentList && currentList.type === 'ol') {
                    currentList.items.push(itemText);
                } else {
                    flushList(index);
                    currentList = { type: 'ol', items: [itemText] };
                }
            } else {
                flushList(index);
                currentParagraph.push(trimmed);
            }
        });

        flushParagraph('end');
        flushList('end');

        return elements;
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0A]">
                <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0A0A0A] px-6 text-center">
                <h1 className="text-3xl font-bold font-sora text-white mb-4">Article Not Found</h1>
                <p className="text-[#B0B0B0] mb-8 max-w-sm">The article you are looking for might have been deleted or the URL is incorrect.</p>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1ABC9C] text-[#052222] font-bold text-xs hover:bg-[#1dd3af] transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] pb-24 relative overflow-hidden">


            <article className="max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-20 relative z-10">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-[#B0B0B0] hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Articles
                </Link>

                {/* Meta details */}
                <div className="mb-6 flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-3 py-1 rounded-full">
                        {blog.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-[#666]">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.read_time}</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-sora text-white tracking-tight mb-8 leading-[1.15]">
                    {blog.title}
                </h1>

                {/* Author card & Share button */}
                <div className="flex items-center justify-between border-y border-[#1F1F1F] py-5 mb-12">
                    <div className="flex items-center gap-3.5">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#27272A] bg-[#1A1A1A]">
                            <img
                                src={blog.author_avatar}
                                alt={blog.author_name}
                                loading="lazy"
                                decoding="async"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-none">{blog.author_name}</p>
                            <p className="text-xs text-[#B0B0B0] mt-1">{blog.author_role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#27272A] hover:bg-[#27272A] text-xs text-white font-medium transition-colors cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-[#1ABC9C]" /> Link Copied
                            </>
                        ) : (
                            <>
                                <Share2 className="w-3.5 h-3.5 text-[#B0B0B0]" /> Share Article
                            </>
                        )}
                    </button>
                </div>

                {/* Featured Cover Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-[#27272A] shadow-2xl bg-[#1F1F1F]">
                    <img
                        src={blog.image_url}
                        alt={blog.title}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40"></div>
                </div>

                {/* Main Content Body */}
                <div className="prose prose-invert max-w-none text-left">
                    {renderContent(blog.content)}
                </div>

                {/* Bottom Author Card */}
                <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 bg-[#121212] p-8 rounded-3xl border border-[#27272A]">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1ABC9C]/40 bg-[#1A1A1A] shrink-0">
                        <img
                            src={blog.author_avatar}
                            alt={blog.author_name}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h4 className="text-lg font-bold font-sora text-white mb-1">Written by {blog.author_name}</h4>
                        <p className="text-xs text-[#1ABC9C] font-semibold uppercase tracking-wider mb-3">{blog.author_role}</p>
                        <p className="text-xs text-[#B0B0B0] leading-relaxed">
                            Arpit and the Braniva team specialize in scaling D2C e-commerce brands on marketplaces and driving double-digit conversions via intelligent direct-response marketing.
                        </p>
                    </div>
                </div>

                {/* Final CTA link */}
                <div className="mt-16 text-center">
                    <p className="text-[#B0B0B0] text-sm mb-4">Want to implement these strategies for your brand?</p>
                    <Link
                        href="/schedule"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1ABC9C] hover:text-[#1dd3af] transition-colors border-b border-[#1ABC9C]/30 pb-1"
                    >
                        Schedule a Free Strategy Call <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </div>
    );
}
