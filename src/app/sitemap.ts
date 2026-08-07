import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { blogsData } from '@/data/blogsData';

const serviceSlugs = [
  'web',
  'marketplace',
  'logistics',
  'marketing',
  'listing',
  'email',
  'whatsapp',
  'brand-identity',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://braniva.in';

  // 1. Core static page routes with granular priorities & frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Individual Service Detail Pages (/services/[slug])
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Dynamic + Static Blog Post Routes (/blog/[slug])
  const allBlogsMap = new Map<string, { slug: string; date?: string }>();

  // Add static fallback blogs first
  blogsData.forEach((b) => {
    allBlogsMap.set(b.slug, { slug: b.slug, date: b.date });
  });

  // Supplement with custom stored blogs if available
  try {
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'blogsStore.json');
    if (fs.existsSync(blogsPath)) {
      const content = fs.readFileSync(blogsPath, 'utf-8').replace(/^\uFEFF/, '');
      if (content.trim()) {
        const storedBlogs = JSON.parse(content);
        if (Array.isArray(storedBlogs)) {
          storedBlogs.forEach((post) => {
            if (post.slug) {
              allBlogsMap.set(post.slug, { slug: post.slug, date: post.date });
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error reading blogsStore.json for sitemap:', error);
  }

  const blogRoutes: MetadataRoute.Sitemap = Array.from(allBlogsMap.values()).map((post) => {
    let lastMod = new Date().toISOString();
    if (post.date) {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed.toISOString();
      }
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
