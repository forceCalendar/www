declare module "@forcecalendar/interface" {
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
  export class Calendar {
    constructor(config?: Record<string, unknown>);
    addEvent(event: Record<string, unknown>): void;
    removeEvent(id: string): void;
    getEvents(): Record<string, unknown>[];
    getEvent(id: string): Record<string, unknown> | null;
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
    start: string;
    end?: string;
    duration?: number;
    recurring?: string;
  }

  export class EventStore {
    constructor();
    add(event: Record<string, unknown>): void;
    remove(id: string): void;
    getAll(): Record<string, unknown>[];
    getEventsInRange(start: Date, end: Date): Record<string, unknown>[];
    findConflicts(event: Record<string, unknown>): Record<string, unknown>[];
  }

  export class StateManager {
    constructor();
    getState(): Record<string, unknown>;
    setState(state: Record<string, unknown>): void;
    subscribe(listener: (state: Record<string, unknown>) => void): () => void;
  }

  export class TimezoneManager {
    constructor();
    convert(date: Date, from: string, to: string): Date;
    getTimezoneInfo(tz: string): { offset: number; isDST: boolean; name: string };
    getSupportedTimezones(): string[];
  }

  export class ICSParser {
    constructor();
    parse(icsString: string): Record<string, unknown>[];
    serialize(events: Record<string, unknown>[]): string;
  }

  export class SearchEngine {
    constructor();
    search(query: string, events: Record<string, unknown>[]): Record<string, unknown>[];
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    "forcecal-main": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        view?: string;
        locale?: string;
        timezone?: string;
        "week-starts-on"?: string;
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
