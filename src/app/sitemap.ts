import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://braniva.in';

  // Core static pages
  const routes = [
    '',
    '/about',
    '/services',
    '/case-studies',
    '/blog',
    '/faq',
    '/schedule',
    '/contact',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'blogsStore.json');
    if (fs.existsSync(blogsPath)) {
      const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
      if (Array.isArray(blogsData)) {
        blogRoutes = blogsData.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error('Error generating blog sitemap entries:', error);
  }

  return [...routes, ...blogRoutes];
}
