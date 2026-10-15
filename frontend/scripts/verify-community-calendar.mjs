import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/nearbyEvents2026.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { NEARBY_EVENTS, getUpcomingNearbyEvents } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const idsAt = (date) => getUpcomingNearbyEvents(new Date(date)).map((event) => event.id);

for (const event of NEARBY_EVENTS) {
  assert.ok(new Date(event.startsAt) < new Date(event.endsAt), `${event.id}: valid start and end`);
  assert.ok(event.sourceUrl || event.saveTheDate, `${event.id}: organizer source or explicit save-the-date`);
}
assert.equal(new Set(NEARBY_EVENTS.map((event) => event.id)).size, NEARBY_EVENTS.length);
assert.deepEqual(idsAt('2026-11-07T21:59:59Z').slice(0, 2), ['kids-book-fair-cupertino-2026', 'kids-book-fair-san-ramon-2026']);
assert.equal(idsAt('2026-11-07T22:00:00Z').includes('kids-book-fair-cupertino-2026'), false, 'Cupertino expires at 2 PM Pacific after DST');
assert.equal(idsAt('2026-11-15T08:00:00Z').includes('fall-into-friendship-2026'), false, 'Save-the-date expires after its event day');
assert.deepEqual(idsAt('2026-11-27T08:00:00Z'), ['dickens-fair-2026'], 'Multi-weekend fair stays listed after Thanksgiving');
assert.deepEqual(idsAt('2026-12-21T02:00:00Z'), [], 'Calendar is empty after the final fair closes');
console.log('Community calendar: source, date, DST and expiration checks passed.');
