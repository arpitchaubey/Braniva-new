import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return NextResponse.json({ error: 'Database URL not configured' }, { status: 500 });
        }

        const sql = neon(databaseUrl);
        const body = await req.json();

        const {
            lead_type,
            name,
            email,
            phone,
            business_type,
            company_name,
            message,
            meeting_date,
            meeting_time
        } = body;

        if (!lead_type || !name || !email || !phone || !business_type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await sql`
      INSERT INTO leads (
        lead_type, name, email, phone, business_type, company_name, message, meeting_date, meeting_time
      )
      VALUES (
        ${lead_type}, ${name}, ${email}, ${phone}, ${business_type}, ${company_name || null}, ${message || null}, ${meeting_date || null}, ${meeting_time || null}
      )
    `;

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
