export type DemoEvent = { id: string; title: string; start: string; end: string; color: string; allDay?: boolean };
export function demoTime(start: Date, day: number, hour: number, minute = 0) {
  const date = new Date(start);
  date.setDate(date.getDate() + day);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}
export function createDemoEvents(rangeStart: Date): DemoEvent[] {
  const names = [
    ['Morning walk', 'Family brunch', 'Reading hour'],
    ['Design studio', 'Customer interview', 'Lunch with Maya'],
    ['Research session', 'Product review', 'Piano lesson'],
    ['Coffee with Alex', 'Studio workshop', 'Team lunch'],
    ['Deep focus', 'Architecture review', 'Dentist appointment'],
    ['Weekly review', 'Show & tell', 'Lunch with Sam'],
    ['Farmers market', 'Cycling club', 'Weekend plans'],
  ];
  const colors = ['#6657ce', '#237a68', '#b6752b', '#446da8', '#ad5277'];
  return names.flatMap((titles, day) => titles.map((title, slot) => ({
    id: `sample-${day}-${slot}`, title,
    start: demoTime(rangeStart, day, 8 + slot * 2, slot === 1 ? 30 : 0),
    end: demoTime(rangeStart, day, 9 + slot * 2, 30),
    color: colors[(day + slot) % colors.length],
  }))).concat([
    {id: 'sample-overlap', title: 'Office hours', start: demoTime(rangeStart, 2, 10), end: demoTime(rangeStart, 2, 11, 30), color: '#ad5277'},
    {id: 'sample-open-studio', title: 'Open studio', start: demoTime(rangeStart, 4, 8, 30), end: demoTime(rangeStart, 4, 10), color: '#237a68'},
  ]);
}
