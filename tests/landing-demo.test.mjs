import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../app/components/landing-demo.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
const {createDemoEvents} = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
for (const start of [new Date(2026, 9, 4), new Date(2027, 11, 26), new Date(2026, 2, 8)]) {
  test(`demo fills every displayed day from ${start.toDateString()}`, () => {
    const events = createDemoEvents(start);
    assert.equal(events.length, 23);
    assert.equal(new Set(events.map(e => e.id)).size, events.length);
    for (let day = 0; day < 7; day++) {
      const date = new Date(start); date.setDate(date.getDate() + day);
      const visible = events.filter(e => new Date(e.start).toDateString() === date.toDateString());
      assert.ok(visible.length >= 3);
      assert.ok(visible.some(e => new Date(e.start).getHours() === 8));
    }
    for (const event of events) assert.ok(new Date(event.end) > new Date(event.start));
    assert.ok(new Set(events.map(e => e.color)).size >= 5);
  });
}
