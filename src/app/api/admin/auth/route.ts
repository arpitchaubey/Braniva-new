import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'braniva2026';

        if (username === adminUser && password === adminPass) {
            // Create a simple token based on base64 encoding of credentials
            const token = Buffer.from(`${username}:${password}`).toString('base64');
            return NextResponse.json({ success: true, token });
        }

        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
