import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('Database URL not configured');
    }
    return neon(databaseUrl);
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

export async function GET(req: Request) {
    try {
        const sql = getDb();
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const studies = await sql`SELECT * FROM case_studies WHERE slug = ${slug} LIMIT 1`;
            if (studies.length === 0) {
                return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
            }
            return NextResponse.json(studies[0]);
        }

        const studies = await sql`SELECT * FROM case_studies ORDER BY created_at DESC`;
        return NextResponse.json(studies);
    } catch (error) {
        console.error('Failed to fetch case studies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sql = getDb();
        const body = await req.json();
        const { slug, title, category, overview, challenge, approach, outcome } = body;

        if (!slug || !title || !category || !overview || !challenge || !approach || !outcome) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if slug is unique
        const existing = await sql`SELECT id FROM case_studies WHERE slug = ${slug} LIMIT 1`;
        if (existing.length > 0) {
            return NextResponse.json({ error: 'A case study with this slug already exists' }, { status: 400 });
        }

        // Ensure approach is stored as a string
        const approachStr = typeof approach === 'string' ? approach : JSON.stringify(approach);

        await sql`
            INSERT INTO case_studies (slug, title, category, overview, challenge, approach, outcome)
            VALUES (${slug}, ${title}, ${category}, ${overview}, ${challenge}, ${approachStr}, ${outcome})
        `;

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create case study:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sql = getDb();
        const body = await req.json();
        const { id, slug, title, category, overview, challenge, approach, outcome } = body;

        if (!id || !slug || !title || !category || !overview || !challenge || !approach || !outcome) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if slug is unique to other records
        const existing = await sql`SELECT id FROM case_studies WHERE slug = ${slug} AND id != ${id} LIMIT 1`;
        if (existing.length > 0) {
            return NextResponse.json({ error: 'Another case study with this slug already exists' }, { status: 400 });
        }

        // Ensure approach is stored as a string
        const approachStr = typeof approach === 'string' ? approach : JSON.stringify(approach);

        await sql`
            UPDATE case_studies
            SET slug = ${slug}, title = ${title}, category = ${category}, 
                overview = ${overview}, challenge = ${challenge}, 
                approach = ${approachStr}, outcome = ${outcome}
            WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update case study:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const sql = getDb();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing case study id' }, { status: 400 });
        }

        await sql`DELETE FROM case_studies WHERE id = ${parseInt(id, 10)}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete case study:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
