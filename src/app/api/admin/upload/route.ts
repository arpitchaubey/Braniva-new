import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

export async function POST(req: Request) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as Blob | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Get file name from form data
        const filename = (formData.get('filename') as string) || 'upload_' + Date.now();
        const cleanFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define local upload directory
        const uploadDir = path.join(process.cwd(), 'public', 'gallery');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, cleanFilename);
        await fs.promises.writeFile(filePath, buffer);

        console.log(`Uploaded file saved to: ${filePath}`);
        return NextResponse.json({ success: true, url: `/gallery/${cleanFilename}` });
    } catch (error) {
        console.error('Failed to upload file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
