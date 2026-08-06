import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { galleryData, GalleryItem } from '@/data/galleryData';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'galleryStore.json');

function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('Database URL not configured');
    }
    return neon(databaseUrl);
}

// Fallback JSON file storage helpers
function readLocalGallery(): GalleryItem[] {
    try {
        if (fs.existsSync(STORE_PATH)) {
            const data = fs.readFileSync(STORE_PATH, 'utf-8');
            const items = JSON.parse(data);
            if (Array.isArray(items) && items.length > 0) {
                return items;
            }
        }
    } catch (e) {
        console.error('Failed to read galleryStore.json, falling back to static data:', e);
    }
    // Default initial data
    return galleryData;
}

function writeLocalGallery(items: GalleryItem[]): void {
    try {
        const dir = path.dirname(STORE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed to write galleryStore.json:', e);
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

export async function GET() {
    try {
        if (process.env.DATABASE_URL) {
            const sql = getDb();
            // Ensure table exists
            await sql`
                CREATE TABLE IF NOT EXISTS gallery (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    category TEXT NOT NULL,
                    client TEXT NOT NULL,
                    image_url TEXT NOT NULL,
                    description TEXT NOT NULL,
                    metrics TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            const rows = await sql`SELECT * FROM gallery ORDER BY id ASC`;
            if (rows.length > 0) {
                const formatted = rows.map((r: any) => ({
                    id: String(r.id),
                    title: r.title,
                    category: r.category,
                    client: r.client,
                    imageUrl: r.image_url || r.imageUrl,
                    description: r.description,
                    metrics: r.metrics
                }));
                return NextResponse.json(formatted);
            }
        }
    } catch (error) {
        console.warn('Neon DB not available or table empty, using local file store:', error);
    }

    const items = readLocalGallery();
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, category, client, imageUrl, description, metrics } = body;

        if (!imageUrl) {
            return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
        }

        const itemTitle = title || 'Showcase Photo';
        const itemCategory = category || 'Showcase';

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                await sql`
                    INSERT INTO gallery (title, category, client, image_url, description, metrics)
                    VALUES (${itemTitle}, ${itemCategory}, ${client || ''}, ${imageUrl}, ${description || ''}, ${metrics || ''})
                `;
                return NextResponse.json({ success: true }, { status: 201 });
            } catch (dbErr) {
                console.error('Database insert failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalGallery();
        const newItem: GalleryItem = {
            id: String(Date.now()),
            title: itemTitle,
            category: itemCategory,
            client: client || '',
            imageUrl,
            description: description || '',
            metrics: metrics || ''
        };
        items.push(newItem);
        writeLocalGallery(items);

        return NextResponse.json({ success: true, item: newItem }, { status: 201 });
    } catch (error) {
        console.error('Failed to create gallery item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, title, category, client, imageUrl, description, metrics } = body;

        if (!id || !title || !category || !imageUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                const numericId = parseInt(id, 10);
                if (!isNaN(numericId)) {
                    await sql`
                        UPDATE gallery
                        SET title = ${title}, category = ${category}, client = ${client || ''}, image_url = ${imageUrl}, description = ${description || ''}, metrics = ${metrics || ''}
                        WHERE id = ${numericId}
                    `;
                    return NextResponse.json({ success: true });
                }
            } catch (dbErr) {
                console.error('Database update failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalGallery();
        const updatedItems = items.map(item => {
            if (String(item.id) === String(id)) {
                return {
                    id: String(id),
                    title,
                    category,
                    client: client || '',
                    imageUrl,
                    description: description || '',
                    metrics: metrics || ''
                };
            }
            return item;
        });
        writeLocalGallery(updatedItems);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update gallery item:', error);
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
            return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                const numericId = parseInt(id, 10);
                if (!isNaN(numericId)) {
                    await sql`DELETE FROM gallery WHERE id = ${numericId}`;
                    return NextResponse.json({ success: true });
                }
            } catch (dbErr) {
                console.error('Database delete failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalGallery();
        const filtered = items.filter(item => String(item.id) !== String(id));
        writeLocalGallery(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete gallery item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
