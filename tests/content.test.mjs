import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const home = read('app/page.tsx');
const salesforce = read('app/salesforce/page.tsx');
test('homepage leads with shared infrastructure, with meaningful developer paths', () => {
  assert.ok(home.includes('One calendar model.'));
  assert.ok(home.includes('Many ways to work.'));
  assert.ok(home.indexOf('Try the calendar') < home.indexOf('Salesforce setup'));
  for (const href of ['/playground', 'https://docs.forcecalendar.org', '/core', '/interface', '/salesforce']) assert.ok(home.includes(href));
});
test('roadmap is explicitly separated from available packages', () => {
  for (const phrase of ['In development', 'Planned', 'not yet a hosted product', 'two-way synchronization are planned', 'not shipping features today', 'not live provider synchronization']) assert.ok(home.includes(phrase), phrase);
  assert.ok(home.includes('Core and UI are available today'));
  assert.ok(home.includes('scoped agent tools'));
});
test('genuine pointer-free Salesforce evidence remains an integration example', () => {
  assert.ok(home.includes('At home in Salesforce.'));
  for (const view of ['month', 'week', 'day', 'editor']) {
    assert.ok(statSync(new URL(`../public/salesforce-lightning-${view}-clean.png`, import.meta.url)).size > 10000);
    assert.ok(salesforce.includes(`src="/salesforce-lightning-${view}-clean.png"`));
  }
  assert.ok(home.includes('synthetic demo data'));
  const component = read('app/components/SalesforceScreenshot.tsx');
  assert.ok(component.includes('aria-label='));
  assert.ok(component.includes('<figcaption'));
});
test('guide preserves access and version boundaries', () => {
  for (const text of ['ForceCalendarAccess', 'controller access only', 'Lightning Web Security', 'Lightning Locker is not supported', 'standard Events', 'WhoId or WhatId', '1,000 records', 'does not revoke permissions elsewhere', 'Core 2.5.5 and Interface 1.8.1']) assert.ok(salesforce.includes(text), text);
});
test('source install remains repeatable', () => {
  assert.ok(salesforce.includes('cd salesforce\nnpm ci\ncd src\nnpm ci\ncd ..\nnpm run build\ncd dist'));
});
test('security explanation follows Salesforce platform boundary', () => {
  assert.ok(home.includes('Lightning Web Security required'));
  assert.ok(home.includes('Legacy Lightning Locker is not supported'));
  assert.ok(home.includes('https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html'));
  const copy = [home, salesforce, read('app/platforms/page.tsx')].join('\n');
  for (const phrase of ['zero supply chain risk', 'security team will approve', 'full Locker Service compliance', 'Salesforce first.']) assert.ok(!copy.includes(phrase), phrase);
});
