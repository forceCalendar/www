"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";
import Tabs from "../components/Tabs";

const frameworks = ["react", "vue", "angular", "lwc"] as const;
type Framework = (typeof frameworks)[number];

const labels: Record<Framework, string> = {
  react: "React",
  vue: "Vue",
  angular: "Angular",
  lwc: "Salesforce LWC",
};

const filenames: Record<Framework, string> = {
  react: "App.jsx",
  vue: "App.vue",
  angular: "app.component.html",
  lwc: "calendar.html",
};

const codeExamples: Record<Framework, string> = {
  react: `// npm install @forcecalendar/react
import { ForceCalendar } from '@forcecalendar/react';

function App() {
  return (
    <ForceCalendar
      view="month"
      locale="en-US"
      timezone="America/New_York"
      onDateSelect={({ date }) => console.log(date)}
    />
  );
}
// SSR-safe: works in Next.js with no workarounds`,
  vue: `<!-- npm install @forcecalendar/vue -->
<template>
  <ForceCalendar
    view="month"
    locale="en-US"
    @date-select="d => console.log(d)"
  />
</template>

<script setup>
import { ForceCalendar } from '@forcecalendar/vue';
</script>
<!-- SSR-safe: works in Nuxt out of the box -->`,
  angular: `<!-- app.component.html -->
<forcecal-main
  [attr.view]="calendarView"
  [attr.locale]="locale"
  (calendar-date-select)="onDateSelect($event)">
</forcecal-main>

<!-- app.module.ts: add CUSTOM_ELEMENTS_SCHEMA -->`,
  lwc: `<!-- calendar.html -->
<template>
  <div lwc:dom="manual" class="calendar-host"></div>
</template>

<!-- calendar.js: create the element and
   subscribe in renderedCallback() -->
<!-- const cal = document.createElement('forcecal-main');
   cal.addEventListener('calendar-date-select', this.handleSelect);
   this.template.querySelector('.calendar-host').appendChild(cal); -->`,
};

export default function FrameworkTabs() {
  const [active, setActive] = useState<Framework>("react");

  return (
    <div>
      <Tabs
        tabs={frameworks}
        active={active}
        onChange={setActive}
        labels={labels}
        label="Framework"
        className="mb-6"
      />
      <CodeBlock
        code={codeExamples[active]}
        filename={filenames[active]}
      />
    </div>
  );
}
