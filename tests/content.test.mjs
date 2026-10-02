import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const home = read('app/page.tsx');
const salesforce = read('app/salesforce/page.tsx');
test('homepage keeps neutral product identity and a genuine Lightning capture', () => {
  assert.ok(home.includes('Calendar infrastructure for your applications.'));
  assert.ok(home.indexOf('Set up Salesforce') < home.indexOf('<InstallCommand'));
  assert.ok(home.indexOf('salesforce-lightning-month-clean.png') < home.indexOf('{/* Facts strip */}'));
  assert.ok(!home.includes('<HeroCalendar'));
});
test('all Salesforce captures exist and have accessible descriptions', () => {
  for (const view of ['month', 'week', 'day']) {
    assert.ok(statSync(new URL(`../public/salesforce-lightning-${view}-clean.png`, import.meta.url)).size > 10000);
    assert.ok(salesforce.includes(`src="/salesforce-lightning-${view}-clean.png"`));
  }
  assert.ok(salesforce.includes('synthetic sample events'));
  const component = read('app/components/SalesforceScreenshot.tsx');
  assert.ok(component.includes('aria-label='));
  assert.ok(component.includes('<figcaption'));
});
test('guide covers access, platform compatibility, and version boundaries', () => {
  for (const text of ['ForceCalendarAccess', 'controller access only', 'Lightning Web Security', 'Lightning Locker is not supported', 'standard Events', 'WhoId or WhatId', '1,000 records', 'does not revoke permissions elsewhere', 'Salesforce releases', 'Core 2.5.5 and Interface 1.8.1']) assert.ok(salesforce.includes(text), text);
});
test('source installation uses repeatable root and bundle dependency installs', () => {
  assert.ok(salesforce.includes('cd salesforce\nnpm ci\ncd src\nnpm ci\ncd ..\nnpm run build\ncd dist'));
});
test('unsupported security guarantees stay absent', () => {
  const copy = [home, salesforce, read('app/platforms/page.tsx')].join('\n');
  for (const phrase of ['zero supply chain risk', 'security team will approve', 'full Locker Service compliance', 'No eval, no inline styles']) assert.ok(!copy.includes(phrase), phrase);
});

test('security explanation distinguishes LWS from legacy Locker', () => {
 assert.ok(home.includes('Lightning Web Security required'));
 assert.ok(home.includes('not a claim of legacy Locker compatibility'));
 assert.ok(!read('app/platforms/page.tsx').includes('Salesforce first.'));
});
