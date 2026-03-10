import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Google Auth client
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth });

/**
 * Handles fetching available meeting slots for a given date.
 * Validates against Google Calendar `freeBusy` endpoint.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get('date');

        if (!dateStr) {
            return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
        }

        const timeZone = searchParams.get('timezone') || 'Asia/Kolkata'; // Default to user's local timezone
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        if (!calendarId) {
            return NextResponse.json({ error: 'Calendar ID is not configured' }, { status: 500 });
        }

        // Define our business hours boundary (e.g. 10 AM to 5 PM)
        const startOfDay = new Date(`${dateStr}T10:00:00+05:30`);
        const endOfDay = new Date(`${dateStr}T17:00:00+05:30`);

        // Get FreeBusy status
        const freeBusyResponse = await calendar.freebusy.query({
            requestBody: {
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                timeZone: timeZone,
                items: [{ id: calendarId }],
            },
        });

        const busySlots = freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

        // Generate Available 30-minute block slots
        const availableSlots: string[] = [];
        let currentSlot = new Date(startOfDay);

        // Simple helper to check if a specific 30-min window overlaps with any busy ranges
        const isSlotFree = (slotStart: Date, slotEnd: Date) => {
            return busySlots.every(busyBox => {
                if (!busyBox.start || !busyBox.end) return true;
                const busyStart = new Date(busyBox.start);
                const busyEnd = new Date(busyBox.end);
                // IF slotEnd <= busyStart OR slotStart >= busyEnd, they don't overlap
                return (slotEnd <= busyStart || slotStart >= busyEnd);
            });
        }

        while (currentSlot < endOfDay) {
            const slotEnd = new Date(currentSlot.getTime() + 30 * 60000); // Add 30 mins

            // Only add if future time (don't offer slots in the past if checking today)
            if (currentSlot > new Date() && isSlotFree(currentSlot, slotEnd)) {
                // push formatting HH:MM
                availableSlots.push(currentSlot.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: timeZone
                }));
            }
            // Increment
            currentSlot = slotEnd;
        }

        return NextResponse.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching Calendar Availability:', error);
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
}
