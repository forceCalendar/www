"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { CalendarEvent, CalendarView, ForceCalendarElement } from "@forcecalendar/interface";
import CalendarLoader from "../components/CalendarLoader";
import { localDateInput, localDateTimeInput, makeScenarioEvents, scenarioIds, scenarios, type ScenarioId } from "./scenarios";
import s from "./playground.module.css";

const views: CalendarView[] = ["month", "week", "day"];
const locales = [["en-US", "English (US)"], ["en-GB", "English (UK)"], ["fr-FR", "French"], ["de-DE", "German"], ["es-ES", "Spanish"], ["ja-JP", "Japanese"], ["ar-SA", "Arabic"]];
const timezones = [["", "Browser timezone"], ["UTC", "UTC"], ["America/New_York", "New York"], ["America/Los_Angeles", "Los Angeles"], ["Europe/London", "London"], ["Europe/Paris", "Paris"], ["Asia/Kolkata", "Kolkata"], ["Asia/Tokyo", "Tokyo"], ["Australia/Sydney", "Sydney"]];
const eventNames = ["calendar-view-change", "calendar-navigate", "calendar-range-change", "calendar-date-select", "calendar-range-select", "calendar-event-added", "calendar-event-updated", "calendar-event-deleted", "calendar-events-set"] as const;
const inspectorPanels = ["records", "code", "activity"] as const;
type InspectorPanel = (typeof inspectorPanels)[number];
type LogEntry = { id: number; name: string; time: string; detail: string };

function summarize(name: string, detail: Record<string, unknown>) {
  if (name === "calendar-events-set") {
    return Object.fromEntries(["added", "updated", "removed", "unchanged"].map(key => [key, Array.isArray(detail[key]) ? detail[key].length : 0]));
  }
  if (detail.event) {
    const event = detail.event as CalendarEvent;
    return { id: event.id, title: event.title, start: event.startUTC, end: event.endUTC };
  }
  return detail;
}

function snapshot(events: CalendarEvent[]) {
  return events.map(event => event.toObject());
}

function formatRange(start: Date, end: Date) {
  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

function Symbol({ type }: { type: "plus" | "reset" | "arrow" | "code" }) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={type === "plus" ? "M10 4v12M4 10h12" : type === "reset" ? "M4 7a6 6 0 1 1 0 6M4 3v4h4" : type === "code" ? "m6 6-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" : "M4 10h12m-5-5 5 5-5 5"} /></svg>;
}

export default function PlaygroundClient() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("crm");
  const [view, setView] = useState<CalendarView>("week");
  const [locale, setLocale] = useState("en-US");
  const [timezone, setTimezone] = useState("");
  const [browserTimezone, setBrowserTimezone] = useState("");
  const [weekStartsOn, setWeekStartsOn] = useState("1");
  const [readOnly, setReadOnly] = useState(false);
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [rangeLabel, setRangeLabel] = useState("Loading the current week…");
  const [panel, setPanel] = useState<InspectorPanel>("records");
  const [codeFormat, setCodeFormat] = useState<"javascript" | "json">("javascript");
  const [query, setQuery] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [notice, setNotice] = useState("Choose a workspace, then make it yours.");
  const [copyState, setCopyState] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [duration, setDuration] = useState("45");
  const [category, setCategory] = useState("0");
  const calRef = useRef<ForceCalendarElement | null>(null);
  const initializedRef = useRef<ForceCalendarElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const logIdRef = useRef(0);
  const addedIdRef = useRef(0);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formTitleRef = useRef<HTMLInputElement>(null);
  const scenario = scenarios[scenarioId];
  const selected = events.find(event => event.id === selectedId);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredEvents = events.filter(event => `${event.title} ${event.location} ${event.id} ${event.categories.join(" ")}`.toLocaleLowerCase().includes(normalizedQuery));

  const syncEvents = useCallback(() => {
    const current = calRef.current?.getEvents() ?? [];
    setEvents([...current].sort((a, b) => a.startUTC.getTime() - b.startUTC.getTime()));
    setSelectedId(id => current.some(event => event.id === id) ? id : current[0]?.id ?? "");
  }, []);

  const syncRange = useCallback((cal: ForceCalendarElement) => {
    const range = cal.getVisibleRange();
    if (range) setRangeLabel(formatRange(range.start, range.end));
  }, []);

  const pushLog = useCallback((name: string, detail: Record<string, unknown>) => {
    const entry = { id: ++logIdRef.current, name, time: new Date().toLocaleTimeString("en-GB"), detail: JSON.stringify(summarize(name, detail), null, 2) };
    setLog(previous => [entry, ...previous].slice(0, 40));
  }, []);

  const loadScenario = useCallback((cal: ForceCalendarElement, id: ScenarioId) => {
    const now = new Date();
    const samples = makeScenarioEvents(id, now);
    cal.setDate(now);
    cal.setEvents(samples);
    setSelectedId(samples.find(event => localDateInput(new Date(event.start)) === localDateInput(now))?.id ?? samples[0].id);
    setActiveDate(localDateInput(now));
    setScenarioId(id);
    setQuery("");
    setShowForm(false);
    setNotice(`${scenarios[id].workspace} loaded with ${samples.length} synthetic records for this week.`);
    syncEvents();
    syncRange(cal);
  }, [syncEvents, syncRange]);

  const handleReady = useCallback((element: HTMLElement) => {
    const cal = element as ForceCalendarElement;
    calRef.current = cal;
    setBrowserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    cleanupRef.current?.();
    const handlers = eventNames.map(name => {
      const handler = (event: Event) => {
        const detail = (event as CustomEvent).detail as Record<string, unknown>;
        pushLog(name, detail ?? {});
        if (name.startsWith("calendar-event")) syncEvents();
        if (name === "calendar-view-change" && views.includes(detail.view as CalendarView)) setView(detail.view as CalendarView);
        if (name === "calendar-range-change") {
          const start = new Date(detail.start as string | Date);
          const end = new Date(detail.end as string | Date);
          setRangeLabel(formatRange(start, end));
        }
        if ((name === "calendar-navigate" || name === "calendar-date-select") && detail.date) {
          setActiveDate(localDateInput(new Date(detail.date as string | Date)));
        }
      };
      cal.addEventListener(name, handler);
      return { name, handler };
    });
    cleanupRef.current = () => handlers.forEach(({ name, handler }) => cal.removeEventListener(name, handler));
    if (initializedRef.current !== cal) {
      initializedRef.current = cal;
      loadScenario(cal, "crm");
    }
    syncRange(cal);
    setReady(true);
  }, [loadScenario, pushLog, syncEvents, syncRange]);

  useEffect(() => () => {
    cleanupRef.current?.();
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
  }, []);

  useEffect(() => {
    if (showForm) formTitleRef.current?.focus();
  }, [showForm]);

  function perform(action: () => void) {
    try { action(); } catch (error) { setNotice(error instanceof Error ? error.message : "The calendar could not apply that change."); }
  }

  function chooseScenario(id: ScenarioId) {
    if (calRef.current) perform(() => loadScenario(calRef.current!, id));
  }

  function changeView(next: CalendarView) {
    setView(next);
    calRef.current?.setView(next);
  }

  function openCreateForm() {
    const date = activeDate ? new Date(`${activeDate}T11:00:00`) : new Date();
    date.setHours(11, 0, 0, 0);
    setTitle(scenario.sampleTitle);
    setStartsAt(localDateTimeInput(date));
    setDuration("45");
    setCategory("0");
    setShowForm(true);
  }

  function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cal = calRef.current;
    if (!cal) return;
    const start = new Date(startsAt);
    if (!title.trim() || !Number.isFinite(start.getTime())) { setNotice("Add a title and a valid start time."); return; }
    perform(() => {
      const group = Number(category);
      const result = cal.addEvent({
        id: `playground-${Date.now()}-${++addedIdRef.current}`, title: title.trim(),
        start: start.toISOString(), end: new Date(start.getTime() + Number(duration) * 60000).toISOString(),
        color: scenario.colors[group], location: scenario.locations[group], categories: [scenario.groups[group]],
        description: "Created locally in the forceCalendar playground.", metadata: { scenario: scenarioId, source: "playground" },
      });
      if (!result) throw new Error("The calendar is still loading. Try again in a moment.");
      setSelectedId(result.id);
      cal.setDate(start);
      setShowForm(false);
      setNotice(`Created “${result.title}”. Select it on the calendar to try the built-in editor.`);
      syncEvents();
    });
  }

  function moveSelected() {
    if (!selected || !calRef.current) return;
    perform(() => {
      const start = new Date(selected.startUTC.getTime() + 30 * 60000);
      const end = new Date(selected.endUTC.getTime() + 30 * 60000);
      const result = calRef.current!.updateEvent(selected.id, { start: start.toISOString(), end: end.toISOString() });
      if (!result) throw new Error("This record is no longer available. Choose another record.");
      calRef.current!.setDate(start);
      setNotice(`Moved “${selected.title}” 30 minutes later${selected.recurrenceRule ? " for the whole series" : ""}.`);
      syncEvents();
    });
  }

  function deleteSelected() {
    if (!selected || !calRef.current) return;
    perform(() => {
      const title = selected.title;
      if (!calRef.current!.deleteEvent(selected.id)) throw new Error("This record is no longer available.");
      setNotice(`Deleted “${title}”${selected.recurrenceRule ? " and its recurring series" : ""}. Reset the workspace to restore the samples.`);
      syncEvents();
    });
  }

  function inspectEvent(event: CalendarEvent) {
    setSelectedId(event.id);
    calRef.current?.setDate(new Date(event.startUTC));
    setNotice(`Selected “${event.title}”. Try moving or deleting it with the API controls.`);
  }

  const records = snapshot(events);
  const configCode = `import '@forcecalendar/interface';\n\nconst calendar = document.createElement('forcecal-main');\ncalendar.setAttribute('view', '${view}');\ncalendar.setAttribute('locale', '${locale}');\ncalendar.setAttribute('week-starts-on', '${weekStartsOn}');${timezone ? `\ncalendar.setAttribute('timezone', '${timezone}');` : ""}\ncalendar.readOnly = ${readOnly};\ndocument.body.append(calendar);${activeDate ? `\ncalendar.setDate(new Date('${activeDate}T12:00:00'));` : ""}\n\n// Local snapshot from this playground. Your app owns persistence.\ncalendar.setEvents(${JSON.stringify(records, null, 2)});\n\n// Use this window when loading data through your own adapter.\n// Range boundaries follow the browser timezone; end is inclusive.\ncalendar.addEventListener('calendar-range-change', ({ detail }) => {\n  console.log(detail.start, detail.end, detail.view);\n});\n\n// Host operations remain available when the built-in UI is read-only.\n// calendar.addEvent({ id, title, start, end });\n// calendar.updateEvent(id, { start, end });\n// calendar.deleteEvent(id);`;
  const code = codeFormat === "javascript" ? configCode : JSON.stringify(records, null, 2);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("Copied to clipboard");
    } catch {
      setCopyState("Copy unavailable. Select and copy the code below.");
    }
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopyState(""), 4000);
  }

  const formatStart = (event: CalendarEvent) => event.startUTC.toLocaleString(locale, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", ...(timezone ? { timeZone: timezone } : {}) });

  return (
    <>
      <div className={s.stepHeading}><span className={s.eyebrow}>01 / Choose your context</span><span>Switching workspaces replaces local edits.</span></div>
      <div className={s.scenarios} role="group" aria-label="Sample workspace">
        {scenarioIds.map(id => {
          const item = scenarios[id];
          return <button type="button" key={id} disabled={!ready} aria-pressed={scenarioId === id} onClick={() => chooseScenario(id)} className={`${s.scenario} ${scenarioId === id ? s.scenarioActive : ""}`}><span className={s.scenarioTop}><span>{item.number} / {id === "crm" ? "CRM" : id === "campus" ? "EDUCATION" : "WORKPLACE"}</span><span className={s.scenarioRadio} aria-hidden="true" /></span><strong>{item.name}</strong><span className={s.scenarioDescription}>{item.description}</span><span className={s.scenarioBottom}>{scenarioId === id ? "Workspace selected" : "Explore workspace"}<Symbol type="arrow" /></span></button>;
        })}
      </div>

      <div className={s.workspace}>
        <div className={s.workspaceBar}><div className={s.workspaceIdentity}><span className={s.appMark}>{scenario.mark}</span><strong>{scenario.workspace}</strong><span className={s.slash}>/</span><span>{scenario.shortName}</span></div><span className={s.liveBadge}><i />Local demo workspace</span></div>
        <div className={s.workspaceIntro}><div><p className={s.eyebrow}>02 / Work with the real component</p><h2>{scenario.shortName}</h2><p>{scenario.context}</p></div><button type="button" className={s.resetButton} disabled={!ready} onClick={() => chooseScenario(scenarioId)}><Symbol type="reset" />Reset workspace</button></div>

        <div className={s.workbench}>
          <div className={s.calendarColumn}>
            <div className={s.calendarTopline}><span><i />{events.length} records loaded</span><span>{rangeLabel}</span></div>
            <div className={s.calendarScroller} role="region" aria-label="Interactive calendar. Scroll horizontally on small screens." tabIndex={0}>
              <div className={s.calendarInner}><CalendarLoader view={view} locale={locale} timezone={timezone || browserTimezone || undefined} weekStartsOn={weekStartsOn} height={600} onReady={handleReady} /></div>
            </div>
            <div className={s.legend}>{scenario.groups.map((group, index) => <span key={group}><i style={{ background: scenario.colors[index] }} />{group}</span>)}<span>Click a record to edit it</span></div>
            <div className={s.hint}><span aria-hidden="true">↳</span><p>Navigate with the calendar toolbar. Select a time to create an event, or use the API controls. Changes stay here until you reset or leave.</p></div>
          </div>

          <aside className={s.controls} aria-label="Calendar controls">
            <div className={s.controlSection}>
              <div className={s.controlHeading}><h3>Shape the view</h3><span>UI</span></div>
              <div className={s.viewButtons} role="group" aria-label="Calendar view">{views.map(item => <button type="button" key={item} disabled={!ready} aria-pressed={view === item} className={view === item ? s.viewActive : ""} onClick={() => changeView(item)}>{item}</button>)}</div>
              <label className={s.field}>Jump to date<input type="date" value={activeDate} disabled={!ready} onChange={event => { setActiveDate(event.target.value); if (event.target.value) calRef.current?.setDate(new Date(`${event.target.value}T12:00:00`)); }} /></label>
              <details className={s.config}><summary>Locale & display settings<span aria-hidden="true">+</span></summary><div className={s.configFields}>
                <label className={s.field}>Language<select value={locale} onChange={event => setLocale(event.target.value)}>{locales.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className={s.field}>Timezone<select value={timezone} onChange={event => setTimezone(event.target.value)}>{timezones.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className={s.field}>Week starts on<select value={weekStartsOn} onChange={event => setWeekStartsOn(event.target.value)}><option value="1">Monday</option><option value="0">Sunday</option><option value="6">Saturday</option></select></label>
                <label className={s.checkField}><input type="checkbox" checked={readOnly} disabled={!ready} onChange={event => { setReadOnly(event.target.checked); if (calRef.current) calRef.current.readOnly = event.target.checked; }} /><span>Read-only calendar UI</span></label>
                <p className={s.tiny}>Read-only disables built-in editing. Host API actions below remain available. This is a UI setting, not an access-control policy.</p>
              </div></details>
            </div>
            <div className={s.controlSection}>
              <div className={s.controlHeading}><h3>Try an operation</h3><span>API</span></div>
              <button type="button" className={s.primaryButton} disabled={!ready} onClick={openCreateForm} aria-expanded={showForm} aria-controls="create-event-form"><Symbol type="plus" />Create {scenario.noun}</button>
              {showForm ? <form className={s.createForm} id="create-event-form" onSubmit={createEvent}>
                <label className={s.field}>Title<input ref={formTitleRef} value={title} onChange={event => setTitle(event.target.value)} required maxLength={120} /></label>
                <label className={s.field}>Starts at<input type="datetime-local" value={startsAt} onChange={event => setStartsAt(event.target.value)} required /></label>
                <p className={s.tiny}>Enter the time in your browser&apos;s local timezone.</p>
                <div className={s.formRow}><label className={s.field}>Duration<select value={duration} onChange={event => setDuration(event.target.value)}>{[15, 30, 45, 60, 90, 120].map(minutes => <option key={minutes} value={minutes}>{minutes} min</option>)}</select></label><label className={s.field}>Category<select value={category} onChange={event => setCategory(event.target.value)}>{scenario.groups.map((group, index) => <option key={group} value={index}>{group}</option>)}</select></label></div>
                <div className={s.formActions}><button className={s.primaryButton} type="submit">Add to calendar</button><button className={s.quietButton} type="button" onClick={() => setShowForm(false)}>Cancel</button></div>
              </form> : null}
              <label className={s.field}>Selected record<select value={selectedId} disabled={!events.length} onChange={event => { const record = events.find(item => item.id === event.target.value); if (record) inspectEvent(record); }}><option value="" disabled>{events.length ? "Select a record" : "No records loaded"}</option>{events.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}</select></label>
              {selected ? <div className={s.selectedRecord}><span className={s.recordCategory}><i style={{ background: selected.color || scenario.colors[0] }} />{selected.categories[0] || "Calendar event"}{selected.recurrenceRule ? " · recurring" : ""}</span><strong>{selected.title}</strong><span>{formatStart(selected)}</span><span>{selected.location}</span></div> : <p className={s.emptySmall}>Create a record or reset this workspace to get started.</p>}
              <div className={s.recordActions}><button className={s.secondaryButton} type="button" disabled={!selected} onClick={moveSelected}>{selected?.recurrenceRule ? "Move series +30 min" : "Move +30 min"}<Symbol type="arrow" /></button><button className={s.deleteButton} type="button" disabled={!selected} onClick={deleteSelected}>{selected?.recurrenceRule ? "Delete series" : "Delete"}</button></div>
              <p className={s.apiFootnote}>Calls {" "}<code>addEvent</code>, <code>updateEvent</code>, and <code>deleteEvent</code> on the live component.</p>
            </div>
          </aside>
        </div>
        <div className={s.statusBar} role="status" aria-live="polite"><span className={s.statusDot} aria-hidden="true" /><span>{notice}</span></div>
      </div>
      <p className={s.scenarioNote}>{scenario.note}</p>

      <section className={s.inspector} aria-labelledby="inspector-title">
        <div className={s.inspectorHeading}><div><p className={s.eyebrow}>03 / Look under the surface</p><h2 id="inspector-title">Every change has a story.</h2></div><p>The records, the configuration, and the events that connect them. All from the calendar above.</p></div>
        <div className={s.inspectorTabs} role="group" aria-label="Inspector panels">{inspectorPanels.map(item => <button key={item} type="button" aria-pressed={panel === item} onClick={() => setPanel(item)} className={panel === item ? s.inspectorTabActive : ""}>{item === "records" ? "Event records" : item === "code" ? "Use the code" : "Live activity"}<span>{item === "records" ? events.length : item === "code" ? "{ }" : log.length}</span></button>)}</div>
        {panel === "records" ? <div className={s.recordsPanel}>
          <div className={s.panelToolbar}><label className={s.searchField}><span className="sr-only">Search event records</span><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg><input type="search" placeholder="Find a title, place, or category…" value={query} onChange={event => setQuery(event.target.value)} /></label><span>{filteredEvents.length} of {events.length} records</span><button type="button" className={s.quietButton} disabled={!events.length} onClick={() => perform(() => { calRef.current?.setEvents([]); setNotice("All local records cleared. Create a record or reset the workspace."); syncEvents(); })}>Clear all records</button></div>
          {filteredEvents.length ? <div className={s.tableScroller} tabIndex={0} role="region" aria-label="Event records table"><table className={s.table}><thead><tr><th scope="col">Event / record</th><th scope="col">Starts at</th><th scope="col">Category</th><th scope="col">Location</th></tr></thead><tbody>{filteredEvents.map(event => <tr key={event.id} className={event.id === selectedId ? s.selectedRow : ""}><td><button type="button" onClick={() => inspectEvent(event)} aria-label={`Inspect ${event.title}`}><i style={{ background: event.color || scenario.colors[0] }} /><span><strong>{event.title}</strong><small>{event.id}{event.recurrenceRule ? " · recurring series" : ""}</small></span><Symbol type="arrow" /></button></td><td>{formatStart(event)}</td><td>{event.categories[0] || "—"}</td><td>{event.location || "—"}</td></tr>)}</tbody></table></div> : <div className={s.emptyState}><h3>{query ? "No matching records." : "A clean slate."}</h3><p>{query ? "Try another title, location, or category." : "Create your first event with the API controls, or reset the workspace to restore its sample week."}</p>{query ? <button type="button" className={s.secondaryButton} onClick={() => setQuery("")}>Clear search</button> : null}</div>}
          <p className={s.panelFootnote}>Select a record to locate its start on the calendar and use the API controls. Recurring records represent a complete series. Search filters this table only.</p>
        </div> : null}
        {panel === "code" ? <div className={s.codePanel}>
          <div className={s.codeToolbar}><div role="group" aria-label="Code format"><button type="button" aria-pressed={codeFormat === "javascript"} onClick={() => setCodeFormat("javascript")} className={codeFormat === "javascript" ? s.codeActive : ""}>JavaScript</button><button type="button" aria-pressed={codeFormat === "json"} onClick={() => setCodeFormat("json")} className={codeFormat === "json" ? s.codeActive : ""}>Event JSON</button></div><button type="button" onClick={copyCode}>Copy {codeFormat === "json" ? "JSON" : "code"}</button></div>
          <div className={s.codeIntro}><Symbol type="code" /><span>{codeFormat === "javascript" ? "Live configuration + complete event snapshot. Install @forcecalendar/interface and run with your module bundler." : "The current stored event records. Times are serialized as UTC instants; recurrence rules and application metadata are preserved."}</span></div>
          <pre className={s.code} tabIndex={0} aria-label={codeFormat === "javascript" ? "JavaScript calendar example" : "Current event JSON"}><code>{code}</code></pre><p className={s.copyStatus} role="status">{copyState || "Changes above are reflected here automatically."}</p>
        </div> : null}
        {panel === "activity" ? <div className={s.activityPanel}>
          <div className={s.panelToolbar}><span>Latest {log.length} DOM events · up to 40 retained</span><button type="button" className={s.quietButton} disabled={!log.length} onClick={() => setLog([])}>Clear activity</button></div>
          {log.length ? <ol className={s.eventLog}>{log.map(entry => <li key={entry.id}><span className={s.logTime}>{entry.time}</span><details><summary><span className={s.logDot} /><code>{entry.name}</code><span>Inspect payload +</span></summary><pre>{entry.detail}</pre></details></li>)}</ol> : <div className={s.emptyState}><h3>Listening for the next change.</h3><p>Navigate, switch views, or create a record to see the component&apos;s real DOM events.</p></div>}
          <p className={s.panelFootnote}>Snapshot loads emit one calendar-events-set with a change summary. Record operations emit lifecycle events. Range boundaries use the browser timezone, with an inclusive end.</p>
        </div> : null}
      </section>
    </>
  );
}
