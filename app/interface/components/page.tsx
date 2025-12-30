"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function InterfaceComponentsPage() {
  const [activeComponent, setActiveComponent] = useState('force-calendar');

  const components = [
    {
      name: 'force-calendar',
      tag: '<force-calendar>',
      description: 'Main calendar component with full functionality',
      icon: '📅'
    },
    {
      name: 'month-view',
      tag: '<month-view>',
      description: 'Month view component',
      icon: '📆'
    },
    {
      name: 'week-view',
      tag: '<week-view>',
      description: 'Week view component',
      icon: '📊'
    },
    {
      name: 'day-view',
      tag: '<day-view>',
      description: 'Day view component',
      icon: '📋'
    },
    {
      name: 'event-form',
      tag: '<event-form>',
      description: 'Event creation and editing form',
      icon: '✏️'
    },
    {
      name: 'event-search',
      tag: '<event-search>',
      description: 'Search and filter events',
      icon: '🔍'
    }
  ];

  const getComponentDocs = (name: string) => {
    switch (name) {
      case 'force-calendar':
        return {
          description: 'The main calendar component that provides complete calendar functionality including navigation, view switching, and event management.',
          example: `<force-calendar
  view="month"
  date="2024-01-15"
  locale="en-US"
  timezone="America/New_York"
  week-starts-on="0"
  events='[{"id":"1","title":"Meeting","start":"2024-01-15T09:00:00"}]'>
</force-calendar>`,
          attributes: [
            { name: 'view', type: 'string', default: 'month', description: 'Calendar view type (month, week, day, list)' },
            { name: 'date', type: 'string', default: 'today', description: 'Current date in ISO 8601 format' },
            { name: 'locale', type: 'string', default: 'en-US', description: 'Locale for date/time formatting' },
            { name: 'timezone', type: 'string', default: 'UTC', description: 'IANA timezone identifier' },
            { name: 'week-starts-on', type: 'number', default: '0', description: 'Day week starts (0=Sunday, 1=Monday)' },
            { name: 'events', type: 'string', default: '[]', description: 'JSON string of events array' },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Disable event editing' },
            { name: 'show-navigation', type: 'boolean', default: 'true', description: 'Show navigation controls' },
            { name: 'show-view-switcher', type: 'boolean', default: 'true', description: 'Show view type switcher' }
          ],
          events: [
            { name: 'datechange', description: 'Fired when the current date changes', detail: '{ date: string }' },
            { name: 'viewchange', description: 'Fired when the view type changes', detail: '{ view: string }' },
            { name: 'eventclick', description: 'Fired when an event is clicked', detail: '{ event: Event }' },
            { name: 'eventcreate', description: 'Fired when a new event is created', detail: '{ event: Event }' },
            { name: 'eventupdate', description: 'Fired when an event is updated', detail: '{ event: Event }' },
            { name: 'eventdelete', description: 'Fired when an event is deleted', detail: '{ eventId: string }' }
          ],
          methods: [
            { name: 'addEvent(event)', description: 'Add a new event to the calendar' },
            { name: 'updateEvent(id, updates)', description: 'Update an existing event' },
            { name: 'deleteEvent(id)', description: 'Remove an event from the calendar' },
            { name: 'getEvents()', description: 'Get all events' },
            { name: 'navigateTo(date)', description: 'Navigate to a specific date' },
            { name: 'setView(view)', description: 'Change the calendar view' },
            { name: 'refresh()', description: 'Refresh the calendar display' }
          ]
        };
      case 'month-view':
        return {
          description: 'Displays a traditional month calendar grid with event indicators. Automatically handles month navigation and date selection.',
          example: `<month-view
  year="2024"
  month="0"
  locale="en-US"
  week-starts-on="0"
  events='[{"id":"1","title":"Event","start":"2024-01-15"}]'>
</month-view>`,
          attributes: [
            { name: 'year', type: 'number', default: 'current year', description: 'Year to display' },
            { name: 'month', type: 'number', default: 'current month', description: 'Month to display (0-11)' },
            { name: 'locale', type: 'string', default: 'en-US', description: 'Locale for date formatting' },
            { name: 'week-starts-on', type: 'number', default: '0', description: 'Day week starts' },
            { name: 'events', type: 'string', default: '[]', description: 'JSON string of events' },
            { name: 'selected-date', type: 'string', default: 'null', description: 'Currently selected date' },
            { name: 'show-other-months', type: 'boolean', default: 'true', description: 'Show days from adjacent months' }
          ],
          events: [
            { name: 'dateselect', description: 'Fired when a date is selected', detail: '{ date: string }' },
            { name: 'monthchange', description: 'Fired when month changes', detail: '{ year: number, month: number }' },
            { name: 'eventclick', description: 'Fired when an event is clicked', detail: '{ event: Event }' }
          ],
          methods: [
            { name: 'nextMonth()', description: 'Navigate to next month' },
            { name: 'previousMonth()', description: 'Navigate to previous month' },
            { name: 'goToMonth(year, month)', description: 'Navigate to specific month' },
            { name: 'selectDate(date)', description: 'Select a specific date' }
          ]
        };
      case 'week-view':
        return {
          description: 'Displays a week view with hourly grid and time-based event positioning. Includes all-day events section.',
          example: `<week-view
  date="2024-01-15"
  locale="en-US"
  timezone="America/New_York"
  business-hours-start="09:00"
  business-hours-end="17:00"
  events='[{"id":"1","title":"Meeting","start":"2024-01-15T09:00:00","end":"2024-01-15T10:00:00"}]'>
</week-view>`,
          attributes: [
            { name: 'date', type: 'string', default: 'today', description: 'Any date in the week to display' },
            { name: 'locale', type: 'string', default: 'en-US', description: 'Locale for date/time formatting' },
            { name: 'timezone', type: 'string', default: 'UTC', description: 'IANA timezone identifier' },
            { name: 'week-starts-on', type: 'number', default: '0', description: 'Day week starts' },
            { name: 'events', type: 'string', default: '[]', description: 'JSON string of events' },
            { name: 'business-hours-start', type: 'string', default: '09:00', description: 'Start of business hours' },
            { name: 'business-hours-end', type: 'string', default: '17:00', description: 'End of business hours' },
            { name: 'hour-height', type: 'number', default: '60', description: 'Height of each hour row in pixels' }
          ],
          events: [
            { name: 'dateselect', description: 'Fired when a time slot is clicked', detail: '{ date: string, time: string }' },
            { name: 'weekchange', description: 'Fired when week changes', detail: '{ startDate: string, endDate: string }' },
            { name: 'eventclick', description: 'Fired when an event is clicked', detail: '{ event: Event }' },
            { name: 'timeslotclick', description: 'Fired when empty time slot is clicked', detail: '{ date: string, time: string }' }
          ],
          methods: [
            { name: 'nextWeek()', description: 'Navigate to next week' },
            { name: 'previousWeek()', description: 'Navigate to previous week' },
            { name: 'goToWeek(date)', description: 'Navigate to week containing date' },
            { name: 'scrollToTime(time)', description: 'Scroll to specific time' }
          ]
        };
      case 'day-view':
        return {
          description: 'Displays a single day with detailed hourly breakdown. Shows all events for the day with precise time positioning.',
          example: `<day-view
  date="2024-01-15"
  locale="en-US"
  timezone="America/New_York"
  business-hours-start="09:00"
  business-hours-end="17:00"
  events='[{"id":"1","title":"Meeting","start":"2024-01-15T09:00:00","duration":60}]'>
</day-view>`,
          attributes: [
            { name: 'date', type: 'string', default: 'today', description: 'Date to display (ISO 8601)' },
            { name: 'locale', type: 'string', default: 'en-US', description: 'Locale for time formatting' },
            { name: 'timezone', type: 'string', default: 'UTC', description: 'IANA timezone identifier' },
            { name: 'events', type: 'string', default: '[]', description: 'JSON string of events' },
            { name: 'business-hours-start', type: 'string', default: '09:00', description: 'Start of business hours' },
            { name: 'business-hours-end', type: 'string', default: '17:00', description: 'End of business hours' },
            { name: 'hour-height', type: 'number', default: '60', description: 'Height of each hour row' },
            { name: 'show-current-time', type: 'boolean', default: 'true', description: 'Show current time indicator' }
          ],
          events: [
            { name: 'datechange', description: 'Fired when date changes', detail: '{ date: string }' },
            { name: 'eventclick', description: 'Fired when an event is clicked', detail: '{ event: Event }' },
            { name: 'timeslotclick', description: 'Fired when time slot is clicked', detail: '{ time: string }' }
          ],
          methods: [
            { name: 'nextDay()', description: 'Navigate to next day' },
            { name: 'previousDay()', description: 'Navigate to previous day' },
            { name: 'goToDate(date)', description: 'Navigate to specific date' },
            { name: 'scrollToTime(time)', description: 'Scroll to specific time' },
            { name: 'scrollToNow()', description: 'Scroll to current time' }
          ]
        };
      case 'event-form':
        return {
          description: 'A form component for creating and editing calendar events. Includes validation, recurring event configuration, and reminder settings.',
          example: `<event-form
  mode="create"
  timezone="America/New_York"
  categories='["meeting","task","reminder"]'
  show-recurring="true"
  show-reminders="true">
</event-form>`,
          attributes: [
            { name: 'mode', type: 'string', default: 'create', description: 'Form mode (create or edit)' },
            { name: 'event', type: 'string', default: 'null', description: 'JSON string of event to edit' },
            { name: 'timezone', type: 'string', default: 'UTC', description: 'Default timezone for new events' },
            { name: 'categories', type: 'string', default: '[]', description: 'JSON array of available categories' },
            { name: 'show-recurring', type: 'boolean', default: 'true', description: 'Show recurring event options' },
            { name: 'show-reminders', type: 'boolean', default: 'true', description: 'Show reminder options' },
            { name: 'show-attendees', type: 'boolean', default: 'false', description: 'Show attendees field' },
            { name: 'validation', type: 'string', default: 'default', description: 'Validation rules (default, strict, custom)' }
          ],
          events: [
            { name: 'submit', description: 'Fired when form is submitted', detail: '{ event: Event }' },
            { name: 'cancel', description: 'Fired when form is cancelled', detail: '{}' },
            { name: 'change', description: 'Fired when any field changes', detail: '{ field: string, value: any }' },
            { name: 'validate', description: 'Fired during validation', detail: '{ valid: boolean, errors: string[] }' }
          ],
          methods: [
            { name: 'submit()', description: 'Submit the form programmatically' },
            { name: 'reset()', description: 'Reset form to initial state' },
            { name: 'validate()', description: 'Validate form and return errors' },
            { name: 'setEvent(event)', description: 'Set event for editing' },
            { name: 'getFormData()', description: 'Get current form data' }
          ]
        };
      case 'event-search':
        return {
          description: 'Search and filter component for finding events. Supports text search, date range filtering, and category filtering.',
          example: `<event-search
  placeholder="Search events..."
  show-date-filter="true"
  show-category-filter="true"
  categories='["meeting","task","reminder"]'
  events='[...]'>
</event-search>`,
          attributes: [
            { name: 'placeholder', type: 'string', default: 'Search events...', description: 'Search input placeholder' },
            { name: 'events', type: 'string', default: '[]', description: 'JSON string of events to search' },
            { name: 'show-date-filter', type: 'boolean', default: 'true', description: 'Show date range filter' },
            { name: 'show-category-filter', type: 'boolean', default: 'true', description: 'Show category filter' },
            { name: 'categories', type: 'string', default: '[]', description: 'Available categories for filtering' },
            { name: 'initial-results', type: 'number', default: '10', description: 'Number of initial results to show' },
            { name: 'debounce', type: 'number', default: '300', description: 'Search debounce in milliseconds' }
          ],
          events: [
            { name: 'search', description: 'Fired when search is performed', detail: '{ query: string, results: Event[] }' },
            { name: 'resultclick', description: 'Fired when result is clicked', detail: '{ event: Event }' },
            { name: 'filterchange', description: 'Fired when filters change', detail: '{ filters: Object }' }
          ],
          methods: [
            { name: 'search(query)', description: 'Perform search programmatically' },
            { name: 'clearSearch()', description: 'Clear search and filters' },
            { name: 'setFilter(type, value)', description: 'Set a specific filter' },
            { name: 'getResults()', description: 'Get current search results' }
          ]
        };
      default:
        return null;
    }
  };

  const currentDocs = getComponentDocs(activeComponent);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Components Documentation */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/interface" className="hover:text-primary transition-colors">Interface</Link>
              <span>/</span>
              <span className="text-primary">Components</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              Component <strong className="font-bold">Reference</strong>
            </h1>

            <p className="text-xl text-primary-muted mb-12">
              Detailed documentation for each @forcecalendar/interface Web Component.
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Component List Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="card sticky top-24">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-muted mb-4">Components</h3>
                  <nav className="space-y-1">
                    {components.map((component) => (
                      <button
                        key={component.name}
                        onClick={() => setActiveComponent(component.name)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                          activeComponent === component.name
                            ? 'bg-surface-hover text-primary'
                            : 'text-primary-muted hover:bg-surface-hover hover:text-primary'
                        }`}
                      >
                        <span className="mr-2">{component.icon}</span>
                        <span className="font-mono">{component.tag}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Component Details */}
              {currentDocs && (
                <div className="flex-1 min-w-0">
                  <div className="card mb-8">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">
                        {components.find(c => c.name === activeComponent)?.icon}
                      </span>
                      <div>
                        <h2 className="text-2xl font-mono">
                          {components.find(c => c.name === activeComponent)?.tag}
                        </h2>
                      </div>
                    </div>
                    <p className="text-primary-muted">{currentDocs.description}</p>
                  </div>

                  {/* Example Usage */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Example Usage</h3>
                    <div className="code-block">
                      <div className="code-header">
                        <span className="text-xs text-primary-dim">HTML</span>
                      </div>
                      <pre className="p-4 text-sm overflow-x-auto"><code>{currentDocs.example}</code></pre>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Attributes</h3>
                    <div className="card">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-surface-border">
                              <th className="text-left py-3 pr-4">Attribute</th>
                              <th className="text-left py-3 pr-4">Type</th>
                              <th className="text-left py-3 pr-4">Default</th>
                              <th className="text-left py-3">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentDocs.attributes.map((attr, index) => (
                              <tr key={index} className="border-b border-surface-border">
                                <td className="py-3 pr-4 font-mono text-xs">{attr.name}</td>
                                <td className="py-3 pr-4 text-primary-muted">{attr.type}</td>
                                <td className="py-3 pr-4 text-primary-muted font-mono text-xs">{attr.default}</td>
                                <td className="py-3 text-primary-muted text-xs">{attr.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Events</h3>
                    <div className="card">
                      <div className="space-y-4">
                        {currentDocs.events.map((event, index) => (
                          <div key={index} className={index < currentDocs.events.length - 1 ? 'border-b border-surface-border pb-4' : ''}>
                            <h4 className="font-mono text-sm mb-2">{event.name}</h4>
                            <p className="text-sm text-primary-muted mb-2">{event.description}</p>
                            <code className="text-xs text-primary-muted">Detail: {event.detail}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Methods */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Methods</h3>
                    <div className="card">
                      <div className="space-y-3">
                        {currentDocs.methods.map((method, index) => (
                          <div key={index} className={index < currentDocs.methods.length - 1 ? 'border-b border-surface-border pb-3' : ''}>
                            <h4 className="font-mono text-sm mb-1">{method.name}</h4>
                            <p className="text-sm text-primary-muted">{method.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}