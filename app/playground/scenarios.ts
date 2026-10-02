export type ScenarioId = "crm" | "campus" | "resources";

export type SampleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  location: string;
  description: string;
  categories: string[];
  metadata: { scenario: ScenarioId; record: string };
  recurrenceRule?: string;
};

export const scenarios = {
  crm: {
    number: "01",
    name: "Customer relationships",
    shortName: "Customer calendar",
    workspace: "Acme CRM",
    mark: "a",
    description: "From the first conversation to the next account review.",
    context: "Customer appointments, right beside the customer record.",
    note: "Sample CRM records. Connect your application's data and access rules through your own adapter.",
    noun: "appointment",
    sampleTitle: "New customer · discovery call",
    groups: ["Discovery", "Implementation", "Account review"],
    colors: ["#7460c7", "#25836c", "#b68137"],
    titles: [
      "Northstar · discovery", "Meridian · onboarding", "Acme · account review",
      "Juniper · product walkthrough", "Orbit · implementation", "Atlas · renewal planning",
      "Lumen · discovery", "Harbor · project kickoff", "Evergreen · success review",
      "Vertex · solution workshop", "Forma · onboarding", "Helio · account review",
      "Summit · discovery", "Cedar · implementation", "Nova · next steps",
      "Studio North · consultation", "Moss · onboarding", "Alto · account review",
      "Daybreak · discovery", "Aster · project kickoff", "Fieldwork · check-in",
    ],
    locations: ["Customer video call", "Implementation room", "Account team room"],
  },
  campus: {
    number: "02",
    name: "Campus & appointments",
    shortName: "Campus calendar",
    workspace: "Northfield Campus",
    mark: "n",
    description: "Office hours, workshops, and the moments between classes.",
    context: "A working week for an academic department's own portal.",
    note: "Synthetic campus schedule. Enrollment, student records, and appointment policies belong to your application.",
    noun: "session",
    sampleTitle: "Open studio · advising session",
    groups: ["Advising", "Workshops", "Office hours"],
    colors: ["#7460c7", "#25836c", "#b68137"],
    titles: [
      "Design · academic advising", "Research methods · workshop", "Faculty · office hours",
      "Admissions · interview", "Studio practice · critique", "Library · research support",
      "Engineering · academic advising", "Writing lab · workshop", "Faculty · office hours",
      "Admissions · interview", "Data visualization · workshop", "Career center · drop-in",
      "Arts · academic advising", "Portfolio · workshop", "Faculty · office hours",
      "Campus visit · welcome", "Community studio · workshop", "Library · research support",
      "Open day · advising", "Study skills · workshop", "Student services · drop-in",
    ],
    locations: ["Advising center", "Learning studio", "Faculty office 204"],
  },
  resources: {
    number: "03",
    name: "Teams & resources",
    shortName: "Spaces calendar",
    workspace: "Common Ground",
    mark: "c",
    description: "Give rooms, studios, and team schedules a shared view.",
    context: "Room and equipment bookings, displayed inside your workplace app.",
    note: "Sample resource schedule only. Capacity, allocation, availability checks, and booking policies are application responsibilities.",
    noun: "booking",
    sampleTitle: "Studio A · team workshop",
    groups: ["Studio A", "Team room", "Lab 2"],
    colors: ["#7460c7", "#25836c", "#b68137"],
    titles: [
      "Studio A · product shoot", "Team room · planning", "Lab 2 · equipment orientation",
      "Studio A · design review", "Team room · project kickoff", "Lab 2 · prototype session",
      "Studio A · customer interview", "Team room · workshop", "Lab 2 · testing session",
      "Studio A · creative review", "Team room · team meeting", "Lab 2 · equipment orientation",
      "Studio A · recording session", "Team room · retrospective", "Lab 2 · prototype session",
      "Studio A · community session", "Team room · study group", "Lab 2 · open lab",
      "Studio A · photography", "Team room · reading group", "Lab 2 · maintenance window",
    ],
    locations: ["Studio A · ground floor", "Team room · second floor", "Lab 2 · west wing"],
  },
} as const;

export const scenarioIds: ScenarioId[] = ["crm", "campus", "resources"];

/** Use local calendar dates so samples stay in the displayed week across DST. */
export function makeScenarioEvents(scenarioId: ScenarioId, anchor: Date): SampleEvent[] {
  const scenario = scenarios[scenarioId];
  const monday = new Date(anchor);
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  monday.setHours(0, 0, 0, 0);
  return scenario.titles.map((title, index) => {
    const day = Math.floor(index / 3);
    const category = index % 3;
    const start = new Date(monday);
    start.setDate(start.getDate() + day);
    start.setHours([9, 11, 14][category], day % 2 ? 30 : 0, 0, 0);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + [45, 75, 60][category]);
    return {
      id: `${scenarioId}-${index + 1}`,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      color: scenario.colors[category],
      location: scenario.locations[category],
      description: `Synthetic ${scenario.groups[category].toLowerCase()} record for the forceCalendar playground. Edits stay in this browser session.`,
      categories: [scenario.groups[category]],
      metadata: { scenario: scenarioId, record: `${scenarioId.toUpperCase()}-${String(index + 1).padStart(3, "0")}` },
      ...(index === 2 ? { recurrenceRule: "FREQ=WEEKLY;COUNT=8" } : {}),
    };
  });
}

export function localDateInput(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function localDateTimeInput(date: Date): string {
  return `${localDateInput(date)}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
