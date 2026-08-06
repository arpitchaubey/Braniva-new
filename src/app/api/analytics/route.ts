import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'trafficStore.json');

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

function readLocalTraffic(): any[] {
    try {
        if (fs.existsSync(STORE_PATH)) {
            const data = fs.readFileSync(STORE_PATH, 'utf-8');
            const items = JSON.parse(data);
            if (Array.isArray(items)) {
                return items;
            }
        }
    } catch (e) {
        console.error('Failed to read trafficStore.json:', e);
    }
    return [];
}

function writeLocalTraffic(items: any[]) {
    try {
        // Keep max 5000 recent events locally
        const recent = items.slice(0, 5000);
        fs.writeFileSync(STORE_PATH, JSON.stringify(recent, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed to write trafficStore.json:', e);
    }
}

// POST: Log a real page view event
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { page_path, referrer, visitor_id } = body;

        const cleanPath = page_path || '/';
        const cleanReferrer = referrer || 'Direct';
        const cleanVisitor = visitor_id || 'anon';
        const now = new Date().toISOString();

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                // Ensure pageviews table exists
                await sql`
                    CREATE TABLE IF NOT EXISTS pageviews (
                        id SERIAL PRIMARY KEY,
                        page_path TEXT NOT NULL,
                        referrer TEXT NOT NULL,
                        visitor_id TEXT NOT NULL,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `;
                await sql`
                    INSERT INTO pageviews (page_path, referrer, visitor_id)
                    VALUES (${cleanPath}, ${cleanReferrer}, ${cleanVisitor})
                `;
            } catch (dbErr) {
                console.warn('Neon DB traffic log warning:', dbErr);
            }
        }

        // Local store fallback
        const traffic = readLocalTraffic();
        traffic.unshift({
            id: String(Date.now()),
            page_path: cleanPath,
            referrer: cleanReferrer,
            visitor_id: cleanVisitor,
            timestamp: now
        });
        writeLocalTraffic(traffic);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Analytics tracking error:', err);
        return NextResponse.json({ error: 'Failed to log traffic' }, { status: 500 });
    }
}

// GET: Return real analytics aggregated metrics to Admin Console
export async function GET(req: Request) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let events: any[] = [];

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                const rows = await sql`SELECT * FROM pageviews ORDER BY timestamp DESC LIMIT 5000`;
                if (rows && rows.length > 0) {
                    events = rows.map((r: any) => ({
                        id: String(r.id),
                        page_path: r.page_path,
                        referrer: r.referrer,
                        visitor_id: r.visitor_id,
                        timestamp: r.timestamp
                    }));
                }
            } catch (dbErr) {
                console.warn('Neon DB fetch pageviews warning:', dbErr);
            }
        }

        if (events.length === 0) {
            events = readLocalTraffic();
        }

        const totalViews = events.length;
        const uniqueVisitors = new Set(events.map(e => e.visitor_id)).size;

        // Top pages breakdown
        const pageCounts: Record<string, number> = {};
        const channelCounts: Record<string, number> = {
            'Direct': 0,
            'Google Organic': 0,
            'Social Media': 0,
            'Referral': 0
        };

        events.forEach(e => {
            const p = e.page_path || '/';
            pageCounts[p] = (pageCounts[p] || 0) + 1;

            const ref = (e.referrer || '').toLowerCase();
            if (ref.includes('google') || ref.includes('bing') || ref.includes('search')) {
                channelCounts['Google Organic']++;
            } else if (ref.includes('instagram') || ref.includes('facebook') || ref.includes('linkedin') || ref.includes('twitter') || ref.includes('t.co')) {
                channelCounts['Social Media']++;
            } else if (ref.includes('http') || ref.includes('www')) {
                channelCounts['Referral']++;
            } else {
                channelCounts['Direct']++;
            }
        });

        const topPages = Object.entries(pageCounts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return NextResponse.json({
            totalViews,
            uniqueVisitors,
            topPages,
            channelCounts,
            recentEvents: events.slice(0, 10)
        });
    } catch (err) {
        console.error('Failed to compute analytics:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
