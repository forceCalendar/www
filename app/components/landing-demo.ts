export type DemoEvent = { id: string; title: string; start: string; end: string; color: string; allDay?: boolean };
export function demoTime(start: Date, day: number, hour: number, minute = 0) {
  const date = new Date(start);
  date.setDate(date.getDate() + day);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}
export function createDemoEvents(rangeStart: Date): DemoEvent[] {
  const names = [
    ['Client support clinic', 'New account orientation', 'Partner briefing'],
    ['Northstar · discovery', 'Meridian · account review', 'Acme · onboarding'],
    ['Client solution workshop', 'Harbor · renewal review', 'Product demonstration'],
    ['Pioneer · consultation', 'Customer success clinic', 'Implementation review'],
    ['Atlas · discovery', 'Client training session', 'Account planning'],
    ['Quarterly client review', 'Partner introduction', 'Service appointment'],
    ['Customer office hours', 'Regional client briefing', 'New customer orientation'],
  ];
  const colors = ['#6657ce', '#237a68', '#b6752b', '#446da8', '#ad5277'];
  return names.flatMap((titles, day) => titles.map((title, slot) => ({
    id: `sample-${day}-${slot}`, title,
    start: demoTime(rangeStart, day, 8 + slot * 2, slot === 1 ? 30 : 0),
    end: demoTime(rangeStart, day, 9 + slot * 2, 30),
    color: colors[slot],
  }))).concat([
    {id: 'sample-overlap', title: 'Client consultation', start: demoTime(rangeStart, 2, 10), end: demoTime(rangeStart, 2, 11, 30), color: '#ad5277'},
    {id: 'sample-open-studio', title: 'Solution design', start: demoTime(rangeStart, 4, 8, 30), end: demoTime(rangeStart, 4, 10), color: '#446da8'},
  ]);
}
