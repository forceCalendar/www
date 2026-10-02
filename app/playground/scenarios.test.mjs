import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import StateManager from '../../node_modules/@forcecalendar/interface/src/core/StateManager.js';

const source = readFileSync(new URL('./scenarios.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { makeScenarioEvents, scenarioIds, localDateInput, localDateTimeInput } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

for (const zone of ['UTC', 'America/New_York', 'Asia/Kolkata']) {
  for (const date of [[2026, 2, 8], [2026, 10, 1], [2027, 0, 1]]) {
    for (const scenario of scenarioIds) {
      test(`${scenario}: seven populated dates in ${zone}, including ${date.join('/')}`, () => {
        const originalZone = process.env.TZ;
        process.env.TZ = zone;
        try {
          const anchor = new Date(...date, 12);
          const anchorValue = anchor.getTime();
          const records = makeScenarioEvents(scenario, anchor);
          assert.equal(anchor.getTime(), anchorValue, 'generator must not mutate the anchor');
          assert.equal(records.length, 21);
          assert.equal(new Set(records.map(event => event.id)).size, 21);
          const days = new Set(records.map(event => localDateInput(new Date(event.start))));
          assert.equal(days.size, 7);
          assert.ok(days.has(localDateInput(anchor)), 'the current date has samples in day view');
          assert.equal(new Date(records[0].start).getDay(), 1, 'sample week starts Monday');
          for (const day of days) assert.equal(records.filter(event => localDateInput(new Date(event.start)) === day).length, 3);
          for (const record of records) {
            assert.ok(new Date(record.end) > new Date(record.start));
            assert.ok([9, 11, 14].includes(new Date(record.start).getHours()), 'local wall-clock times survive DST');
            assert.equal(record.metadata.scenario, scenario);
          }
          const calendar = new StateManager({ view: 'week', weekStartsOn: 1, date: anchor, timeZone: zone });
          const result = calendar.setEvents(records);
          assert.equal(result.added.length, 21);
          const range = calendar.getVisibleRange();
          for (const record of records) {
            assert.ok(new Date(record.start) >= range.start && new Date(record.start) <= range.end, 'sample is in the actual visible range');
          }
          calendar.setView('day');
          const dayRange = calendar.getVisibleRange();
          assert.equal(records.filter(event => new Date(event.start) >= dayRange.start && new Date(event.start) <= dayRange.end).length, 3);
          calendar.destroy();
        } finally {
          if (originalZone === undefined) delete process.env.TZ;
          else process.env.TZ = originalZone;
        }
      });
    }
  }
}

test('real Interface state: create, move, delete, reset and switch scenarios stay consistent', () => {
  const anchor = new Date(2026, 9, 2, 12);
  const calendar = new StateManager({ view: 'week', weekStartsOn: 1, date: anchor });
  const activity = [];
  for (const name of ['events:set', 'event:added', 'event:updated', 'event:deleted']) calendar.eventBus.on(name, detail => activity.push({ name, detail }));
  calendar.setEvents(makeScenarioEvents('crm', anchor));
  const created = calendar.addEvent({ id: 'new-appointment', title: 'New customer · discovery call', start: new Date(2026, 9, 2, 11).toISOString(), end: new Date(2026, 9, 2, 11, 45).toISOString() });
  assert.equal(calendar.getEvents().length, 22);
  const originalStart = created.startUTC.getTime();
  const originalDuration = created.endUTC - created.startUTC;
  const moved = calendar.updateEvent(created.id, { start: new Date(originalStart + 30 * 60000).toISOString(), end: new Date(created.endUTC.getTime() + 30 * 60000).toISOString() });
  assert.equal(moved.startUTC.getTime(), originalStart + 30 * 60000);
  assert.equal(moved.endUTC - moved.startUTC, originalDuration);
  assert.ok(calendar.deleteEvent(created.id));
  assert.equal(calendar.getEvents().length, 21);
  calendar.setEvents([]);
  assert.equal(calendar.getEvents().length, 0);
  const campus = calendar.setEvents(makeScenarioEvents('campus', anchor));
  assert.equal(campus.added.length, 21);
  assert.ok(calendar.getEvents().every(event => event.id.startsWith('campus-')));
  const reset = calendar.setEvents(makeScenarioEvents('campus', anchor));
  assert.equal(reset.unchanged.length, 21, 'repeated reset is idempotent');
  const resources = calendar.setEvents(makeScenarioEvents('resources', anchor));
  assert.equal(resources.removed.length, 21);
  assert.equal(resources.added.length, 21);
  assert.deepEqual(activity.slice(0, 4).map(event => event.name), ['events:set', 'event:added', 'event:updated', 'event:deleted']);
  calendar.destroy();
});

test('recurring sample is a complete series and accepts the same move operation', () => {
  const calendar = new StateManager({ view: 'week', weekStartsOn: 1, date: new Date(2026, 9, 2) });
  calendar.setEvents(makeScenarioEvents('crm', new Date(2026, 9, 2)));
  const series = calendar.getEvents().find(event => event.recurrenceRule);
  assert.ok(series);
  const moved = calendar.updateEvent(series.id, { start: new Date(series.startUTC.getTime() + 30 * 60000).toISOString(), end: new Date(series.endUTC.getTime() + 30 * 60000).toISOString() });
  assert.equal(moved.recurrenceRule, 'FREQ=WEEKLY;COUNT=8');
  assert.equal(moved.startUTC - series.startUTC, 30 * 60000);
  assert.ok(calendar.deleteEvent(series.id));
  assert.ok(!calendar.getEvents().some(event => event.id === series.id));
  calendar.destroy();
});

test('form date serialization keeps local date and time across year boundaries', () => {
  assert.equal(localDateInput(new Date(2026, 11, 31, 23, 5)), '2026-12-31');
  assert.equal(localDateTimeInput(new Date(2026, 11, 31, 23, 5)), '2026-12-31T23:05');
});
