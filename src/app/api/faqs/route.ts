import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'faqsStore.json');

function readLocalFaqs(): any[] {
    try {
        if (fs.existsSync(STORE_PATH)) {
            const data = fs.readFileSync(STORE_PATH, 'utf-8');
            const items = JSON.parse(data);
            if (Array.isArray(items)) return items;
        }
    } catch (e) {
        console.error('Failed to read faqsStore.json:', e);
    }
    return [];
}

function writeLocalFaqs(items: any[]) {
    try {
        fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed to write faqsStore.json:', e);
    }
}

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

// Auto-sync function to replace stale DB records with the 18 master FAQs
async function syncNeonWithMasterFaqs(sql: any) {
    try {
        const masterFaqs = readLocalFaqs();
        if (masterFaqs.length === 0) return;

        // Wipe old DB entries and reset sequence
        await sql`DELETE FROM faqs;`;

        for (const item of masterFaqs) {
            await sql`
                INSERT INTO faqs (question, answer, category, sort_order)
                VALUES (${item.question}, ${item.answer}, ${item.category}, ${item.sort_order || 0})
            `;
        }
        console.log(`Successfully synced ${masterFaqs.length} new FAQs to Neon DB.`);
    } catch (err) {
        console.error('Failed to sync master FAQs to Neon DB:', err);
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        const forceReset = searchParams.get('reset') === 'true';
        const parsedLimit = limit ? parseInt(limit, 10) : null;
        const localFaqs = readLocalFaqs();

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                const dbFaqs = await sql`SELECT * FROM faqs ORDER BY sort_order ASC, id ASC`;

                // If DB has old data (not 18 items or question differs) or reset requested, resync
                const dbMatchesMaster = dbFaqs.length === localFaqs.length && 
                    dbFaqs.length > 0 && 
                    dbFaqs[0]?.question?.trim() === localFaqs[0]?.question?.trim();

                if (!dbMatchesMaster || forceReset) {
                    await syncNeonWithMasterFaqs(sql);
                    const freshDbFaqs = await sql`SELECT * FROM faqs ORDER BY sort_order ASC, id ASC`;
                    if (parsedLimit && !isNaN(parsedLimit)) {
                        return NextResponse.json(freshDbFaqs.slice(0, parsedLimit));
                    }
                    return NextResponse.json(freshDbFaqs);
                }

                if (parsedLimit && !isNaN(parsedLimit)) {
                    return NextResponse.json(dbFaqs.slice(0, parsedLimit));
                }
                return NextResponse.json(dbFaqs);
            } catch (dbErr) {
                console.warn('Neon DB fetch FAQs fallback to JSON store:', dbErr);
            }
        }

        const sorted = localFaqs.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        if (parsedLimit && !isNaN(parsedLimit)) {
            return NextResponse.json(sorted.slice(0, parsedLimit));
        }
        return NextResponse.json(sorted);
    } catch (error) {
        console.error('Failed to fetch faqs:', error);
        return NextResponse.json(readLocalFaqs());
    }
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { question, answer, category, sort_order } = body;

        if (!question || !answer || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const order = sort_order !== undefined ? parseInt(sort_order, 10) : 0;
        const newItem = {
            id: Date.now(),
            question,
            answer,
            category,
            sort_order: order,
            created_at: new Date().toISOString()
        };

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                await sql`
                    INSERT INTO faqs (question, answer, category, sort_order)
                    VALUES (${question}, ${answer}, ${category}, ${order})
                `;
            } catch (dbErr) {
                console.error('Neon DB create FAQ error:', dbErr);
            }
        }

        const localFaqs = readLocalFaqs();
        localFaqs.push(newItem);
        writeLocalFaqs(localFaqs);

        return NextResponse.json({ success: true, item: newItem }, { status: 201 });
    } catch (error) {
        console.error('Failed to create faq:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, question, answer, category, sort_order } = body;

        if (!id || !question || !answer || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const order = sort_order !== undefined ? parseInt(sort_order, 10) : 0;

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                await sql`
                    UPDATE faqs
                    SET question = ${question}, answer = ${answer}, category = ${category}, sort_order = ${order}
                    WHERE id = ${id}
                `;
            } catch (dbErr) {
                console.error('Neon DB update FAQ error:', dbErr);
            }
        }

        const localFaqs = readLocalFaqs();
        const index = localFaqs.findIndex(item => String(item.id) === String(id));
        if (index !== -1) {
            localFaqs[index] = { ...localFaqs[index], question, answer, category, sort_order: order };
            writeLocalFaqs(localFaqs);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update faq:', error);
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
            return NextResponse.json({ error: 'Missing faq id' }, { status: 400 });
        }

        if (process.env.DATABASE_URL) {
            try {
                const sql = neon(process.env.DATABASE_URL);
                await sql`DELETE FROM faqs WHERE id = ${parseInt(id, 10)}`;
            } catch (dbErr) {
                console.error('Neon DB delete FAQ error:', dbErr);
            }
        }

        const localFaqs = readLocalFaqs();
        const filtered = localFaqs.filter(item => String(item.id) !== String(id));
        writeLocalFaqs(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete faq:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
