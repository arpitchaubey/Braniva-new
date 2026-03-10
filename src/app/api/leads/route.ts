import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

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

        // 1. Insert into Neon Postgres Database (Source of Truth)
        await sql`
      INSERT INTO leads (
        lead_type, name, email, phone, business_type, company_name, message, meeting_date, meeting_time
      )
      VALUES (
        ${lead_type}, ${name}, ${email}, ${phone}, ${business_type}, ${company_name || null}, ${message || null}, ${meeting_date || null}, ${meeting_time || null}
      )
    `;

        // 2. Dispatch Email via Resend (if configured)
        if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);

                console.log("Attempting to send Internal Notification email...");
                // Email to the Site Owner (Internal Notification)
                const internalEmailResponse = await resend.emails.send({
                    from: 'Braniva Alerts <info@braniva.in>', // Using verified domain
                    to: process.env.CONTACT_EMAIL,
                    subject: `New Lead: ${name} (${lead_type})`,
                    html: `
                        <h2>New Lead Submission</h2>
                        <p><strong>Type:</strong> ${lead_type}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Business Type:</strong> ${business_type}</p>
                        <p><strong>Company:</strong> ${company_name || 'N/A'}</p>
                        <p><strong>Message:</strong> ${message || 'N/A'}</p>
                        <p><strong>Meeting Requested:</strong> ${meeting_date ? `${meeting_date} at ${meeting_time}` : 'No'}</p>
                    `
                });
                console.log("Internal Email Response:", internalEmailResponse);

                console.log("Attempting to send Client Auto-reply email to:", email);
                // Auto-reply Email to the Client (External Confirmation)
                const clientEmailResponse = await resend.emails.send({
                    from: 'Braniva <info@braniva.in>', // Using verified domain
                    to: email, // Send to the user's submitted email
                    subject: `Thank you for contacting Braniva, ${name}!`,
                    html: `
                        <h2>Hello ${name},</h2>
                        <p>Thank you for reaching out to Braniva! We have received your inquiry regarding <strong>${lead_type}</strong>.</p>
                        <p>One of our growth specialists will review your details and get back to you shortly.</p>
                        <p>Best regards,<br/>The Braniva Team</p>
                    `
                });
                console.log("Client Email Response:", clientEmailResponse);

            } catch (emailError) {
                console.error("Failed to send email notification (Exception caught):", emailError);
            }
        } else {
            console.log("Skipping Resend: RESEND_API_KEY or CONTACT_EMAIL missing.");
        }

        // 3. Append to Google Sheets (if configured)
        if (
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
            process.env.GOOGLE_PRIVATE_KEY &&
            process.env.GOOGLE_SHEET_ID
        ) {
            try {
                // Initialize auth for Google APIs
                const serviceAccountAuth = new JWT({
                    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    // Parse private key correctly to handle escaped newlines in .env
                    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });

                const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();

                const sheet = doc.sheetsByIndex[0]; // Assuming we append to the first tab

                try {
                    await sheet.loadHeaderRow();
                } catch (e) {
                    // If no headers exist, set them up on the first row
                    await sheet.setHeaderRow([
                        'Date', 'LeadType', 'Name', 'Email', 'Phone',
                        'BusinessType', 'CompanyName', 'MeetingDate', 'MeetingTime', 'Message'
                    ]);
                }

                await sheet.addRow({
                    Date: new Date().toLocaleDateString(),
                    LeadType: lead_type,
                    Name: name,
                    Email: email,
                    Phone: phone,
                    BusinessType: business_type,
                    CompanyName: company_name || '',
                    MeetingDate: meeting_date || '',
                    MeetingTime: meeting_time || '',
                    Message: message || ''
                });

            } catch (sheetError) {
                console.error("Failed to append to Google Sheets:", sheetError);
            }
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to process submission:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
