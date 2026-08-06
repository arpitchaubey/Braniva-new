"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogsData, Blog } from "@/data/blogsData";

export default function BlogListingPage() {
    const [blogs, setBlogs] = useState<Blog[]>(blogsData);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/blogs")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setBlogs(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Filter blogs
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Marketplace Onboarding", "Marketing Strategy", "Listing Optimization", "Email & WhatsApp Marketing", "Website Development"];

    // Identify Featured post (most recent post matching the search filter)
    const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
    const remainingPosts = featuredPost ? filteredBlogs.slice(1) : [];

    return (
        <div className="w-full min-h-screen bg-[#0A0A0A] pt-28 md:pt-36 pb-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-[#1ABC9C] font-bold tracking-widest uppercase text-xs mb-3 inline-block">Insights & Knowledge</span>
                    <h1 className="text-4xl md:text-6xl font-bold font-sora text-white mb-6">The Braniva Blog</h1>
                    <p className="text-[#B0B0B0] text-base md:text-lg">
                        Learn how to optimize your listing organic ranking, implement automated retention flows, and launch store configurations.
                    </p>

                    {/* Search and Filters */}
                    <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-center">
                        <div className="w-full max-w-md relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#666]">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full bg-[#1A1A1A] border border-[#27272A] rounded-full pl-12 pr-6 py-3.5 text-white text-sm focus:outline-none focus:border-[#1ABC9C]/50 transition-colors shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-16">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${activeCategory === category ? "bg-[#1ABC9C] text-[#052222] border-[#1ABC9C]" : "bg-transparent text-[#B0B0B0] border-[#27272A] hover:border-[#1ABC9C]/50 hover:text-white"}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="border border-dashed border-[#27272A] rounded-3xl py-20 text-center text-[#B0B0B0]">
                        No articles found. Try another search or filter.
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* FEATURED POST */}
                        {featuredPost && searchQuery === "" && activeCategory === "All" && (
                            <div className="group relative bg-[#1C1C1E] border border-[#27272A] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-[#1ABC9C]/20 transition-all duration-500 shadow-2xl">
                                <Link href={`/blog/${featuredPost.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${featuredPost.title}`}></Link>
                                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden bg-[#1F1F1F]">
                                    <img
                                        src={featuredPost.image_url}
                                        alt={featuredPost.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="object-cover w-full h-full transform group-hover:scale-103 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121212] via-transparent to-transparent opacity-80 z-10"></div>
                                </div>
                                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-3 py-1 rounded-full">
                                            Featured • {featuredPost.category}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold font-sora text-white mt-6 mb-4 group-hover:text-[#1ABC9C] transition-colors leading-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-sm text-[#B0B0B0] leading-relaxed mb-6">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-4 text-xs text-[#666] mb-6">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#1ABC9C]" /> {featuredPost.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#1ABC9C]" /> {featuredPost.read_time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 pt-6 border-t border-[#27272A]">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#27272A] bg-[#1A1A1A]">
                                                <img
                                                    src={featuredPost.author_avatar}
                                                    alt={featuredPost.author_name}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white leading-none">{featuredPost.author_name}</p>
                                                <p className="text-xs text-[#666] mt-1">{featuredPost.author_role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GRID OF REMAINING/ALL POSTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(featuredPost && searchQuery === "" && activeCategory === "All" ? remainingPosts : filteredBlogs).map(blog => (
                                <div
                                    key={blog.id}
                                    className="group relative bg-[#1C1C1E] border border-[#27272A] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#1ABC9C]/20 transition-all duration-300 hover:-translate-y-1.5"
                                >
                                    <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${blog.title}`}></Link>
                                    <div>
                                        <div className="relative aspect-[16/10] bg-[#1F1F1F] overflow-hidden">
                                            <img
                                                src={blog.image_url}
                                                alt={blog.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80"></div>
                                            <div className="absolute bottom-4 left-4 z-10">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2 py-0.5 rounded-full">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-[10px] text-[#666] mb-3">
                                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1ABC9C]" /> {blog.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#1ABC9C]" /> {blog.read_time}</span>
                                            </div>
                                            <h3 className="text-base font-bold text-white font-sora mb-3 group-hover:text-[#1ABC9C] transition-colors line-clamp-2 leading-snug">
                                                {blog.title}
                                            </h3>
                                            <p className="text-xs text-[#B0B0B0] line-clamp-3 leading-relaxed">
                                                {blog.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t border-[#27272A] flex items-center gap-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#27272A] bg-[#121212]">
                                            <img
                                                src={blog.author_avatar}
                                                alt={blog.author_name}
                                                loading="lazy"
                                                decoding="async"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white leading-none">{blog.author_name}</p>
                                            <p className="text-[9px] text-[#666] mt-1">{blog.author_role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
