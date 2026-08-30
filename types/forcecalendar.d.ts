declare module "@forcecalendar/interface" {
  import type { Event as CoreEvent } from "@forcecalendar/core";

  export interface EventsSetOptions {
    /** Remove stored events absent from the snapshot (default true) */
    removeMissing?: boolean;
  }

  export interface EventsSetUpdate {
    event: CoreEvent;
    oldEvent: CoreEvent;
  }

  /** Change set applied by setEvents() / the `events` property; also the
   *  detail of the `calendar-events-set` DOM event */
  export interface EventsSetResult {
    events: CoreEvent[];
    added: CoreEvent[];
    updated: EventsSetUpdate[];
    removed: CoreEvent[];
    unchanged: CoreEvent[];
  }

  /** Window of dates the current view covers; `end` is inclusive */
  export interface VisibleRange {
    start: Date;
    end: Date;
  }

  /** Detail of the `calendar-range-change` DOM event */
  export interface VisibleRangeChange extends VisibleRange {
    view: string;
    date: Date;
  }

  /** The `<forcecal-main>` element's public API */
  export interface ForceCalendarElement extends HTMLElement {
    addEvent(event: Record<string, unknown>): unknown;
    updateEvent(eventId: string, updates: Record<string, unknown>): unknown;
    deleteEvent(eventId: string): unknown;
    getEvents(): CoreEvent[];
    /** Replace the calendar's events with a snapshot, applying only the
     *  differences. Returns null when called before the element is connected. */
    setEvents(
      events: Iterable<Record<string, unknown> | CoreEvent>,
      options?: EventsSetOptions
    ): EventsSetResult | null;
    /** Declarative form of setEvents() with removeMissing: true; reading it
     *  returns the events the calendar currently holds */
    get events(): CoreEvent[];
    set events(events: Iterable<Record<string, unknown> | CoreEvent> | null);
    /** Null before the element is initialised */
    getVisibleRange(): VisibleRange | null;
    setView(view: string): void;
    setDate(date: Date | string): void;
    next(): void;
    previous(): void;
    today(): void;
  }

  export const ForceCalendar: CustomElementConstructor;
  export const MonthView: CustomElementConstructor;
  export const WeekView: CustomElementConstructor;
  export const DayView: CustomElementConstructor;
  export const BaseComponent: CustomElementConstructor;
  export const StateManager: unknown;
  export const eventBus: unknown;
  export const EventBus: unknown;
  export const DateUtils: unknown;
  export const DOMUtils: unknown;
  export const StyleUtils: {
    getCustomProperties(): Record<string, string>;
    defaultTokens: Record<string, string>;
  };
}

declare module "@forcecalendar/core" {
  export interface ReconcileOptions {
    /** Remove stored events absent from the snapshot (default true) */
    removeMissing?: boolean;
    isEquivalent?: (a: Event, b: Event) => boolean;
  }

  export interface SetEventsOptions extends ReconcileOptions {
    /** Apply only the differences instead of clearing and re-adding */
    reconcile?: boolean;
  }

  export interface ReconciledUpdate {
    event: Event;
    oldEvent: Event;
  }

  /** Payload of the `eventsSet` calendar event and return value of setEvents() */
  export interface EventsSetPayload {
    events: Event[];
    added: Event[];
    updated: ReconciledUpdate[];
    removed: Event[];
    unchanged: Event[];
  }

  export interface OccurrenceIteratorOptions {
    after?: Date | number;
    before?: Date | number;
    inclusive?: boolean;
    timezone?: string;
    includeModified?: boolean;
    includeCancelled?: boolean;
    handleDST?: boolean;
  }

  /** Occurrence produced by the recurrence engine; id is `<eventId>_<startMs>` */
  export interface ExpandedOccurrence {
    id: string;
    recurringEventId?: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    isRecurring: boolean;
    [key: string]: unknown;
  }

  export class Calendar {
    constructor(config?: Record<string, unknown>);
    addEvent(event: Record<string, unknown>): void;
    updateEvent(id: string, updates: Record<string, unknown>): void;
    removeEvent(id: string): void;
    getEvents(): Event[];
    /** Occurrence ids (`<masterId>_<startMs>`) resolve to the recurring master */
    getEvent(id: string): Event | null;
    setEvents(events: Array<Record<string, unknown> | Event>, options?: SetEventsOptions): EventsSetPayload;
    reconcileEvents(events: Array<Record<string, unknown> | Event>, options?: ReconcileOptions): EventsSetPayload;
    /** Store change counter; increases with every mutation or committed batch */
    getEventsVersion(): number;
    iterateOccurrences(eventId: string, options?: OccurrenceIteratorOptions): Generator<ExpandedOccurrence, void, undefined>;
    getNextOccurrence(eventId: string, after?: Date | number | null, options?: OccurrenceIteratorOptions): ExpandedOccurrence | null;
    takeOccurrences(eventId: string, count: number, options?: OccurrenceIteratorOptions): ExpandedOccurrence[];
    setView(view: string): void;
    getView(): string;
    navigate(direction: number): void;
    goToDate(date: Date): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    off(event: string, handler: (...args: unknown[]) => void): void;
    destroy(): void;
  }

  export class Event {
    constructor(data: Record<string, unknown>);
    id: string;
    title: string;
    start: Date;
    end?: Date;
    recurring?: boolean;
    recurrenceRule?: string;
    /** True for an expanded occurrence handed out by view data */
    isOccurrence: boolean;
    /** Id of the recurring master when this is an occurrence */
    recurringEventId: string | null;
    occurrenceStart: Date | null;
    readonly duration: number;
    readonly durationMinutes: number;
    readonly durationHours: number;
    /** Field-by-field comparison used by reconcileEvents() */
    static isEquivalent(a: Event | Record<string, unknown>, b: Event | Record<string, unknown>): boolean;
    /** Builds `<recurringEventId>_<startMs>` */
    static occurrenceId(recurringEventId: string, occurrenceStart: Date | number | string): string;
  }

  export class EventStore {
    constructor();
    add(event: Record<string, unknown>): void;
    remove(id: string): void;
    getAll(): Record<string, unknown>[];
    getEventsInRange(start: Date, end: Date): Record<string, unknown>[];
    findConflicts(event: Record<string, unknown>): Record<string, unknown>[];
    iterateOccurrences(eventId: string, options?: OccurrenceIteratorOptions): Generator<ExpandedOccurrence, void, undefined>;
    getNextOccurrence(eventId: string, after?: Date | number | null, options?: OccurrenceIteratorOptions): ExpandedOccurrence | null;
    takeOccurrences(eventId: string, count: number, options?: OccurrenceIteratorOptions): ExpandedOccurrence[];
  }

  export class StateManager {
    constructor();
    getState(): Record<string, unknown>;
    setState(state: Record<string, unknown>): void;
    subscribe(listener: (state: Record<string, unknown>) => void): () => void;
  }

  export class TimezoneManager {
    static getInstance(): TimezoneManager;
    convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date;
    getTimezoneOffset(date: Date, timezone: string): number;
    isDST(date: Date, timezone: string): boolean;
    getCommonTimezones(): { value: string; label: string; offset: number }[];
    getSystemTimezone(): string;
  }

  export class ICSParser {
    constructor();
    parse(icsString: string): Record<string, unknown>[];
    serialize(events: Record<string, unknown>[]): string;
  }

  export class EventSearch {
    constructor();
    search(query: string, events: Record<string, unknown>[]): Record<string, unknown>[];
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    "forcecal-main": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        view?: string;
        date?: string;
        locale?: string;
        timezone?: string;
        "week-starts-on"?: string;
        height?: string;
        theme?: string;
      },
      HTMLElement
    >;
    "forcecal-event-form": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "event-id"?: string;
        mode?: string;
      },
      HTMLElement
    >;
  }
}
