import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { blogsData, Blog } from '@/data/blogsData';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'blogsStore.json');

function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('Database URL not configured');
    }
    return neon(databaseUrl);
}

// Fallback JSON file storage helpers
function readLocalBlogs(): Blog[] {
    try {
        if (fs.existsSync(STORE_PATH)) {
            const data = fs.readFileSync(STORE_PATH, 'utf-8');
            const items = JSON.parse(data);
            if (Array.isArray(items) && items.length > 0) {
                return items;
            }
        }
    } catch (e) {
        console.error('Failed to read blogsStore.json, falling back to static data:', e);
    }
    return blogsData;
}

function writeLocalBlogs(items: Blog[]): void {
    try {
        const dir = path.dirname(STORE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed to write blogsStore.json:', e);
    }
}

// Helper to verify admin token
function verifyAdmin(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const token = authHeader.substring(7);
    try {
        const credentials = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'braniva2026';
        return username === adminUser && password === adminPass;
    } catch {
        return false;
    }
}

// Flag to ensure DB sync happens once per server process or on GET
let isDbSynced = false;

async function syncDbWithLocal(sql: any) {
    if (isDbSynced) return;
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                excerpt TEXT NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                read_time VARCHAR(50) NOT NULL,
                date VARCHAR(100) NOT NULL,
                author_name VARCHAR(100) NOT NULL,
                author_role VARCHAR(100) NOT NULL,
                author_avatar VARCHAR(255) NOT NULL,
                image_url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const defaults = readLocalBlogs();
        // Upsert all current valid blogs
        for (const b of defaults) {
            await sql`
                INSERT INTO blogs (slug, title, excerpt, content, category, read_time, date, author_name, author_role, author_avatar, image_url)
                VALUES (${b.slug}, ${b.title}, ${b.excerpt}, ${b.content}, ${b.category}, ${b.read_time}, ${b.date}, ${b.author_name}, ${b.author_role}, ${b.author_avatar}, ${b.image_url})
                ON CONFLICT (slug) DO UPDATE SET
                    title = EXCLUDED.title,
                    excerpt = EXCLUDED.excerpt,
                    content = EXCLUDED.content,
                    category = EXCLUDED.category,
                    read_time = EXCLUDED.read_time,
                    date = EXCLUDED.date,
                    author_name = EXCLUDED.author_name,
                    author_role = EXCLUDED.author_role,
                    author_avatar = EXCLUDED.author_avatar,
                    image_url = EXCLUDED.image_url;
            `;
        }

        // Clean up old sample posts if any exist
        const validSlugs = defaults.map(b => b.slug);
        const existingPosts = await sql`SELECT id, slug FROM blogs`;
        for (const post of existingPosts) {
            if (!validSlugs.includes(post.slug)) {
                await sql`DELETE FROM blogs WHERE id = ${post.id}`;
            }
        }

        isDbSynced = true;
    } catch (e) {
        console.error('Failed to sync DB with local blogs:', e);
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const limit = searchParams.get('limit');

    try {
        if (process.env.DATABASE_URL) {
            const sql = getDb();
            await syncDbWithLocal(sql);

            if (slug) {
                const posts = await sql`SELECT * FROM blogs WHERE slug = ${slug} LIMIT 1`;
                if (posts.length > 0) {
                    return NextResponse.json(posts[0]);
                }
            } else if (limit) {
                const parsedLimit = parseInt(limit, 10);
                if (!isNaN(parsedLimit)) {
                    const posts = await sql`SELECT * FROM blogs ORDER BY id ASC LIMIT ${parsedLimit}`;
                    if (posts.length > 0) return NextResponse.json(posts);
                }
            } else {
                const posts = await sql`SELECT * FROM blogs ORDER BY id ASC`;
                if (posts.length > 0) return NextResponse.json(posts);
            }
        }
    } catch (error) {
        console.warn('Neon DB not available, using local file store:', error);
    }

    // Fallback to local store / blogsData
    const blogs = readLocalBlogs();

    if (slug) {
        const post = blogs.find(b => b.slug === slug);
        if (!post) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    }

    if (limit) {
        const parsedLimit = parseInt(limit, 10);
        if (!isNaN(parsedLimit)) {
            return NextResponse.json(blogs.slice(0, parsedLimit));
        }
    }

    return NextResponse.json(blogs);
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const {
            slug,
            title,
            excerpt,
            content,
            category,
            read_time,
            date,
            author_name,
            author_role,
            author_avatar,
            image_url
        } = body;

        if (!slug || !title || !excerpt || !content || !category || !read_time || !date || !author_name || !author_role || !author_avatar || !image_url) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                const existing = await sql`SELECT id FROM blogs WHERE slug = ${slug} LIMIT 1`;
                if (existing.length > 0) {
                    return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 400 });
                }

                await sql`
                    INSERT INTO blogs (slug, title, excerpt, content, category, read_time, date, author_name, author_role, author_avatar, image_url)
                    VALUES (${slug}, ${title}, ${excerpt}, ${content}, ${category}, ${read_time}, ${date}, ${author_name}, ${author_role}, ${author_avatar}, ${image_url})
                `;
                return NextResponse.json({ success: true }, { status: 201 });
            } catch (dbErr) {
                console.error('DB insert failed, fallback to local store:', dbErr);
            }
        }

        // Local fallback
        const blogs = readLocalBlogs();
        if (blogs.some(b => b.slug === slug)) {
            return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 400 });
        }

        const newBlog: Blog = {
            id: Date.now(),
            slug,
            title,
            excerpt,
            content,
            category,
            read_time,
            date,
            author_name,
            author_role,
            author_avatar,
            image_url
        };
        blogs.unshift(newBlog);
        writeLocalBlogs(blogs);

        return NextResponse.json({ success: true, item: newBlog }, { status: 201 });
    } catch (error) {
        console.error('Failed to create blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const {
            id,
            slug,
            title,
            excerpt,
            content,
            category,
            read_time,
            date,
            author_name,
            author_role,
            author_avatar,
            image_url
        } = body;

        if (!id || !slug || !title || !excerpt || !content || !category || !read_time || !date || !author_name || !author_role || !author_avatar || !image_url) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                const existing = await sql`SELECT id FROM blogs WHERE slug = ${slug} AND id != ${id} LIMIT 1`;
                if (existing.length > 0) {
                    return NextResponse.json({ error: 'Another blog post with this slug already exists' }, { status: 400 });
                }

                await sql`
                    UPDATE blogs
                    SET slug = ${slug}, title = ${title}, excerpt = ${excerpt}, content = ${content}, 
                        category = ${category}, read_time = ${read_time}, date = ${date}, 
                        author_name = ${author_name}, author_role = ${author_role}, 
                        author_avatar = ${author_avatar}, image_url = ${image_url}
                    WHERE id = ${id}
                `;
                return NextResponse.json({ success: true });
            } catch (dbErr) {
                console.error('DB update failed, fallback to local store:', dbErr);
            }
        }

        // Local fallback
        const blogs = readLocalBlogs();
        const updated = blogs.map(b => {
            if (Number(b.id) === Number(id)) {
                return {
                    id: Number(id),
                    slug,
                    title,
                    excerpt,
                    content,
                    category,
                    read_time,
                    date,
                    author_name,
                    author_role,
                    author_avatar,
                    image_url
                };
            }
            return b;
        });
        writeLocalBlogs(updated);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                await sql`DELETE FROM blogs WHERE id = ${parseInt(id, 10)}`;
                return NextResponse.json({ success: true });
            } catch (dbErr) {
                console.error('DB delete failed, fallback to local store:', dbErr);
            }
        }

        // Local fallback
        const blogs = readLocalBlogs();
        const filtered = blogs.filter(b => Number(b.id) !== Number(id));
        writeLocalBlogs(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
