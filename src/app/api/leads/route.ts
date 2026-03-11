import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

const calendar = google.calendar('v3');
const calendarGoogleAuth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
        'https://www.googleapis.com/auth/calendar.events',
    ],
    // The email of the actual Google Workspace user we want to impersonate
    // (Needs Domain-Wide Delegation turned on in the Admin console)
    clientOptions: {
        subject: process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL
    }
});

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

        let meetingLink = ""; // Initialize meetingLink

        // If it's a meeting request, generate the Google Calendar Event FIRST
        if (meeting_date && meeting_time) {
            const calendarId = process.env.GOOGLE_CALENDAR_ID;
            if (calendarId) {
                try {
                    const authClient = await calendarGoogleAuth.getClient();

                    // Parse standard local times to proper ISO 8601 for insertion
                    const startDateTime = new Date(`${meeting_date}T${meeting_time}:00+05:30`);
                    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 min duration

                    // Check if delegation email is set, otherwise fall back to regular insert
                    if (process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL) {
                        try {
                            const eventPayload = {
                                summary: `Consultation Call: ${name} / Braniva`,
                                description: `Lead Type: ${business_type}\nCompany: ${company_name}\nPhone: ${phone}\nEmail: ${email}`,
                                start: {
                                    dateTime: startDateTime.toISOString(),
                                    timeZone: 'Asia/Kolkata',
                                },
                                end: {
                                    dateTime: endDateTime.toISOString(),
                                    timeZone: 'Asia/Kolkata',
                                },
                                conferenceData: {
                                    createRequest: {
                                        requestId: `braniva-${Date.now()}`,
                                        conferenceSolutionKey: {
                                            type: 'hangoutsMeet'
                                        }
                                    }
                                }
                            };

                            // @ts-ignore
                            const res = await calendar.events.insert({
                                auth: authClient as any,
                                calendarId: calendarId,
                                requestBody: eventPayload,
                                conferenceDataVersion: 1,
                                sendUpdates: 'none',
                            }) as any;

                            if (res.data && res.data.hangoutLink) {
                                meetingLink = res.data.hangoutLink; // Auto-generated Google Meet link
                                console.log("Google Meet Link Generated:", meetingLink);
                            } else if (res.data && res.data.htmlLink) {
                                meetingLink = res.data.htmlLink; // Fallback to calendar event
                                console.log("Google Calendar Event Created (No Meet Link):", meetingLink);
                            }
                        } catch (calError: any) {
                            console.error("Failed to create Google Calendar Event (Impersonation):", calError?.message || calError);
                            throw calError;
                        }
                    } else {
                        // Fallback behavior if Domain Wide Delegation Admin email isn't configured
                        const eventPayload = {
                            summary: `Consultation Call: ${name} / Braniva (Pending Meet Link)`,
                            description: `Lead Type: ${business_type}\nCompany: ${company_name}\nPhone: ${phone}\nEmail: ${email}`,
                            start: {
                                dateTime: startDateTime.toISOString(),
                                timeZone: 'Asia/Kolkata',
                            },
                            end: {
                                dateTime: endDateTime.toISOString(),
                                timeZone: 'Asia/Kolkata',
                            },
                        };

                        // @ts-ignore
                        const res = await calendar.events.insert({
                            auth: authClient as any,
                            calendarId: calendarId,
                            requestBody: eventPayload,
                            sendUpdates: 'none',
                        }) as any;

                        if (res.data && res.data.htmlLink) {
                            meetingLink = res.data.htmlLink;
                            console.log("Google Calendar Event Created:", meetingLink);
                        }
                    }
                } catch (calError) {
                    console.error("Failed to create Google Calendar Event:", calError);
                }
            } else {
                console.log("Skipping Calendar: GOOGLE_CALENDAR_ID missing");
            }
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
                    <div style="font-family: 'Inter', 'Manrope', Helvetica, Arial, sans-serif; background-color: #121212; padding: 40px 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #1F1F1F; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5); border: 1px solid #0F3D3E;">
                            <div style="background-color: #0F3D3E; padding: 20px 30px; text-align: center; border-bottom: 2px solid #1ABC9C;">
                                <img src="https://raw.githubusercontent.com/arpitchaubey/Braniva-new/main/public/logo.png" alt="Braniva" style="height: 48px; margin-bottom: 10px; display: inline-block;">
                                <h1 style="margin: 0; font-size: 24px; color: #FFFFFF; font-family: 'Sora', 'Poppins', sans-serif; font-weight: 700; letter-spacing: 0.025em; line-height: 1; text-align: center;">
                                    Braniva<span style="display: inline-block; width: 6px; height: 6px; background-color: #1ABC9C; border-radius: 50%; margin-left: 4px; vertical-align: middle;"></span>
                                </h1>
                                <p style="margin: 5px 0 0 0; color: #B0B0B0; font-size: 14px;">New Lead Submission</p>
                            </div>
                            <div style="padding: 30px;">
                                <p style="font-size: 16px; color: #B0B0B0; margin-top: 0;"><strong>Source:</strong> <span style="color: #1ABC9C;">${lead_type} Form</span></p>
                                
                                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0; width: 140px;">Name</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF; font-weight: 500;">${name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Email</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;"><a href="mailto:${email}" style="color: #1ABC9C; text-decoration: none;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Phone</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;">${phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Business</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;">${business_type}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Company</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;">${company_name || '<span style="color: #666666; font-style: italic;">Not provided</span>'}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Meeting</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;">${meeting_date ? `<span style="background-color: #0F3D3E; color: #1ABC9C; padding: 4px 8px; border-radius: 4px; font-size: 14px; border: 1px solid #1ABC9C;">${meeting_date} at ${meeting_time}</span>` : '<span style="color: #666666; font-style: italic;">Not requested</span>'}</td>
                                    </tr>
                                    ${meetingLink ? `
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #B0B0B0;">Google Meet</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #333333; color: #FFFFFF;"><a href="${meetingLink}" style="color: #1ABC9C; font-weight: 600;">Join Meeting</a></td>
                                    </tr>
                                    ` : ''}
                                </table>

                                <div style="margin-top: 30px; background-color: #121212; border-left: 4px solid #1ABC9C; padding: 16px; border-radius: 0 8px 8px 0;">
                                    <p style="margin: 0; color: #B0B0B0; font-size: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                                    <p style="margin: 0; color: #FFFFFF; font-size: 16px; white-space: pre-wrap;">${message || '<span style="color: #666666; font-style: italic;">No message provided</span>'}</p>
                                </div>
                                
                                <div style="margin-top: 40px; text-align: center;">
                                    <a href="mailto:${email}" style="background-color: #1ABC9C; color: #121212; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">Reply to Lead</a>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div style="font-family: 'Inter', 'Manrope', Helvetica, Arial, sans-serif; background-color: #121212; padding: 40px 20px; text-align: center;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #1F1F1F; border: 1px solid #0F3D3E; border-radius: 12px; overflow: hidden; text-align: left; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                            <div style="padding: 40px 30px 30px; border-bottom: 1px solid #333333; text-align: center; background-color: #0F3D3E;">
                                <img src="https://raw.githubusercontent.com/arpitchaubey/Braniva-new/main/public/logo.png" alt="Braniva Logo" style="height: 48px; margin-bottom: 10px; display: block;">
                                <h1 style="margin: 0; font-family: 'Sora', 'Poppins', sans-serif; font-size: 32px; color: #FFFFFF; font-weight: 700; letter-spacing: 0.025em; line-height: 1; text-align: center;">
                                    Braniva<span style="display: inline-block; width: 8px; height: 8px; background-color: #1ABC9C; border-radius: 50%; margin-left: 4px; vertical-align: middle;"></span>
                                </h1>
                            </div>
                            <div style="padding: 40px 30px;">
                                <h2 style="margin-top: 0; font-family: 'Sora', 'Poppins', sans-serif; font-size: 22px; color: #FFFFFF; font-weight: 600;">Hi ${name},</h2>
                                <p style="font-size: 16px; line-height: 1.6; color: #B0B0B0; margin-bottom: 24px;">
                                    Thank you for reaching out! We've successfully received your inquiry regarding <span style="color: #1ABC9C; font-weight: 600;">${lead_type}</span>.
                                </p>
                                ${meeting_date ? `
                                <div style="background-color: #0F3D3E; padding: 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #1ABC9C; text-align: center;">
                                    <p style="color: #FFFFFF; margin-top: 0; font-weight: 600; font-size: 18px;">✅ Your Consultation Call is Confirmed</p>
                                    <p style="color: #B0B0B0; margin-bottom: 16px;">${meeting_date} at ${meeting_time} IST</p>
                                    ${meetingLink ? `<a href="${meetingLink}" style="background-color: #1ABC9C; color: #121212; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">Join Google Meet</a>` : `<p style="color: #B0B0B0; font-size: 13px; margin: 0;">Our team will share the meeting link with you shortly.</p>`}
                                </div>
                                ` : ''}
                                <p style="font-size: 16px; line-height: 1.6; color: #B0B0B0; margin-bottom: 32px;">
                                    One of our growth specialists is reviewing your details and will get back to you shortly to discuss how we can help elevate your digital presence.
                                </p>
                                <div style="border-top: 1px solid #333333; padding-top: 24px;">
                                    <p style="margin: 0; font-size: 15px; color: #B0B0B0;">
                                        Best regards,<br/>
                                        <strong style="color: #FFFFFF; display: inline-block; margin-top: 8px; font-weight: 500;">The Braniva Team</strong>
                                    </p>
                                </div>
                            </div>
                            <div style="background-color: #121212; padding: 20px; text-align: center; border-top: 1px solid #333333;">
                                <a href="https://braniva.in" style="color: #1ABC9C; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">VISIT BRANIVA.IN</a>
                            </div>
                        </div>
                    </div>
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
