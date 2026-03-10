require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function testCal() {
    const calendarGoogleAuth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/calendar.events',
        ],
        clientOptions: {
            subject: process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL
        }
    });

    const calendar = google.calendar('v3');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    const startDateTime = new Date();
    startDateTime.setHours(startDateTime.getHours() + 1);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const eventPayload = {
        summary: `Strategy Call: Test / Braniva`,
        description: `Lead Type: Test\nCompany: Test\nPhone: 1234567890\nEmail: test@test.com`,
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

    try {
        const authClient = await calendarGoogleAuth.getClient();
        console.log("Got Auth Client with subject:", process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL);
        const res = await calendar.events.insert({
            auth: authClient,
            calendarId: calendarId,
            requestBody: eventPayload,
            conferenceDataVersion: 1,
            sendUpdates: 'none',
        });
        console.log("Success! Link:", res.data.hangoutLink || res.data.htmlLink);
    } catch (e) {
        console.error("API error:", e.message);
        if (e.response && e.response.data) {
            console.error("Details:", JSON.stringify(e.response.data, null, 2));
        }
    }
}

testCal();
