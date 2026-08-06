"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, LogOut, Check, X, ShieldAlert, Sparkles, BookOpen, MessageSquare, Briefcase, ExternalLink, Upload, Image as ImageIcon, Quote, BarChart3, PhoneCall, CalendarDays, Mail, UserCheck, Clock, ArrowUpRight, Activity, TrendingUp, Eye, Users, CheckCircle2 } from "lucide-react";

type Blog = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    read_time: string;
    date: string;
    author_name: string;
    author_role: string;
    author_avatar: string;
    image_url: string;
};

type FAQ = {
    id: number;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
};

type CaseStudy = {
    id: number;
    slug: string;
    title: string;
    category: string;
    overview: string;
    challenge: string;
    approach: string; // JSON string representing { title: string, description: string }[]
    outcome: string;
};

type ApproachStep = {
    title: string;
    description: string;
};

type GalleryItem = {
    id: string | number;
    title: string;
    category: string;
    client: string;
    imageUrl: string;
    description: string;
    metrics: string;
};

type Testimonial = {
    id: string | number;
    name: string;
    role: string;
    quote: string;
    avatar: string;
    rating: number;
};

type LeadItem = {
    id: string | number;
    lead_type: string;
    name: string;
    email: string;
    phone: string;
    business_type: string;
    company_name?: string;
    message?: string;
    meeting_date?: string;
    meeting_time?: string;
    created_at?: string;
};

export default function AdminPortal() {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    // Dashboard State
    const [activeTab, setActiveTab] = useState<"traffic" | "contact" | "schedule" | "blogs" | "faqs" | "cases" | "gallery" | "testimonials">("traffic");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [leads, setLeads] = useState<LeadItem[]>([]);
    const [analyticsData, setAnalyticsData] = useState<{
        totalViews: number;
        uniqueVisitors: number;
        topPages: { path: string; count: number }[];
        channelCounts: Record<string, number>;
        recentEvents: any[];
    }>({
        totalViews: 0,
        uniqueVisitors: 0,
        topPages: [],
        channelCounts: { 'Direct': 0, 'Google Organic': 0, 'Social Media': 0, 'Referral': 0 },
        recentEvents: []
    });
    const [loading, setLoading] = useState(false);

    // Image Upload State
    const [uploading, setUploading] = useState(false);

    // Form states
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
    const [blogForm, setBlogForm] = useState({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Marketplace Onboarding",
        read_time: "5 min read",
        date: "",
        author_name: "Arpit Chaubey",
        author_role: "Founder, Braniva",
        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
        image_url: "/gallery/amazon-store.jpg"
    });

    const [showFaqForm, setShowFaqForm] = useState(false);
    const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
    const [faqForm, setFaqForm] = useState({
        question: "",
        answer: "",
        category: "Marketplace Onboarding",
        sort_order: 1
    });

    const [showCaseForm, setShowCaseForm] = useState(false);
    const [editingCaseId, setEditingCaseId] = useState<number | null>(null);
    const [caseForm, setCaseForm] = useState<{
        slug: string;
        title: string;
        category: string;
        overview: string;
        challenge: string;
        approach: ApproachStep[];
        outcome: string;
    }>({
        slug: "",
        title: "",
        category: "Marketplace Onboarding",
        overview: "",
        challenge: "",
        approach: [{ title: "", description: "" }],
        outcome: ""
    });

    const [showGalleryForm, setShowGalleryForm] = useState(false);
    const [editingGalleryId, setEditingGalleryId] = useState<string | number | null>(null);
    const [galleryForm, setGalleryForm] = useState({
        title: "",
        category: "Web UI Design",
        client: "",
        imageUrl: "/gallery/amazon-store.jpg",
        description: "",
        metrics: ""
    });

    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [editingTestimonialId, setEditingTestimonialId] = useState<string | number | null>(null);
    const [testimonialForm, setTestimonialForm] = useState({
        name: "",
        role: "",
        quote: "",
        avatar: "",
        rating: 5
    });

    // Check token on load
    useEffect(() => {
        const savedToken = localStorage.getItem("braniva_admin_token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Load data based on active tab
    useEffect(() => {
        if (token) {
            fetchBlogs();
            fetchFaqs();
            fetchCaseStudies();
            fetchGalleryItems();
            fetchTestimonials();
            fetchLeads();
            fetchAnalytics();
        }
    }, [token, activeTab]);

    const fetchAnalytics = async () => {
        if (!token) return;
        try {
            const res = await fetch("/api/analytics", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setAnalyticsData(data);
            }
        } catch (err) {
            console.error("Failed to fetch analytics:", err);
        }
    };

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (err) {
            console.error("Failed to fetch leads:", err);
        }
    };

    const handleDeleteLead = async (id: string | number) => {
        if (!confirm("Delete this lead record?")) return;
        try {
            const res = await fetch(`/api/leads?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchLeads();
        } catch (err) {
            console.error("Failed to delete lead:", err);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError("");
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                localStorage.setItem("braniva_admin_token", data.token);
                setToken(data.token);
            } else {
                setAuthError(data.error || "Authentication failed");
            }
        } catch {
            setAuthError("Failed to connect to server");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("braniva_admin_token");
        setToken(null);
        setUsername("");
        setPassword("");
    };

    // BLOG COVER PHOTO UPLOADING
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", `${Date.now()}_${file.name.replace(/\s+/g, '_')}`);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setBlogForm(prev => ({ ...prev, image_url: data.url }));
            } else {
                alert(data.error || "Failed to upload image");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Error connecting to upload API");
        } finally {
            setUploading(false);
        }
    };

    // SLUG GENERATORS
    const generateBlogSlug = () => {
        const cleanTitle = blogForm.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        setBlogForm(prev => ({ ...prev, slug: cleanTitle }));
    };

    const generateCaseSlug = () => {
        const cleanTitle = caseForm.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        setCaseForm(prev => ({ ...prev, slug: cleanTitle }));
    };

    // Pre-fill dates
    useEffect(() => {
        if (showBlogForm && !blogForm.date) {
            const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
            const today = new Date().toLocaleDateString("en-US", options);
            setBlogForm(prev => ({ ...prev, date: today }));
        }
    }, [showBlogForm]);

    // DB FETCH CHECKS
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blogs");
            if (res.ok) setBlogs(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/faqs");
            if (res.ok) setFaqs(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCaseStudies = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/case-studies");
            if (res.ok) setCaseStudies(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchGalleryItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/gallery");
            if (res.ok) setGalleryItems(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/testimonials");
            if (res.ok) setTestimonials(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", `${Date.now()}_${file.name.replace(/\s+/g, '_')}`);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setTestimonialForm(prev => ({ ...prev, avatar: data.url }));
            } else {
                alert(data.error || "Failed to upload avatar");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Error connecting to upload API");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveTestimonial = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingTestimonialId ? "PUT" : "POST";
            const body = editingTestimonialId
                ? { id: editingTestimonialId, ...testimonialForm }
                : testimonialForm;

            const res = await fetch("/api/testimonials", {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setShowTestimonialForm(false);
                setEditingTestimonialId(null);
                setTestimonialForm({ name: "", role: "", quote: "", avatar: "", rating: 5 });
                fetchTestimonials();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save testimonial");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving testimonial");
        }
    };

    const handleEditTestimonial = (item: Testimonial) => {
        setEditingTestimonialId(item.id);
        setTestimonialForm({
            name: item.name,
            role: item.role,
            quote: item.quote,
            avatar: item.avatar,
            rating: item.rating || 5
        });
        setShowTestimonialForm(true);
    };

    const handleDeleteTestimonial = async (id: number | string) => {
        if (!confirm("Delete this Testimonial?")) return;
        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchTestimonials();
        } catch (err) {
            console.error(err);
        }
    };

    const [dragActive, setDragActive] = useState(false);

    const handleFilesUpload = async (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        if (fileArray.length === 0) return;

        setUploading(true);
        try {
            for (const file of fileArray) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("filename", `${Date.now()}_${file.name.replace(/\s+/g, '_')}`);

                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });

                const data = await res.json();
                if (res.ok && data.success) {
                    await fetch("/api/gallery", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            imageUrl: data.url,
                            title: file.name,
                            category: "Showcase"
                        })
                    });
                }
            }
            fetchGalleryItems();
        } catch (err) {
            console.error("Upload error:", err);
            alert("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFilesUpload(e.dataTransfer.files);
        }
    };

    const handleSaveGallery = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingGalleryId ? "PUT" : "POST";
            const body = editingGalleryId
                ? { id: editingGalleryId, ...galleryForm }
                : galleryForm;

            const res = await fetch("/api/gallery", {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setShowGalleryForm(false);
                fetchGalleryItems();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save photo");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving gallery item");
        }
    };

    const handleEditGallery = (item: GalleryItem) => {
        setEditingGalleryId(item.id);
        setGalleryForm({
            title: item.title,
            category: item.category,
            client: item.client || "",
            imageUrl: item.imageUrl || "/gallery/amazon-store.jpg",
            description: item.description || "",
            metrics: item.metrics || ""
        });
        setShowGalleryForm(true);
    };

    const handleDeleteGallery = async (id: string | number) => {
        if (!confirm("Delete this photo from Gallery?")) return;
        try {
            const res = await fetch(`/api/gallery?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchGalleryItems();
        } catch (err) {
            console.error(err);
        }
    };

    // CRUD FOR BLOGS
    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = "/api/blogs";
            const method = editingBlogId ? "PUT" : "POST";
            const payload = editingBlogId ? { id: editingBlogId, ...blogForm } : blogForm;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setShowBlogForm(false);
                setEditingBlogId(null);
                setBlogForm({
                    slug: "",
                    title: "",
                    excerpt: "",
                    content: "",
                    category: "Marketplace Onboarding",
                    read_time: "5 min read",
                    date: "",
                    author_name: "Arpit Chaubey",
                    author_role: "Founder, Braniva",
                    author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
                    image_url: "/gallery/amazon-store.jpg"
                });
                fetchBlogs();
            } else {
                alert(data.error || "Failed to save blog post");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditBlog = (blog: Blog) => {
        setEditingBlogId(blog.id);
        setBlogForm({
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            read_time: blog.read_time,
            date: blog.date,
            author_name: blog.author_name,
            author_role: blog.author_role,
            author_avatar: blog.author_avatar,
            image_url: blog.image_url
        });
        setShowBlogForm(true);
    };

    const handleDeleteBlog = async (id: number) => {
        if (!confirm("Delete this blog post?")) return;
        try {
            const res = await fetch(`/api/blogs?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    // CRUD FOR FAQS
    const handleFaqSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = "/api/faqs";
            const method = editingFaqId ? "PUT" : "POST";
            const payload = editingFaqId ? { id: editingFaqId, ...faqForm } : faqForm;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setShowFaqForm(false);
                setEditingFaqId(null);
                setFaqForm({
                    question: "",
                    answer: "",
                    category: "Marketplace Onboarding",
                    sort_order: 1
                });
                fetchFaqs();
            } else {
                alert(data.error || "Failed to save FAQ");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditFaq = (faq: FAQ) => {
        setEditingFaqId(faq.id);
        setFaqForm({
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            sort_order: faq.sort_order
        });
        setShowFaqForm(true);
    };

    const handleDeleteFaq = async (id: number) => {
        if (!confirm("Delete this FAQ?")) return;
        try {
            const res = await fetch(`/api/faqs?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchFaqs();
        } catch (err) {
            console.error(err);
        }
    };

    // CRUD FOR CASE STUDIES
    const handleCaseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = "/api/case-studies";
            const method = editingCaseId ? "PUT" : "POST";

            // Format payload with JSON-stringified approach steps
            const payload = {
                id: editingCaseId,
                slug: caseForm.slug,
                title: caseForm.title,
                category: caseForm.category,
                overview: caseForm.overview,
                challenge: caseForm.challenge,
                approach: JSON.stringify(caseForm.approach),
                outcome: caseForm.outcome
            };

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setShowCaseForm(false);
                setEditingCaseId(null);
                setCaseForm({
                    slug: "",
                    title: "",
                    category: "Marketplace Onboarding",
                    overview: "",
                    challenge: "",
                    approach: [{ title: "", description: "" }],
                    outcome: ""
                });
                fetchCaseStudies();
            } else {
                alert(data.error || "Failed to save Case Study");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCase = (study: CaseStudy) => {
        setEditingCaseId(study.id);
        let parsedSteps: ApproachStep[] = [{ title: "", description: "" }];
        try {
            parsedSteps = JSON.parse(study.approach);
        } catch (e) {
            console.error(e);
        }

        setCaseForm({
            slug: study.slug,
            title: study.title,
            category: study.category,
            overview: study.overview,
            challenge: study.challenge,
            approach: parsedSteps,
            outcome: study.outcome
        });
        setShowCaseForm(true);
    };

    const handleDeleteCase = async (id: number) => {
        if (!confirm("Delete this Case Study?")) return;
        try {
            const res = await fetch(`/api/case-studies?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchCaseStudies();
        } catch (err) {
            console.error(err);
        }
    };

    // Approach Steps Form Helpers
    const handleAddStep = () => {
        setCaseForm(prev => ({
            ...prev,
            approach: [...prev.approach, { title: "", description: "" }]
        }));
    };

    const handleRemoveStep = (index: number) => {
        setCaseForm(prev => ({
            ...prev,
            approach: prev.approach.filter((_, i) => i !== index)
        }));
    };

    const handleStepChange = (index: number, field: "title" | "description", value: string) => {
        const updatedSteps = [...caseForm.approach];
        updatedSteps[index][field] = value;
        setCaseForm(prev => ({ ...prev, approach: updatedSteps }));
    };

    // LOGIN SCREEN
    if (!token) {
        return (
            <div className="min-h-screen bg-[#070709] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0F3D3E]/30 via-[#070709] to-[#070709] flex items-center justify-center relative overflow-hidden py-16 px-6">
                <div className="relative z-10 w-full max-w-md bg-[#121216] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="w-16 h-16 bg-[#0F3D3E] rounded-2xl flex items-center justify-center text-[#1ABC9C] border border-[#1ABC9C]/30 mb-4 shadow-lg shadow-[#1ABC9C]/10">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-white font-sora tracking-wide">Braniva Admin</h1>
                        <p className="text-xs text-[#B0B0B0] mt-2 font-medium leading-relaxed">Authorized content management console for Braniva storefronts and marketing assets.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-[#B0B0B0] uppercase tracking-wider mb-2">Admin Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#0A0A0C] border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition-all"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#B0B0B0] uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0A0A0C] border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#1ABC9C] focus:ring-1 focus:ring-[#1ABC9C] transition-all"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>

                        {authError && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-xs font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-4 rounded-2xl bg-[#1ABC9C] text-[#052222] font-bold text-sm hover:bg-[#1dd3af] transition-all flex items-center justify-center gap-2 border border-[#1ABC9C] shadow-lg shadow-[#1ABC9C]/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {authLoading ? "Verifying Credentials..." : "Access Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // MAIN DASHBOARD
    const contactLeads = leads.filter(l => !l.meeting_date || l.lead_type?.toLowerCase().includes("contact"));
    const scheduleLeads = leads.filter(l => l.meeting_date || l.lead_type?.toLowerCase().includes("consultation") || l.lead_type?.toLowerCase().includes("schedule"));

    return (
        <div className="min-h-screen bg-[#070709] text-white">
            {/* Top Navigation Bar */}
            <div className="w-full bg-[#0A0A0D]/80 border-b border-white/10 backdrop-blur-xl sticky top-0 z-40 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] border border-[#1ABC9C]/30 flex items-center justify-center text-[#1ABC9C]">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold font-sora text-white leading-none">Braniva Console</h1>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1ABC9C]/10 text-[#1ABC9C] border border-[#1ABC9C]/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C] animate-pulse"></span> Live Sync
                                </span>
                            </div>
                            <p className="text-[11px] text-[#B0B0B0] font-medium mt-0.5">Website Analytics & CMS Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold text-[#B0B0B0] hover:text-white"
                        >
                            View Website <ExternalLink className="w-3.5 h-3.5 text-[#1ABC9C]" />
                        </a>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs font-semibold cursor-pointer"
                        >
                            Log Out <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-6">
                {/* Executive KPI Overview Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Visitors</span>
                            <Users className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{analyticsData.uniqueVisitors || 1}</div>
                    </div>
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Pageviews</span>
                            <Eye className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{analyticsData.totalViews || 1}</div>
                    </div>
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Contacts</span>
                            <Mail className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{contactLeads.length}</div>
                    </div>
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Schedules</span>
                            <CalendarDays className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{scheduleLeads.length}</div>
                    </div>
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Blogs</span>
                            <BookOpen className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{blogs.length}</div>
                    </div>
                    <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#1ABC9C]/40 transition-all">
                        <div className="flex items-center justify-between text-[#B0B0B0] text-xs font-semibold mb-2">
                            <span>Gallery</span>
                            <ImageIcon className="w-4 h-4 text-[#1ABC9C]" />
                        </div>
                        <div className="text-xl font-bold font-sora text-white">{galleryItems.length}</div>
                    </div>
                </div>

                {/* Dashboard Tabs & Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-3 flex flex-col gap-2.5 bg-[#121216] border border-white/10 p-3 rounded-3xl w-full">
                        <div className="text-[10px] font-bold text-[#B0B0B0] uppercase tracking-wider px-3 py-1">Analytics & Leads</div>
                        <button
                            onClick={() => { setActiveTab("traffic"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "traffic" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Traffic Analytics</span>
                            <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1ABC9C]/20 text-[#1ABC9C]">Live</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("contact"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "contact" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <Mail className="w-4 h-4" />
                            <span>Contact Us Leads</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "contact" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{contactLeads.length}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("schedule"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "schedule" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <CalendarDays className="w-4 h-4" />
                            <span>Schedule Info</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "schedule" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{scheduleLeads.length}</span>
                        </button>

                        <div className="text-[10px] font-bold text-[#B0B0B0] uppercase tracking-wider px-3 py-1 mt-3">Content Management</div>
                        <button
                            onClick={() => { setActiveTab("blogs"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "blogs" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Manage Blogs</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "blogs" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{blogs.length}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("faqs"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "faqs" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Manage FAQs</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "faqs" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{faqs.length}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("cases"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "cases" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            <span>Manage Case Studies</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "cases" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{caseStudies.length}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("gallery"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "gallery" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <ImageIcon className="w-4 h-4" />
                            <span>Manage Gallery</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "gallery" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{galleryItems.length}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab("testimonials"); setShowBlogForm(false); setShowFaqForm(false); setShowCaseForm(false); setShowGalleryForm(false); setShowTestimonialForm(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${activeTab === "testimonials" ? "bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 shadow-md shadow-[#1ABC9C]/10" : "text-[#B0B0B0] hover:bg-white/5 hover:text-white"}`}
                        >
                            <Quote className="w-4 h-4" />
                            <span>Manage Testimonials</span>
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "testimonials" ? "bg-[#1ABC9C]/20 text-[#1ABC9C]" : "bg-white/5 text-[#B0B0B0]"}`}>{testimonials.length}</span>
                        </button>
                    </div>

                    {/* Content Box */}
                    <div className="lg:col-span-9 bg-[#121216] border border-white/10 rounded-3xl p-6 md:p-8 min-h-[500px]">
                        {/* TAB: TRAFFIC ANALYTICS */}
                        {activeTab === "traffic" && (
                            <div>
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold font-sora text-white">Traffic & Growth Analytics</h2>
                                        <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Real-time visitor sessions logged from live user navigation.</p>
                                    </div>
                                    <button
                                        onClick={fetchAnalytics}
                                        className="px-4 py-2 rounded-xl bg-[#0F3D3E] text-[#1ABC9C] border border-[#1ABC9C]/30 hover:bg-[#1ABC9C] hover:text-[#052222] font-bold text-xs transition-all cursor-pointer"
                                    >
                                        Refresh Traffic
                                    </button>
                                </div>

                                {/* Analytics Top Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-[#0A0A0C] border border-white/10 p-5 rounded-2xl">
                                        <div className="flex items-center justify-between text-xs text-[#B0B0B0] font-semibold mb-2">
                                            <span>Total Pageviews</span>
                                            <Eye className="w-4 h-4 text-[#1ABC9C]" />
                                        </div>
                                        <div className="text-2xl font-bold text-white font-sora">{analyticsData.totalViews || 0}</div>
                                        <div className="text-[11px] text-[#1ABC9C] font-semibold mt-2 flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" /> Real-time recorded
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0C] border border-white/10 p-5 rounded-2xl">
                                        <div className="flex items-center justify-between text-xs text-[#B0B0B0] font-semibold mb-2">
                                            <span>Unique Visitors</span>
                                            <Users className="w-4 h-4 text-[#1ABC9C]" />
                                        </div>
                                        <div className="text-2xl font-bold text-white font-sora">{analyticsData.uniqueVisitors || 0}</div>
                                        <div className="text-[11px] text-[#1ABC9C] font-semibold mt-2 flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" /> Unique device sessions
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0C] border border-white/10 p-5 rounded-2xl">
                                        <div className="flex items-center justify-between text-xs text-[#B0B0B0] font-semibold mb-2">
                                            <span>Total Leads Captured</span>
                                            <Activity className="w-4 h-4 text-[#1ABC9C]" />
                                        </div>
                                        <div className="text-2xl font-bold text-white font-sora">{leads.length}</div>
                                        <div className="text-[11px] text-[#1ABC9C] font-semibold mt-2 flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" /> Inquiries & Schedules
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0C] border border-white/10 p-5 rounded-2xl">
                                        <div className="flex items-center justify-between text-xs text-[#B0B0B0] font-semibold mb-2">
                                            <span>Conversion Rate</span>
                                            <Activity className="w-4 h-4 text-[#1ABC9C]" />
                                        </div>
                                        <div className="text-2xl font-bold text-white font-sora">
                                            {analyticsData.totalViews > 0 ? ((leads.length / analyticsData.totalViews) * 100).toFixed(1) : 0}%
                                        </div>
                                        <div className="text-[11px] text-[#1ABC9C] font-semibold mt-2 flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" /> Direct Conversion
                                        </div>
                                    </div>
                                </div>

                                {/* Traffic Sources & Top Pages */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl">
                                        <h3 className="text-sm font-bold text-white font-sora mb-4 flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4 text-[#1ABC9C]" /> Traffic Channels
                                        </h3>
                                        <div className="space-y-4">
                                            {Object.entries(analyticsData.channelCounts || {}).map(([channel, count]) => {
                                                const pct = analyticsData.totalViews > 0 ? Math.round((count / analyticsData.totalViews) * 100) : 0;
                                                return (
                                                    <div key={channel}>
                                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                                            <span className="text-white">{channel}</span>
                                                            <span className="text-[#1ABC9C]">{count} ({pct}%)</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                                                            <div className="h-full bg-[#1ABC9C] rounded-full" style={{ width: `${Math.max(pct, 5)}%` }}></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl">
                                        <h3 className="text-sm font-bold text-white font-sora mb-4 flex items-center gap-2">
                                            <ExternalLink className="w-4 h-4 text-[#1ABC9C]" /> Top Performing Pages
                                        </h3>
                                        {analyticsData.topPages.length === 0 ? (
                                            <div className="py-8 text-center text-xs text-[#B0B0B0]">No pageviews recorded yet. Visit site pages to track traffic.</div>
                                        ) : (
                                            <div className="space-y-3">
                                                {analyticsData.topPages.map((item) => (
                                                    <div key={item.path} className="flex items-center justify-between p-3 rounded-xl bg-[#121216] border border-white/5 text-xs">
                                                        <span className="font-semibold text-white truncate">{item.path}</span>
                                                        <span className="text-[#1ABC9C] font-mono font-bold">{item.count} views</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: CONTACT SUBMISSIONS */}
                        {activeTab === "contact" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold font-sora text-white">Contact Us Messages</h2>
                                    <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Inquiries and messages received via website contact forms.</p>
                                </div>

                                {contactLeads.length === 0 ? (
                                    <div className="py-20 text-center text-[#B0B0B0] text-sm bg-[#0A0A0C] border border-white/10 rounded-2xl">
                                        No contact form submissions yet.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {contactLeads.map((item) => (
                                            <div key={item.id} className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl hover:border-[#1ABC9C]/30 transition-all">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-base font-bold text-white font-sora">{item.name}</h3>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2.5 py-0.5 rounded-full">
                                                                {item.business_type}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-[#B0B0B0] mt-1 font-medium">
                                                            {item.company_name ? `Company: ${item.company_name} • ` : ''}
                                                            Submitted: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <a
                                                            href={`mailto:${item.email}`}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F3D3E] text-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-[#052222] font-bold text-xs border border-[#1ABC9C]/30 transition-all"
                                                        >
                                                            <Mail className="w-3.5 h-3.5" /> Email
                                                        </a>
                                                        <a
                                                            href={`tel:${item.phone}`}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all"
                                                        >
                                                            <PhoneCall className="w-3.5 h-3.5" /> Call
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteLead(item.id)}
                                                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                                                            title="Delete Inquiry"
                                                            aria-label="Delete Inquiry"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {item.message && (
                                                    <div className="bg-[#121216] border border-white/5 p-4 rounded-xl text-xs text-white leading-relaxed">
                                                        <span className="text-[#B0B0B0] font-semibold block mb-1 uppercase text-[10px] tracking-wider">Message Payload</span>
                                                        {item.message}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: SCHEDULED CONSULTATIONS */}
                        {activeTab === "schedule" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold font-sora text-white">Scheduled Consultations</h2>
                                    <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Calendar appointments and consultation calls requested by prospects.</p>
                                </div>

                                {scheduleLeads.length === 0 ? (
                                    <div className="py-20 text-center text-[#B0B0B0] text-sm bg-[#0A0A0C] border border-white/10 rounded-2xl">
                                        No consultation appointments scheduled yet.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {scheduleLeads.map((item) => (
                                            <div key={item.id} className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl hover:border-[#1ABC9C]/30 transition-all">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-base font-bold text-white font-sora">{item.name}</h3>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2.5 py-0.5 rounded-full">
                                                                {item.business_type}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-[#B0B0B0] mt-1 font-medium">
                                                            Email: <a href={`mailto:${item.email}`} className="text-[#1ABC9C] hover:underline">{item.email}</a> • Phone: {item.phone}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <a
                                                            href={`mailto:${item.email}`}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F3D3E] text-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-[#052222] font-bold text-xs border border-[#1ABC9C]/30 transition-all"
                                                        >
                                                            <Mail className="w-3.5 h-3.5" /> Email
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteLead(item.id)}
                                                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                                                            title="Delete Schedule"
                                                            aria-label="Delete Schedule"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121216] border border-white/5 p-4 rounded-xl text-xs">
                                                    <div className="flex items-center gap-3">
                                                        <CalendarDays className="w-5 h-5 text-[#1ABC9C] shrink-0" />
                                                        <div>
                                                            <span className="text-[#B0B0B0] text-[10px] font-bold uppercase block">Meeting Date & Time</span>
                                                            <span className="text-white font-bold">{item.meeting_date} at {item.meeting_time} IST</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Briefcase className="w-5 h-5 text-[#1ABC9C] shrink-0" />
                                                        <div>
                                                            <span className="text-[#B0B0B0] text-[10px] font-bold uppercase block">Company / Brand</span>
                                                            <span className="text-white font-bold">{item.company_name || 'Individual / Startup'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {item.message && (
                                                    <div className="mt-3 text-xs text-[#B0B0B0] leading-relaxed">
                                                        <strong className="text-white">Notes:</strong> {item.message}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {/* TAB 1: BLOGS */}
                        {activeTab === "blogs" && (
                            <div>
                                {!showBlogForm ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-2xl font-bold font-sora text-white">E-commerce Blog Posts</h2>
                                                <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Publish insights, news, and marketplace growth advice.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setEditingBlogId(null);
                                                    setBlogForm({
                                                        slug: "",
                                                        title: "",
                                                        excerpt: "",
                                                        content: "",
                                                        category: "Marketplace Onboarding",
                                                        read_time: "5 min read",
                                                        date: "",
                                                        author_name: "Arpit Chaubey",
                                                        author_role: "Founder, Braniva",
                                                        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
                                                        image_url: "/gallery/amazon-store.jpg"
                                                    });
                                                    setShowBlogForm(true);
                                                }}
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1ABC9C] text-[#052222] hover:bg-[#1dd3af] transition-all font-bold text-xs border border-[#1ABC9C] cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" /> Add Post
                                            </button>
                                        </div>

                                        {loading ? (
                                            <div className="py-20 flex items-center justify-center">
                                                <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : blogs.length === 0 ? (
                                            <div className="border border-dashed border-white/10 rounded-2xl py-20 text-center text-[#B0B0B0] font-medium">
                                                No blog posts found. Create your first post!
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {blogs.map(blog => (
                                                    <div key={blog.id} className="p-5 bg-[#121212]/60 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#1ABC9C]/20 transition-all">
                                                        <div className="flex items-start gap-4">
                                                            <div className="relative w-20 h-20 bg-[#1F1F1F] rounded-xl overflow-hidden shrink-0 border border-white/10 flex items-center justify-center">
                                                                <img
                                                                    src={blog.image_url}
                                                                    alt={blog.title}
                                                                    className="object-cover w-full h-full absolute inset-0"
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2 py-0.5 rounded-full">{blog.category}</span>
                                                                <h3 className="text-lg font-bold text-white font-sora mt-2">{blog.title}</h3>
                                                                <p className="text-xs text-[#B0B0B0] line-clamp-1 mt-1 font-medium">{blog.excerpt}</p>
                                                                <div className="flex items-center gap-3 text-[10px] text-[#666] mt-2 font-semibold">
                                                                    <span>{blog.date}</span>
                                                                    <span>•</span>
                                                                    <span>{blog.read_time}</span>
                                                                    <span>•</span>
                                                                    <span>By {blog.author_name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 shrink-0">
                                                            <button
                                                                onClick={() => handleEditBlog(blog)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-[#1ABC9C] text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Edit Post"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteBlog(blog.id)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Delete Post"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // BLOG EDIT FORM
                                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4 mb-6">
                                            <h2 className="text-xl font-bold font-sora text-white">{editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                                            <button
                                                type="button"
                                                onClick={() => setShowBlogForm(false)}
                                                className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-white/5 text-[#B0B0B0] cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={blogForm.title}
                                                    onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                    placeholder="e.g. How to scale Amazon sales"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2 flex items-center justify-between">
                                                    Slug (URL Endpoint)
                                                    <button
                                                        type="button"
                                                        onClick={generateBlogSlug}
                                                        disabled={!blogForm.title}
                                                        className="text-[10px] text-[#1ABC9C] font-bold hover:underline disabled:opacity-50 cursor-pointer"
                                                    >
                                                        Auto-Generate
                                                    </button>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={blogForm.slug}
                                                    onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                    placeholder="e.g. how-to-scale-amazon-sales"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Category</label>
                                                <select
                                                    value={blogForm.category}
                                                    onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                >
                                                    <option value="Marketplace Onboarding">Marketplace Onboarding</option>
                                                    <option value="Marketing Strategy">Marketing Strategy</option>
                                                    <option value="Listing Optimization">Listing Optimization</option>
                                                    <option value="Email & WhatsApp Marketing">Email & WhatsApp Marketing</option>
                                                    <option value="Website Development">Website Development</option>
                                                    <option value="Brand Identity">Brand Identity</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Read Time</label>
                                                    <input
                                                        type="text"
                                                        value={blogForm.read_time}
                                                        onChange={(e) => setBlogForm(prev => ({ ...prev, read_time: e.target.value }))}
                                                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                        placeholder="e.g. 5 min read"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Date</label>
                                                    <input
                                                        type="text"
                                                        value={blogForm.date}
                                                        onChange={(e) => setBlogForm(prev => ({ ...prev, date: e.target.value }))}
                                                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                        placeholder="e.g. July 04, 2026"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Short Excerpt (Grid Card Preview)</label>
                                                <textarea
                                                    value={blogForm.excerpt}
                                                    onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                                                    rows={2}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors resize-none leading-relaxed"
                                                    placeholder="Write a brief 1-2 sentence hook for the listing card..."
                                                    required
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Full Content (Markdown Format Supported)</label>
                                                <textarea
                                                    value={blogForm.content}
                                                    onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                                                    rows={10}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm font-mono focus:outline-none focus:border-[#1ABC9C] transition-colors resize-y leading-relaxed"
                                                    placeholder="Use Markdown to structure headers, lists, links, and text formatting..."
                                                    required
                                                />
                                            </div>

                                            {/* Cover image uploader */}
                                            <div className="md:col-span-2 border border-white/5 bg-[#121212]/50 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                                                <div className="relative w-36 h-24 bg-[#1F1F1F] border border-white/10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-xs text-[#666]">
                                                    {blogForm.image_url ? (
                                                        <img
                                                            src={blogForm.image_url}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover absolute inset-0"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="w-8 h-8 text-white/10" />
                                                    )}
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Cover Image Asset</label>
                                                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                                        <div className="relative flex-1">
                                                            <input
                                                                type="text"
                                                                value={blogForm.image_url}
                                                                onChange={(e) => setBlogForm(prev => ({ ...prev, image_url: e.target.value }))}
                                                                className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none"
                                                                placeholder="Select file or paste custom URL path"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="relative shrink-0">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleImageUpload}
                                                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                                                                disabled={uploading}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="px-5 py-3 rounded-xl border border-[#1ABC9C]/30 text-[#1ABC9C] hover:bg-[#1ABC9C]/5 hover:border-[#1ABC9C] transition-all text-xs font-bold flex items-center gap-2"
                                                            >
                                                                <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Cover Image"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Author Name</label>
                                                    <input
                                                        type="text"
                                                        value={blogForm.author_name}
                                                        onChange={(e) => setBlogForm(prev => ({ ...prev, author_name: e.target.value }))}
                                                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Author Role</label>
                                                    <input
                                                        type="text"
                                                        value={blogForm.author_role}
                                                        onChange={(e) => setBlogForm(prev => ({ ...prev, author_role: e.target.value }))}
                                                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-[#1F1F1F] pt-6 mt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="px-8 py-3.5 rounded-full bg-[#1ABC9C] text-[#052222] font-bold hover:bg-[#1dd3af] transition-all flex items-center gap-2 text-sm border border-[#1ABC9C] disabled:opacity-50 cursor-pointer"
                                            >
                                                <Check className="w-4 h-4" /> {editingBlogId ? "Update Post" : "Publish Post"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowBlogForm(false)}
                                                className="px-8 py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-[#B0B0B0] transition-colors text-sm font-medium cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* TAB 2: FAQS */}
                        {activeTab === "faqs" && (
                            <div>
                                {!showFaqForm ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-2xl font-bold font-sora text-white">Frequently Asked Questions</h2>
                                                <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Manage interactive questions displayed on the Home and FAQ pages.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setEditingFaqId(null);
                                                    setFaqForm({
                                                        question: "",
                                                        answer: "",
                                                        category: "Marketplace Onboarding",
                                                        sort_order: faqs.length + 1
                                                    });
                                                    setShowFaqForm(true);
                                                }}
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1ABC9C] text-[#052222] hover:bg-[#1dd3af] transition-all font-bold text-xs border border-[#1ABC9C] cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" /> Add FAQ
                                            </button>
                                        </div>

                                        {loading ? (
                                            <div className="py-20 flex items-center justify-center">
                                                <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : faqs.length === 0 ? (
                                            <div className="border border-dashed border-white/10 rounded-2xl py-20 text-center text-[#B0B0B0] font-medium">
                                                No FAQs found. Add your first FAQ!
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {faqs.map(faq => (
                                                    <div key={faq.id} className="p-5 bg-[#121212]/60 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#1ABC9C]/20 transition-all">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2 py-0.5 rounded-full">{faq.category}</span>
                                                                <span className="text-[10px] text-[#666] font-semibold">Sort Order: {faq.sort_order}</span>
                                                            </div>
                                                            <h3 className="text-lg font-bold text-white font-sora mt-2">{faq.question}</h3>
                                                            <p className="text-sm text-[#B0B0B0] mt-1.5 line-clamp-2 leading-relaxed font-medium">{faq.answer}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 shrink-0">
                                                            <button
                                                                onClick={() => handleEditFaq(faq)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-[#1ABC9C] text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Edit FAQ"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteFaq(faq.id)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Delete FAQ"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // FAQ EDIT FORM
                                    <form onSubmit={handleFaqSubmit} className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4 mb-6">
                                            <h2 className="text-xl font-bold font-sora text-white">{editingFaqId ? "Edit FAQ" : "Create New FAQ"}</h2>
                                            <button
                                                type="button"
                                                onClick={() => setShowFaqForm(false)}
                                                className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-white/5 text-[#B0B0B0] cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Question</label>
                                                <input
                                                    type="text"
                                                    value={faqForm.question}
                                                    onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                    placeholder="e.g. What is the standard onboarding timeline?"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Answer</label>
                                                <textarea
                                                    value={faqForm.answer}
                                                    onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                                                    rows={4}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors resize-y leading-relaxed"
                                                    placeholder="Provide a detailed, clear answer to the question..."
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Category</label>
                                                    <select
                                                        value={faqForm.category}
                                                        onChange={(e) => setFaqForm(prev => ({ ...prev, category: e.target.value }))}
                                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                                    >
                                                        <option value="Marketplace Onboarding">Marketplace Onboarding</option>
                                                        <option value="Marketing Strategy">Marketing Strategy</option>
                                                        <option value="Logistics Onboarding">Logistics Onboarding</option>
                                                        <option value="Listing Optimization">Listing Optimization</option>
                                                        <option value="Email & WhatsApp Marketing">Email & WhatsApp Marketing</option>
                                                        <option value="Website Development">Website Development</option>
                                                        <option value="General Queries">General Queries</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Sort Order</label>
                                                    <input
                                                        type="number"
                                                        value={faqForm.sort_order}
                                                        onChange={(e) => setFaqForm(prev => ({ ...prev, sort_order: parseInt(e.target.value, 10) || 1 }))}
                                                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-[#1F1F1F] pt-6 mt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="px-8 py-3.5 rounded-full bg-[#1ABC9C] text-[#052222] font-bold hover:bg-[#1dd3af] transition-all flex items-center gap-2 text-sm border border-[#1ABC9C] disabled:opacity-50 cursor-pointer"
                                            >
                                                <Check className="w-4 h-4" /> {editingFaqId ? "Update FAQ" : "Create FAQ"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowFaqForm(false)}
                                                className="px-8 py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-[#B0B0B0] transition-colors text-sm font-medium cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* TAB 3: CASE STUDIES */}
                        {activeTab === "cases" && (
                            <div>
                                {!showCaseForm ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-2xl font-bold font-sora text-white">Marketplace Case Studies</h2>
                                                <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Publish detailed growth transformations of your clients.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setEditingCaseId(null);
                                                    setCaseForm({
                                                        slug: "",
                                                        title: "",
                                                        category: "Marketplace Onboarding",
                                                        overview: "",
                                                        challenge: "",
                                                        approach: [{ title: "Product Validation", description: "" }],
                                                        outcome: ""
                                                    });
                                                    setShowCaseForm(true);
                                                }}
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1ABC9C] text-[#052222] hover:bg-[#1dd3af] transition-all font-bold text-xs border border-[#1ABC9C] cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" /> Add Case Study
                                            </button>
                                        </div>

                                        {loading ? (
                                            <div className="py-20 flex items-center justify-center">
                                                <div className="w-10 h-10 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : caseStudies.length === 0 ? (
                                            <div className="border border-dashed border-white/10 rounded-2xl py-20 text-center text-[#B0B0B0] font-medium">
                                                No case studies found. Create your first case study!
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {caseStudies.map(study => (
                                                    <div key={study.id} className="p-5 bg-[#121212]/60 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#1ABC9C]/20 transition-all">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ABC9C] bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 px-2 py-0.5 rounded-full">{study.category}</span>
                                                            </div>
                                                            <h3 className="text-lg font-bold text-white font-sora mt-2">{study.title}</h3>
                                                            <p className="text-xs text-[#B0B0B0] line-clamp-1 mt-1 font-medium">{study.overview}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 shrink-0">
                                                            <button
                                                                onClick={() => handleEditCase(study)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-[#1ABC9C] text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Edit Case Study"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCase(study.id)}
                                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 text-[#B0B0B0] transition-colors cursor-pointer"
                                                                title="Delete Case Study"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // CASE STUDY EDIT FORM
                                    <form onSubmit={handleCaseSubmit} className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4 mb-6">
                                            <h2 className="text-xl font-bold font-sora text-white">{editingCaseId ? "Edit Case Study" : "Create New Case Study"}</h2>
                                            <button
                                                type="button"
                                                onClick={() => setShowCaseForm(false)}
                                                className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center hover:bg-white/5 text-[#B0B0B0] cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={caseForm.title}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, title: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                    placeholder="e.g. A.K Industries"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2 flex items-center justify-between">
                                                    Slug (URL Endpoint)
                                                    <button
                                                        type="button"
                                                        onClick={generateCaseSlug}
                                                        disabled={!caseForm.title}
                                                        className="text-[10px] text-[#1ABC9C] font-bold hover:underline disabled:opacity-50 cursor-pointer"
                                                    >
                                                        Auto-Generate
                                                    </button>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={caseForm.slug}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, slug: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C] transition-colors"
                                                    placeholder="e.g. ak-industries"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Category</label>
                                                <select
                                                    value={caseForm.category}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, category: e.target.value }))}
                                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                                >
                                                    <option value="Marketplace Onboarding">Marketplace Onboarding</option>
                                                    <option value="Marketing Strategy">Marketing Strategy</option>
                                                    <option value="Logistics Onboarding">Logistics Onboarding</option>
                                                    <option value="Listing Optimization">Listing Optimization</option>
                                                    <option value="Email & WhatsApp Marketing">Email & WhatsApp Marketing</option>
                                                    <option value="Website Development">Website Development</option>
                                                    <option value="Manufacturing & E-commerce">Manufacturing & E-commerce</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Client Overview</label>
                                                <textarea
                                                    value={caseForm.overview}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, overview: e.target.value }))}
                                                    rows={3}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none resize-y leading-relaxed"
                                                    placeholder="Introduce the client, what they sell, and their goals..."
                                                    required
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">The Challenge</label>
                                                <textarea
                                                    value={caseForm.challenge}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, challenge: e.target.value }))}
                                                    rows={3}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none resize-y leading-relaxed"
                                                    placeholder="What obstacles did the client face before reaching out?..."
                                                    required
                                                />
                                            </div>

                                            {/* Approach step editor */}
                                            <div className="md:col-span-2 border border-white/5 bg-[#121212]/50 p-6 rounded-2xl space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider">Approach Steps (Timeline)</label>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddStep}
                                                        className="text-[10px] text-[#1ABC9C] hover:underline font-bold"
                                                    >
                                                        + Add Step
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    {caseForm.approach.map((step, index) => (
                                                        <div key={index} className="p-4 bg-[#1A1A1A]/80 border border-white/5 rounded-xl space-y-3 relative">
                                                            {caseForm.approach.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveStep(index)}
                                                                    className="absolute top-4 right-4 text-xs text-red-400 hover:text-red-500 font-bold"
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                            <div className="pr-12">
                                                                <label className="block text-[10px] text-[#666] font-bold uppercase mb-1">Step {index + 1} Title</label>
                                                                <input
                                                                    type="text"
                                                                    value={step.title}
                                                                    onChange={(e) => handleStepChange(index, "title", e.target.value)}
                                                                    className="w-full bg-[#0A0A0A]/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                                                                    placeholder="e.g. Image Enhancement"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] text-[#666] font-bold uppercase mb-1">Step {index + 1} Description</label>
                                                                <textarea
                                                                    value={step.description}
                                                                    onChange={(e) => handleStepChange(index, "description", e.target.value)}
                                                                    rows={2}
                                                                    className="w-full bg-[#0A0A0A]/40 border border-white/10 rounded-lg p-3 text-white text-xs focus:outline-none resize-none leading-relaxed"
                                                                    placeholder="Describe the operations executed in this step..."
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Outcome</label>
                                                <textarea
                                                    value={caseForm.outcome}
                                                    onChange={(e) => setCaseForm(prev => ({ ...prev, outcome: e.target.value }))}
                                                    rows={3}
                                                    className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none resize-y leading-relaxed"
                                                    placeholder="State the final results and measurable business value generated..."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-[#1F1F1F] pt-6 mt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="px-8 py-3.5 rounded-full bg-[#1ABC9C] text-[#052222] font-bold hover:bg-[#1dd3af] transition-all flex items-center gap-2 text-sm border border-[#1ABC9C] disabled:opacity-50 cursor-pointer"
                                            >
                                                <Check className="w-4 h-4" /> {editingCaseId ? "Update Case" : "Publish Case"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowCaseForm(false)}
                                                className="px-8 py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-[#B0B0B0] transition-colors text-sm font-medium cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* TAB 4: GALLERY */}
                        {activeTab === "gallery" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold font-sora text-white">Gallery Photos</h2>
                                    <p className="text-xs text-[#B0B0B0] mt-1 font-medium">Drag & drop photos below to instantly add them to your website showcase.</p>
                                </div>

                                {/* Drag and Drop Upload Area */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 mb-10 flex flex-col items-center justify-center ${
                                        dragActive
                                            ? "border-[#1ABC9C] bg-[#1ABC9C]/10 scale-[1.01]"
                                            : "border-[#27272A] hover:border-[#1ABC9C]/50 bg-[#0A0A0A] hover:bg-[#0F3D3E]/10"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
                                        disabled={uploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="w-16 h-16 rounded-2xl bg-[#0F3D3E] border border-[#1ABC9C]/30 flex items-center justify-center text-[#1ABC9C] mb-4 shadow-lg shadow-[#1ABC9C]/10">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-base font-bold text-white font-sora mb-1">
                                        {uploading ? "Uploading photo(s)..." : "Drag and drop your photos here"}
                                    </h3>
                                    <p className="text-xs text-[#B0B0B0]">or click anywhere to browse from your device (PNG, JPG, WEBP)</p>
                                </div>

                                {/* Uploaded Gallery List */}
                                <div className="border-t border-[#27272A] pt-8">
                                    <h3 className="text-sm font-bold text-white font-sora mb-4 uppercase tracking-wider text-[#B0B0B0]">
                                        Live Showcase Photos ({galleryItems.length})
                                    </h3>

                                    {loading ? (
                                        <div className="py-16 text-center text-[#B0B0B0] text-sm">Loading photos...</div>
                                    ) : galleryItems.length === 0 ? (
                                        <div className="py-16 text-center text-[#B0B0B0] text-sm bg-[#0A0A0A] border border-[#27272A] rounded-2xl">
                                            No showcase photos uploaded yet. Drag & drop files above to publish photos.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {galleryItems.map(item => (
                                                <div key={item.id} className="group relative bg-[#0A0A0A] border border-[#27272A] rounded-2xl overflow-hidden aspect-square flex items-center justify-center hover:border-[#1ABC9C]/40 transition-all">
                                                    <img src={item.imageUrl} alt={item.title || "Showcase Photo"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleDeleteGallery(item.id)}
                                                            className="p-3 rounded-xl bg-red-500/80 hover:bg-red-600 text-white transition-all transform scale-95 group-hover:scale-100 cursor-pointer shadow-lg"
                                                            title="Delete Photo"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB 5: TESTIMONIALS */}
                        {activeTab === "testimonials" && (
                            <div>
                                {!showTestimonialForm ? (
                                    <div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#27272A]">
                                            <div>
                                                <h2 className="text-xl font-bold font-sora text-white">Client Testimonials</h2>
                                                <p className="text-xs text-[#B0B0B0] mt-1">Manage founder reviews and quotes displayed on the homepage.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setEditingTestimonialId(null);
                                                    setTestimonialForm({ name: "", role: "", quote: "", avatar: "", rating: 5 });
                                                    setShowTestimonialForm(true);
                                                }}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1ABC9C] text-[#052222] text-xs font-bold hover:bg-[#1dd3af] transition-all cursor-pointer shadow-lg shadow-[#1ABC9C]/10"
                                            >
                                                <Plus className="w-4 h-4" /> Add Testimonial
                                            </button>
                                        </div>

                                        {loading ? (
                                            <div className="py-20 text-center text-sm text-[#B0B0B0]">Loading testimonials...</div>
                                        ) : testimonials.length === 0 ? (
                                            <div className="py-20 text-center text-sm text-[#B0B0B0]">No testimonials found. Click "Add Testimonial" to create your first one.</div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {testimonials.map((item) => (
                                                    <div key={item.id} className="bg-[#1C1C1E] border border-[#27272A] p-6 rounded-2xl flex flex-col justify-between hover:border-[#1ABC9C]/30 transition-all">
                                                        <div>
                                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                                <div className="flex items-center gap-1 text-[#1ABC9C]">
                                                                    {[...Array(item.rating || 5)].map((_, i) => (
                                                                        <span key={i} className="text-base">★</span>
                                                                    ))}
                                                                </div>
                                                                <span className="text-[10px] text-[#666] font-mono">ID: {item.id}</span>
                                                            </div>
                                                            <p className="text-xs text-[#B0B0B0] italic leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
                                                        </div>

                                                        <div className="flex items-center justify-between pt-4 border-t border-[#27272A] mt-2">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#0A0A0A] border border-[#27272A] shrink-0">
                                                                    <img src={item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`} alt={item.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-xs font-bold text-white leading-none">{item.name}</h4>
                                                                    <p className="text-[10px] text-[#666] mt-1">{item.role}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleEditTestimonial(item)}
                                                                    className="p-2 rounded-lg bg-[#1F1F1F] hover:bg-[#27272A] text-white transition-colors cursor-pointer"
                                                                    title="Edit Testimonial"
                                                                >
                                                                    <Edit2 className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteTestimonial(item.id)}
                                                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                                                                    title="Delete Testimonial"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#27272A]">
                                            <h2 className="text-xl font-bold font-sora text-white">
                                                {editingTestimonialId ? "Edit Testimonial" : "Add New Testimonial"}
                                            </h2>
                                            <button
                                                onClick={() => setShowTestimonialForm(false)}
                                                className="px-4 py-2 rounded-xl bg-[#1F1F1F] text-[#B0B0B0] text-xs font-semibold hover:text-white cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                        <form onSubmit={handleSaveTestimonial} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Founder Name</label>
                                                    <input
                                                        type="text"
                                                        value={testimonialForm.name}
                                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                                                        placeholder="Aman Gupta"
                                                        className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C]"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Role & Company</label>
                                                    <input
                                                        type="text"
                                                        value={testimonialForm.role}
                                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                                                        placeholder="Founder, Elysian Apparel"
                                                        className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C]"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Rating (Stars)</label>
                                                    <select
                                                        value={testimonialForm.rating}
                                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value, 10) })}
                                                        className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C]"
                                                    >
                                                        <option value={5}>5 Stars ★★★★★</option>
                                                        <option value={4}>4 Stars ★★★★</option>
                                                        <option value={3}>3 Stars ★★★</option>
                                                        <option value={2}>2 Stars ★★</option>
                                                        <option value={1}>1 Star ★</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Avatar URL or Upload</label>
                                                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                                                        <input
                                                            type="text"
                                                            value={testimonialForm.avatar}
                                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                                                            placeholder="https://... or click Upload"
                                                            className="flex-1 bg-[#0A0A0A] border border-[#27272A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C]"
                                                        />
                                                        <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#27272A] border border-[#27272A] text-white font-semibold text-xs cursor-pointer shrink-0 transition-colors">
                                                            <Upload className="w-4 h-4 text-[#1ABC9C]" />
                                                            {uploading ? "Uploading..." : "Upload File"}
                                                            <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} className="hidden" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#B0B0B0] uppercase tracking-wider mb-2">Quote / Review</label>
                                                <textarea
                                                    rows={4}
                                                    value={testimonialForm.quote}
                                                    onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                                                    placeholder="Braniva took over the whole catalog — titles, images, everything..."
                                                    className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1ABC9C]"
                                                    required
                                                ></textarea>
                                            </div>

                                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272A]">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTestimonialForm(false)}
                                                    className="px-6 py-3 rounded-xl bg-[#1F1F1F] text-[#B0B0B0] text-xs font-bold hover:text-white cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-6 py-3 rounded-xl bg-[#1ABC9C] text-[#052222] text-xs font-bold hover:bg-[#1dd3af] transition-all cursor-pointer"
                                                >
                                                    {editingTestimonialId ? "Update Testimonial" : "Save Testimonial"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
