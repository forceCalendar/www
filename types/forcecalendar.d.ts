declare module '@forcecalendar/interface' {
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
  export const StyleUtils: unknown;
}

declare module '@forcecalendar/core' {
  export class Calendar {
    constructor(config?: Record<string, unknown>);
    addEvent(event: Record<string, unknown>): void;
    getEvents(): unknown[];
    setView(view: string): void;
    navigate(direction: number): void;
  }
  export class Event {
    constructor(data: Record<string, unknown>);
  }
  export class EventStore {
    constructor();
  }
  export class StateManager {
    constructor();
  }
}
