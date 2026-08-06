import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { testimonialsData, Testimonial } from '@/data/testimonialsData';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'testimonialsStore.json');

function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('Database URL not configured');
    }
    return neon(databaseUrl);
}

// Fallback JSON file storage helpers
function readLocalTestimonials(): Testimonial[] {
    try {
        if (fs.existsSync(STORE_PATH)) {
            const data = fs.readFileSync(STORE_PATH, 'utf-8');
            const items = JSON.parse(data);
            if (Array.isArray(items) && items.length > 0) {
                return items;
            }
        }
    } catch (e) {
        console.error('Failed to read testimonialsStore.json, falling back to static data:', e);
    }
    return testimonialsData;
}

function writeLocalTestimonials(items: Testimonial[]): void {
    try {
        const dir = path.dirname(STORE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed to write testimonialsStore.json:', e);
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
            await sql`
                CREATE TABLE IF NOT EXISTS testimonials (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    role TEXT NOT NULL,
                    quote TEXT NOT NULL,
                    avatar TEXT NOT NULL,
                    rating INTEGER DEFAULT 5,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            const rows = await sql`SELECT * FROM testimonials ORDER BY id ASC`;
            if (rows.length > 0) {
                const formatted = rows.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    role: r.role,
                    quote: r.quote,
                    avatar: r.avatar,
                    rating: r.rating || 5
                }));
                return NextResponse.json(formatted);
            }
        }
    } catch (error) {
        console.warn('Neon DB not available or table empty, using local file store:', error);
    }

    const items = readLocalTestimonials();
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, role, quote, avatar, rating } = body;

        if (!name || !quote) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const avatarUrl = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
        const userRating = rating ? parseInt(rating, 10) : 5;

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                await sql`
                    INSERT INTO testimonials (name, role, quote, avatar, rating)
                    VALUES (${name}, ${role || ''}, ${quote}, ${avatarUrl}, ${userRating})
                `;
                return NextResponse.json({ success: true }, { status: 201 });
            } catch (dbErr) {
                console.error('Database insert failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalTestimonials();
        const newItem: Testimonial = {
            id: Date.now(),
            name,
            role: role || '',
            quote,
            avatar: avatarUrl,
            rating: userRating
        };
        items.push(newItem);
        writeLocalTestimonials(items);

        return NextResponse.json({ success: true, item: newItem }, { status: 201 });
    } catch (error) {
        console.error('Failed to create testimonial:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, name, role, quote, avatar, rating } = body;

        if (!id || !name || !quote) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const avatarUrl = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
        const userRating = rating ? parseInt(rating, 10) : 5;

        if (process.env.DATABASE_URL) {
            try {
                const sql = getDb();
                const numericId = parseInt(String(id), 10);
                if (!isNaN(numericId)) {
                    await sql`
                        UPDATE testimonials
                        SET name = ${name}, role = ${role || ''}, quote = ${quote}, avatar = ${avatarUrl}, rating = ${userRating}
                        WHERE id = ${numericId}
                    `;
                    return NextResponse.json({ success: true });
                }
            } catch (dbErr) {
                console.error('Database update failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalTestimonials();
        const updatedItems = items.map(item => {
            if (String(item.id) === String(id)) {
                return {
                    id,
                    name,
                    role: role || '',
                    quote,
                    avatar: avatarUrl,
                    rating: userRating
                };
            }
            return item;
        });
        writeLocalTestimonials(updatedItems);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update testimonial:', error);
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
                    await sql`DELETE FROM testimonials WHERE id = ${numericId}`;
                    return NextResponse.json({ success: true });
                }
            } catch (dbErr) {
                console.error('Database delete failed, using fallback:', dbErr);
            }
        }

        // Local fallback
        const items = readLocalTestimonials();
        const filtered = items.filter(item => String(item.id) !== String(id));
        writeLocalTestimonials(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete testimonial:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
