import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (env vars set in Vercel dashboard)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Check if Cloudinary is configured
        if (
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET
        ) {
            // Upload to Cloudinary via base64
            const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            const result = await cloudinary.uploader.upload(base64, {
                folder: 'braniva',
                transformation: [{ quality: 'auto', fetch_format: 'auto' }],
            });

            return NextResponse.json({ success: true, url: result.secure_url });
        }

        // Fallback: return error if Cloudinary not configured (filesystem not writable in production)
        return NextResponse.json(
            {
                error: 'Image hosting not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment variables.',
            },
            { status: 503 }
        );
    } catch (error) {
        console.error('Failed to upload file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
