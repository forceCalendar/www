import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CoreExamplesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Examples Content */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/core" className="hover:text-primary transition-colors">Core</Link>
              <span>/</span>
              <span className="text-primary">Examples</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              Code <strong className="font-bold">Examples</strong>
            </h1>

            <p className="text-xl text-slate-400 mb-12">
              Real-world examples showing how to integrate @forcecalendar/core into your applications.
            </p>

            {/* Salesforce Lightning Web Component */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Salesforce Lightning Web Component</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">calendarComponent.js</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { LightningElement, track } from 'lwc';
import { Calendar } from '@forcecalendar/core';
import { loadScript } from 'lightning/platformResourceLoader';
import CALENDAR_RESOURCE from '@salesforce/resourceUrl/forcecalendar';

export default class CalendarComponent extends LightningElement {
    @track events = [];
    @track currentView = 'month';
    calendar;

    async connectedCallback() {
        try {
            // Load the forceCalendar library
            await loadScript(this, CALENDAR_RESOURCE + '/core.min.js');

            // Initialize calendar
            this.calendar = new Calendar({
                locale: 'en-US',
                timezone: 'America/Los_Angeles',
                weekStartsOn: 0
            });

            // Load events from Salesforce
            await this.loadSalesforceEvents();
        } catch (error) {
            console.error('Error initializing calendar:', error);
        }
    }

    async loadSalesforceEvents() {
        // Query Salesforce Events
        const sfEvents = await getEvents();

        // Add events to calendar
        sfEvents.forEach(event => {
            this.calendar.addEvent({
                id: event.Id,
                title: event.Subject,
                start: event.StartDateTime,
                end: event.EndDateTime,
                location: event.Location,
                description: event.Description
            });
        });

        // Get current month view
        this.updateView();
    }

    updateView() {
        const today = new Date();
        const monthData = this.calendar.getMonthView(
            today.getFullYear(),
            today.getMonth()
        );

        this.events = monthData.weeks.flatMap(week =>
            week.days.flatMap(day => day.events)
        );
    }

    handleEventClick(event) {
        // Navigate to Salesforce record
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.eventId,
                objectApiName: 'Event',
                actionName: 'view'
            }
        });
    }
}`}</code></pre>
                </div>
              </div>
            </div>

            {/* React Integration */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">React Integration</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">useCalendar Hook</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { useState, useEffect, useMemo } from 'react';
import { Calendar } from '@forcecalendar/core';

export function useCalendar(options = {}) {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    // Create calendar instance
    const calendar = useMemo(() => {
        return new Calendar({
            locale: options.locale || 'en-US',
            timezone: options.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            weekStartsOn: options.weekStartsOn || 0,
            ...options
        });
    }, [options]);

    // Add event handler
    const addEvent = (event) => {
        const eventId = calendar.addEvent(event);
        setEvents([...calendar.getAllEvents()]);
        return eventId;
    };

    // Update event handler
    const updateEvent = (id, updates) => {
        calendar.updateEvent(id, updates);
        setEvents([...calendar.getAllEvents()]);
    };

    // Delete event handler
    const deleteEvent = (id) => {
        calendar.deleteEvent(id);
        setEvents([...calendar.getAllEvents()]);
    };

    // Get view data
    const getViewData = () => {
        switch (view) {
            case 'month':
                return calendar.getMonthView(
                    currentDate.getFullYear(),
                    currentDate.getMonth()
                );
            case 'week':
                return calendar.getWeekView(currentDate);
            case 'day':
                return calendar.getDayView(currentDate);
            default:
                return null;
        }
    };

    // Navigation
    const navigateTo = (date) => {
        setCurrentDate(date);
    };

    const navigateNext = () => {
        const next = new Date(currentDate);
        if (view === 'month') {
            next.setMonth(next.getMonth() + 1);
        } else if (view === 'week') {
            next.setDate(next.getDate() + 7);
        } else {
            next.setDate(next.getDate() + 1);
        }
        setCurrentDate(next);
    };

    const navigatePrev = () => {
        const prev = new Date(currentDate);
        if (view === 'month') {
            prev.setMonth(prev.getMonth() - 1);
        } else if (view === 'week') {
            prev.setDate(prev.getDate() - 7);
        } else {
            prev.setDate(prev.getDate() - 1);
        }
        setCurrentDate(prev);
    };

    return {
        calendar,
        events,
        view,
        setView,
        currentDate,
        viewData: getViewData(),
        addEvent,
        updateEvent,
        deleteEvent,
        navigateTo,
        navigateNext,
        navigatePrev
    };
}`}</code></pre>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">React Component Usage</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import React from 'react';
import { useCalendar } from './useCalendar';

function CalendarApp() {
    const {
        events,
        view,
        setView,
        currentDate,
        viewData,
        addEvent,
        navigateNext,
        navigatePrev
    } = useCalendar({
        locale: 'en-US',
        timezone: 'America/New_York'
    });

    const handleAddEvent = () => {
        addEvent({
            title: 'New Meeting',
            start: new Date().toISOString(),
            duration: 60, // minutes
            category: 'meeting'
        });
    };

    return (
        <div className="calendar-app">
            <header>
                <button onClick={navigatePrev}>Previous</button>
                <h2>{currentDate.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                })}</h2>
                <button onClick={navigateNext}>Next</button>
            </header>

            <div className="view-switcher">
                <button onClick={() => setView('month')}>Month</button>
                <button onClick={() => setView('week')}>Week</button>
                <button onClick={() => setView('day')}>Day</button>
            </div>

            <button onClick={handleAddEvent}>Add Event</button>

            {view === 'month' && <MonthView data={viewData} />}
            {view === 'week' && <WeekView data={viewData} />}
            {view === 'day' && <DayView data={viewData} />}
        </div>
    );
}`}</code></pre>
                </div>
              </div>
            </div>

            {/* Node.js Backend */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Node.js Backend Integration</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Express API with Database</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`const express = require('express');
const { Calendar } = require('@forcecalendar/core');
const { TimezoneManager } = require('@forcecalendar/core/timezone');

const app = express();
app.use(express.json());

// Create a calendar instance for each user session
const userCalendars = new Map();

// Middleware to get or create user calendar
function getUserCalendar(req, res, next) {
    const userId = req.user.id;
    const userTimezone = req.user.timezone || 'UTC';

    if (!userCalendars.has(userId)) {
        const calendar = new Calendar({
            timezone: userTimezone,
            locale: req.user.locale || 'en-US'
        });

        // Load user's events from database
        const dbEvents = await db.events.findAll({ where: { userId } });
        dbEvents.forEach(event => calendar.addEvent(event));

        userCalendars.set(userId, calendar);
    }

    req.calendar = userCalendars.get(userId);
    next();
}

// Get events for a date range
app.get('/api/events', getUserCalendar, (req, res) => {
    const { start, end, timezone } = req.query;
    const calendar = req.calendar;

    // Convert dates to user's timezone
    const startDate = TimezoneManager.convertTimezone(
        new Date(start),
        'UTC',
        timezone || calendar.options.timezone
    );

    const endDate = TimezoneManager.convertTimezone(
        new Date(end),
        'UTC',
        timezone || calendar.options.timezone
    );

    const events = calendar.getEventsForRange(startDate, endDate);

    res.json({
        events,
        timezone: calendar.options.timezone
    });
});

// Create new event
app.post('/api/events', getUserCalendar, async (req, res) => {
    const calendar = req.calendar;
    const eventData = req.body;

    try {
        // Validate recurring rule if present
        if (eventData.recurring) {
            const isValid = calendar.recurrenceEngine.validateRRule(eventData.recurring);
            if (!isValid) {
                return res.status(400).json({ error: 'Invalid recurrence rule' });
            }
        }

        // Add event to calendar
        const eventId = calendar.addEvent(eventData);

        // Save to database
        await db.events.create({
            ...eventData,
            id: eventId,
            userId: req.user.id
        });

        res.json({ id: eventId, message: 'Event created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Export calendar as ICS
app.get('/api/export/ics', getUserCalendar, (req, res) => {
    const calendar = req.calendar;
    const icsData = calendar.exportToICS();

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
    res.send(icsData);
});

// Import ICS file
app.post('/api/import/ics', getUserCalendar, async (req, res) => {
    const calendar = req.calendar;
    const { icsData } = req.body;

    try {
        const events = calendar.importFromICS(icsData);

        // Save all imported events to database
        for (const event of events) {
            await db.events.create({
                ...event,
                userId: req.user.id
            });
        }

        res.json({
            message: 'Import successful',
            eventsImported: events.length
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to import ICS file' });
    }
});

app.listen(3000, () => {
    console.log('Calendar API running on port 3000');
});`}</code></pre>
                </div>
              </div>
            </div>

            {/* Recurring Events */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Working with Recurring Events</h2>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Common Recurrence Patterns</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { Calendar } from '@forcecalendar/core';
import { RecurrenceEngine } from '@forcecalendar/core/events';

const calendar = new Calendar();

// Daily standup for 30 days
calendar.addEvent({
    title: 'Daily Standup',
    start: '2024-01-01T09:00:00',
    duration: 15,
    recurring: 'FREQ=DAILY;COUNT=30'
});

// Weekly team meeting every Monday and Wednesday
calendar.addEvent({
    title: 'Team Meeting',
    start: '2024-01-01T14:00:00',
    duration: 60,
    recurring: 'FREQ=WEEKLY;BYDAY=MO,WE;UNTIL=20240630'
});

// Monthly report on the last Friday
calendar.addEvent({
    title: 'Monthly Report',
    start: '2024-01-26T16:00:00',
    duration: 30,
    recurring: 'FREQ=MONTHLY;BYDAY=-1FR'
});

// Quarterly review (every 3 months on the 15th)
calendar.addEvent({
    title: 'Quarterly Review',
    start: '2024-01-15T10:00:00',
    duration: 120,
    recurring: 'FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15'
});

// Annual company meeting
calendar.addEvent({
    title: 'Annual All-Hands',
    start: '2024-06-01T09:00:00',
    duration: 240,
    recurring: 'FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=1'
});

// Complex pattern: Every other Tuesday and Thursday at 3 PM
calendar.addEvent({
    title: 'Bi-weekly Sync',
    start: '2024-01-02T15:00:00',
    duration: 45,
    recurring: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH'
});

// Get occurrences for a specific month
const january2024 = calendar.getEventsForRange(
    new Date('2024-01-01'),
    new Date('2024-01-31')
);

// Modify a single occurrence
calendar.updateRecurringEventInstance('event-id', '2024-01-15', {
    title: 'Special Team Meeting',
    duration: 90
});

// Add exception date (skip an occurrence)
calendar.addExceptionDate('event-id', '2024-01-08');`}</code></pre>
                </div>
              </div>
            </div>

            {/* Timezone Handling */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Timezone Handling</h2>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Multi-timezone Support</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { Calendar } from '@forcecalendar/core';
import { TimezoneManager } from '@forcecalendar/core/timezone';

// Create calendar in user's local timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const calendar = new Calendar({
    timezone: userTimezone
});

// Add event in a different timezone
const eventInNY = {
    title: 'NYC Meeting',
    start: '2024-01-15T09:00:00',
    timezone: 'America/New_York'
};

// Convert to user's timezone before adding
const localStart = TimezoneManager.convertTimezone(
    new Date(eventInNY.start),
    eventInNY.timezone,
    userTimezone
);

calendar.addEvent({
    ...eventInNY,
    start: localStart
});

// Display events in different timezones
function displayEventInTimezone(event, targetTimezone) {
    const convertedStart = TimezoneManager.convertTimezone(
        event.start,
        calendar.options.timezone,
        targetTimezone
    );

    return {
        ...event,
        start: convertedStart,
        displayTimezone: targetTimezone,
        offset: TimezoneManager.getTimezoneOffset(targetTimezone, convertedStart)
    };
}

// Handle DST transitions
const dstEvent = {
    title: 'DST Test Event',
    start: '2024-03-10T01:30:00', // During DST transition
    timezone: 'America/New_York'
};

// The TimezoneManager automatically handles DST
const isDST = TimezoneManager.isDST('America/New_York', new Date(dstEvent.start));
console.log('Is DST active?', isDST);

// Get all supported timezones
const timezones = TimezoneManager.getSupportedTimezones();

// Group by region
const timezonesByRegion = timezones.reduce((acc, tz) => {
    const [region] = tz.split('/');
    if (!acc[region]) acc[region] = [];
    acc[region].push(tz);
    return acc;
}, {});`}</code></pre>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Performance Optimization</h2>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Handling Large Datasets</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { Calendar } from '@forcecalendar/core';

// Configure for performance
const calendar = new Calendar({
    maxEventsPerDay: 50,        // Limit events per day
    enableSpatialIndex: true,    // Enable R-tree indexing
    cacheSize: 1000,            // LRU cache size
    lazyLoadRecurring: true     // Lazy load recurring events
});

// Batch operations for better performance
const events = generateLargeDataset(); // 10,000+ events

// Add events in batches
calendar.beginBatch();
events.forEach(event => {
    calendar.addEvent(event, { silent: true });
});
calendar.endBatch(); // Triggers single re-index

// Use pagination for large queries
function getEventsPaginated(page = 1, pageSize = 100) {
    const allEvents = calendar.getAllEvents();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        events: allEvents.slice(start, end),
        totalEvents: allEvents.length,
        totalPages: Math.ceil(allEvents.length / pageSize),
        currentPage: page
    };
}

// Virtual scrolling support
function getVirtualizedMonthView(year, month, viewportStart, viewportEnd) {
    const monthView = calendar.getMonthView(year, month);

    // Only return events visible in viewport
    const visibleWeeks = monthView.weeks.slice(viewportStart, viewportEnd);

    return {
        ...monthView,
        weeks: visibleWeeks,
        totalWeeks: monthView.weeks.length
    };
}

// Memory management
calendar.on('memoryWarning', () => {
    // Clear old cached data
    calendar.clearCache();

    // Remove events older than 1 year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    calendar.removeEventsBeforeDate(oneYearAgo);
});

// Cleanup
calendar.destroy(); // Release all resources`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}