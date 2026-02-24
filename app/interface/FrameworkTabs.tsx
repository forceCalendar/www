"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";

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
  react: `import '@forcecalendar/interface';

function App() {
  return (
    <forcecal-main
      view="month"
      locale="en-US"
      timezone="America/New_York"
    />
  );
}`,
  vue: `<template>
  <forcecal-main
    :view="currentView"
    :locale="locale"
    @event-click="handleEvent"
  />
</template>

<script setup>
import '@forcecalendar/interface';
import { ref } from 'vue';

const currentView = ref('month');
const locale = ref('en-US');

function handleEvent(e) {
  console.log('Event clicked:', e.detail);
}
</script>`,
  angular: `<!-- app.component.html -->
<forcecal-main
  [attr.view]="calendarView"
  [attr.locale]="locale"
  (event-click)="onEventClick($event)">
</forcecal-main>

<!-- app.module.ts: add CUSTOM_ELEMENTS_SCHEMA -->`,
  lwc: `<!-- calendar.html -->
<template>
  <forcecal-main
    view={view}
    locale={locale}
    onselect={handleSelect}>
  </forcecal-main>
</template>

<!-- calendar.js -->
<!-- import '@forcecalendar/interface'
   as a static resource -->`,
};

export default function FrameworkTabs() {
  const [active, setActive] = useState<Framework>("react");

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {frameworks.map((fw) => (
          <button
            key={fw}
            onClick={() => setActive(fw)}
            className={`px-4 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
              active === fw
                ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
            }`}
          >
            {labels[fw]}
          </button>
        ))}
      </div>
      <CodeBlock
        code={codeExamples[active]}
        filename={filenames[active]}
      />
    </div>
  );
}
