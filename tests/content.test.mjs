import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const home = read('app/page.tsx');
const salesforce = read('app/salesforce/page.tsx');
test('landing leads with enterprise calendar components and real live UI', () => {
  assert.ok(home.includes('Calendar components <span>for enterprise applications'));
  assert.ok(home.includes('<LandingCalendar />'));
  assert.ok(home.includes('headless engine'));
  for (const href of ['/playground', 'https://docs.forcecalendar.org', '/core', '/interface', '/salesforce']) assert.ok(home.includes(href));
});
test('demo seeds a snapshot and exposes accessible view controls', () => {
  const demo = read('app/components/LandingCalendar.tsx');
  for (const phrase of ['element.setEvents(', 'aria-pressed', 'onClick', 'CalendarLoader', 'local sample events', 'overflow-x-auto']) assert.ok(demo.includes(phrase), phrase);
  for (const phrase of ['element.addEvent(', 'element.updateEvent(', 'element.deleteEvent(', 'prefers-reduced-motion', 'onPointerDownCapture={pause}', 'onKeyDownCapture={pause}', 'getVisibleRange()', 'Pause demo']) assert.ok(demo.includes(phrase), phrase);
});
test('responsive layouts explicitly collapse without widening the page', () => {
  const css = read('app/landing.module.css');
  assert.ok(css.includes('@media (max-width: 640px)'));
  assert.ok(css.includes('grid-template-columns: 1fr'));
  assert.ok(css.includes('prefers-reduced-motion'));
});
test('roadmap preserves prototype and provider limits', () => {
  for (const phrase of ['private prototype', 'two-way synchronization are not shipped', 'not live account synchronization', 'not a public hosted service']) assert.ok(home.includes(phrase), phrase);
  assert.ok(!home.includes('github.com/forceCalendar/agent'));
  assert.ok(!home.includes('npm install @forcecalendar/agent'));
});
test('genuine pointer-free captures remain available', () => {
  for (const view of ['month', 'week', 'day', 'editor']) {
    assert.ok(statSync(new URL(`../public/salesforce-lightning-${view}-clean.png`, import.meta.url)).size > 10000);
    assert.ok(salesforce.includes(`src="/salesforce-lightning-${view}-clean.png"`));
  }
  assert.ok(home.includes('Synthetic sample records'));
});
test('guide preserves access and current source version boundaries', () => {
  for (const text of ['ForceCalendarAccess', 'Controller access only', 'Lightning Web Security', 'Lightning Locker is not supported', 'WhoId or WhatId', '1,000 records', 'does not revoke permissions elsewhere', 'Core 2.5.6 and Interface 1.9.0']) assert.ok(salesforce.includes(text), text);
  assert.ok(salesforce.includes('cd salesforce\nnpm ci\ncd src\nnpm ci\ncd ..\nnpm run build\ncd dist'));
});
test('evidence claims are scoped and primary compatibility source remains linked', () => {
  assert.ok(home.includes('https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html'));
  assert.ok(home.includes('not a penetration test'));
  assert.ok(home.includes('https://audit.forcecalendar.org'));
  assert.ok(home.includes('https://benchmark.forcecalendar.org'));
  for (const phrase of ['zero supply chain risk', 'security team will approve', 'full Locker Service compliance', 'Salesforce first.']) assert.ok(!home.includes(phrase), phrase);
});

test('understated maker signature uses the approved destination', () => {
 const footer = read('app/components/Footer.tsx');
 assert.ok(footer.includes('N. R. Dhanawada'));
 assert.ok(footer.includes('https://dhanawada.org'));
 assert.ok(!footer.includes('Dhanawada Labs'));
 assert.ok(footer.indexOf('forceCalendar by') > footer.indexOf('badges.map'));
 assert.ok(!footer.includes('text-3xl'));
});

test('calendar library is not positioned as an agent work manager', () => {
 for (const text of ['assign tasks', 'Your application decides', 'Agent-accessible by choice']) assert.ok(home.includes(text));
 for (const text of ['A shared agent layer.', 'Your agent works', 'Shared agent calendars']) assert.ok(!home.includes(text));
});

test('enterprise calendar centerpiece and genuine Salesforce path stay prominent', () => {
 for(const phrase of ['Acme CRM', 'Salesforce, CRMs and custom applications', 'id="salesforce"', 'Lightning Web Security', 'Your org, deliberately configured', 'Client meetings']) assert.ok(home.includes(phrase),phrase);
 assert.ok(home.indexOf('id="salesforce"') < home.indexOf('id="system"'));
});
