"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";
import InstallCommand from "../components/InstallCommand";
import s from "./interface.module.css";

const recipes = {
  browser: { label: "Web Component", file: "calendar.js", command: "npm install @forcecalendar/interface @forcecalendar/core", note: "Run in the browser. Mount the element, then supply a complete snapshot of your records.", code: `import '@forcecalendar/interface';

const calendar = document.createElement('forcecal-main');
calendar.setAttribute('view', 'week');
calendar.setAttribute('date', '2026-10-05T12:00:00');
calendar.setAttribute('height', '600px');
document.body.append(calendar);

calendar.setEvents([{
  id: 'review', title: 'Customer review',
  start: '2026-10-05T09:00:00Z',
  end: '2026-10-05T10:00:00Z',
}]);

calendar.addEventListener('calendar-event-updated', e => {
  console.log('Updated locally:', e.detail.event);
  // Your app validates and persists the change.
});` },
  react: { label: "React", file: "Calendar.jsx", command: "npm install @forcecalendar/react @forcecalendar/interface @forcecalendar/core", note: "The React adapter registers the element on the client. Keep the events array stable between unrelated renders.", code: `'use client';
import { ForceCalendar } from '@forcecalendar/react';

const appointments = [{
  id: 'review', title: 'Customer review',
  start: '2026-10-05T09:00:00Z',
  end: '2026-10-05T10:00:00Z',
}];

export default function CustomerCalendar() {
  return <ForceCalendar
    view="week"
    date="2026-10-05T12:00:00"
    height="600px"
    events={appointments}
    onEventUpdated={({ event }) => console.log(event)}
  />;
}` },
  vue: { label: "Vue", file: "Calendar.vue", command: "npm install @forcecalendar/vue @forcecalendar/interface @forcecalendar/core", note: "Use the Vue adapter’s declared events. Replace the events array when a new snapshot arrives.", code: `<script setup>
import { ref } from 'vue';
import { ForceCalendar } from '@forcecalendar/vue';

const appointments = ref([{
  id: 'review', title: 'Customer review',
  start: '2026-10-05T09:00:00Z',
  end: '2026-10-05T10:00:00Z',
}]);
</script>

<template>
  <ForceCalendar
    view="week" date="2026-10-05T12:00:00" height="600px"
    :events="appointments"
    @event-updated="({ event }) => console.log(event)"
  />
</template>` },
};
type Recipe = keyof typeof recipes;

export default function InterfaceRecipes() {
  const [active, setActive] = useState<Recipe>("browser");
  const recipe = recipes[active];
  return <div className={s.recipes}><div className={s.recipeGuide}><div className={s.recipeButtons} aria-label="Integration framework">{(Object.keys(recipes) as Recipe[]).map(key => <button type="button" key={key} aria-pressed={active === key} onClick={() => setActive(key)}>{recipes[key].label}<span aria-hidden="true">↗</span></button>)}</div><p>{recipe.note}</p><InstallCommand command={recipe.command} /><p className={s.recipeFootnote}>These examples use synthetic local data. Connect your application’s data layer to load and save real records.</p></div><CodeBlock filename={recipe.file} code={recipe.code} /></div>;
}
