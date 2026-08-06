import { NextResponse } from 'next/server';

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

// SHA-1 HMAC using Web Crypto API (built-in to Node/Edge — no external package needed)
async function sha1(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const key = encoder.encode(process.env.CLOUDINARY_API_SECRET || '');
    const cryptoKey = await crypto.subtle.importKey(
        'raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            return NextResponse.json(
                { error: 'Cloudinary environment variables not set. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your Vercel project settings.' },
                { status: 503 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file') as Blob | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Build signed upload request — no SDK needed, pure REST
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const folder = 'braniva';
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
        const signature = await sha1(`${paramsToSign}${apiSecret}`);

        // Build multipart form data for Cloudinary REST API
        const uploadForm = new FormData();
        uploadForm.append('file', file);
        uploadForm.append('api_key', apiKey);
        uploadForm.append('timestamp', timestamp);
        uploadForm.append('signature', signature);
        uploadForm.append('folder', folder);

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: 'POST', body: uploadForm }
        );

        if (!uploadRes.ok) {
            const err = await uploadRes.text();
            console.error('Cloudinary upload error:', err);
            return NextResponse.json({ error: 'Cloudinary upload failed', detail: err }, { status: 500 });
        }

        const result = await uploadRes.json() as { secure_url: string };
        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error) {
        console.error('Upload route error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
